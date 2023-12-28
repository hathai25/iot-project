from PIL import Image
import cv2
import torch
import math 
import function.utils_rotate as utils_rotate
import os
import argparse
from concurrent.futures import ThreadPoolExecutor
from save_results import save_results
import function.helper as helper

def process_image(img, yolo_LP_detect, yolo_license_plate, file_name):
    plates = yolo_LP_detect(img, size=640)
    list_plates = plates.pandas().xyxy[0].values.tolist()
    list_read_plates = set()

    if len(list_plates) == 0:
        lp = helper.read_plate(yolo_license_plate, img)
        if lp != "unknown":
            cv2.putText(img, lp, (7, 70), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)
            list_read_plates.add(lp)
    else:
        for plate in list_plates:
            flag = 0
            x = int(plate[0])  # xmin
            y = int(plate[1])  # ymin
            w = int(plate[2] - plate[0])  # xmax - xmin
            h = int(plate[3] - plate[1])  # ymax - ymin  
            crop_img = img[y:y+h, x:x+w]
            cv2.rectangle(img, (int(plate[0]), int(plate[1])), (int(plate[2]), int(plate[3])), color=(0, 0, 225), thickness=2)
            cv2.imwrite("crop.jpg", crop_img)
            rc_image = cv2.imread("crop.jpg")
            lp = ""
            for cc in range(0, 2):
                for ct in range(0, 2):
                    lp = helper.read_plate(yolo_license_plate, utils_rotate.deskew(crop_img, cc, ct))
                    if lp != "unknown":
                        print(f"File: {file_name},License Plate: {lp}")
                        list_read_plates.add(lp)
                        cv2.putText(img, lp, (int(plate[0]), int(plate[1]-10)), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)
                        flag = 1
                        break
                if flag == 1:
                    break

    cv2.imshow('frame', img)

    result = {
        'img_name': os.path.basename(file_name),
        'License detected': lp,
        'Modified result': ''.join(c for c in lp if c.isalnum())
    }

    return result

def process_file(file_path):
    img = cv2.imread(file_path)
    process_image(img, yolo_LP_detect, yolo_license_plate, os.path.basename(file_path))
    cv2.waitKey(2000)

def process_files_in_folder(folder_path):
    files = [os.path.join(folder_path, file_name) for file_name in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, file_name))]
    result_list = []

    for file_path in files:
        img = cv2.imread(file_path)
        result = process_image(img, yolo_LP_detect, yolo_license_plate, os.path.basename(file_path))
        result_list.append(result)
        process_file(file_path)
        cv2.destroyAllWindows()
    
    save_results(result_list)

def read_files_in_folder(folder_path):
    image_extensions = ['.jpg', 'jpeg', '.png', '.bmp', '.gif']
    files = [os.path.join(folder_path, file_name) for file_name in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, file_name)) and any(file_name.lower().endswith(ext) for ext in image_extensions)]
    
    for file_name in files:
        try:
            with open(file_name, 'r') as file:
                content = file.read()
        except UnicodeDecodeError:
            print(f"Skipping non-text file: {file_name}")

image_extensions = ['.jpg', '.jpeg', '.png', '.bmp', '.gif']

ap = argparse.ArgumentParser()
ap.add_argument('folder',  help='path to input folder')
args = ap.parse_args()

yolo_LP_detect = torch.hub.load('yolov5', 'custom', path='model/LP_detector.pt', force_reload=True, source='local')
yolo_license_plate = torch.hub.load('yolov5', 'custom', path='model/LP_ocr.pt', force_reload=True, source='local')
yolo_license_plate.conf = 0.60

folder_path = args.folder
if os.path.exists(folder_path) and os.path.isdir(folder_path):
    # read_files_in_folder(folder_path)
    process_files_in_folder(folder_path)
