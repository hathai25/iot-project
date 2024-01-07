import json
import os

def save_results(results, output_path='./json/results.json'):
    modified_results = []

    for result in results:
        img_name = os.path.basename(result['img_name'])
        license_detected = result['License detected']
        modified_result = ''.join(c for c in license_detected if c.isalnum())

        if license_detected != "unknown":
            modified_results.append({
                'img_name': img_name,
                'License detected': license_detected,
                'Modified result': modified_result,
            })

    with open(output_path, 'w') as json_file:
        json.dump(modified_results, json_file, indent=2)

if __name__ == "__main__":
    # Replace 'your_results_list' with the actual list containing detection results
    # Typically, you should get this list during the processing of images
    results_list = [
        {'img_name': 'path/to/image1.jpg', 'License detected': 'AB-12345'},
        {'img_name': 'path/to/image2.jpg', 'License detected': 'CD.56789'},
        # Add more entries as needed
    ]

    save_results(results_list)
