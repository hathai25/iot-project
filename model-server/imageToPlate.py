from flask import Flask, request, jsonify
from flask_cors import cross_origin
from PIL import Image
import base64
from io import BytesIO
import argparse
import torch
import cv2
from datetime import datetime
import function.helper as helper
import function.utils_rotate as utils_rotate

yolo_LP_detect = torch.hub.load('yolov5', 'custom', path='model/LP_detector.pt', force_reload=True, source='local')
yolo_license_plate = torch.hub.load('yolov5', 'custom', path='model/LP_ocr.pt', force_reload=True, source='local')
yolo_license_plate.conf = 0.60

app = Flask(__name__)

@app.route('/')
@cross_origin()
def hello_world():
    return 'Hello, World!'

@app.route('/api/upload_image', methods=['POST'])
@cross_origin()
def upload_image():
    try:
        # Get the JSON data from the request
        data = request.get_json()

        # Extract the base64-encoded image from the JSON data
        image_data = data.get('image')

        data = image_data.split(',')[1]
        if data:
            #remove prefix from base64 string
            # Decode the base64 string into bytes
            image_bytes = base64.b64decode(data)
            timestamp = datetime.now().strftime("%d%m%Y%H%M%S")
            image_path = f"test_image/{timestamp}.jpeg"
            with open(image_path, "wb") as img_file:
                img_file.write(image_bytes)

            img = cv2.imread(image_path)
            print(img)
            
            plates = yolo_LP_detect(img, size=640)
            plates = yolo_LP_detect(img, size=640)
            print(plates)
            list_plates = plates.pandas().xyxy[0].values.tolist()
            list_read_plates = set()
            print(list_read_plates)
            if len(list_plates) == 0:
                lp = helper.read_plate(yolo_license_plate,img)
                if lp != "unknown":
                    cv2.putText(img, lp, (7, 70), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)
                    list_read_plates.add(lp)
            else:
                print("OKE")
                for plate in list_plates:
                    flag = 0
                    x = int(plate[0]) # xmin
                    y = int(plate[1]) # ymin
                    w = int(plate[2] - plate[0]) # xmax - xmin
                    h = int(plate[3] - plate[1]) # ymax - ymin  
                    crop_img = img[y:y+h, x:x+w]
                    cv2.rectangle(img, (int(plate[0]),int(plate[1])), (int(plate[2]),int(plate[3])), color = (0,0,225), thickness = 2)
                    cv2.imwrite("crop.jpg", crop_img)
                    rc_image = cv2.imread("crop.jpg")
                    lp = ""
                    for cc in range(0,2):
                        for ct in range(0,2):
                            lp = helper.read_plate(yolo_license_plate, utils_rotate.deskew(crop_img, cc, ct))
                            if lp != "unknown":
                                list_read_plates.add(lp)
                                cv2.putText(img, lp, (int(plate[0]), int(plate[1]-10)), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)
                                flag = 1
                                break
                        if flag == 1:
                            break

                    # remove lp "-" and ","
                    lp = lp.replace("-","")
                    lp = lp.replace(",","")
                    lp = lp.replace(".","")

                # Return a success message
                return jsonify({'plate': lp})

        else:
            return jsonify({'error': 'Invalid image data'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)