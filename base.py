import base64
from io import BytesIO
from PIL import Image

def base64_to_image(base64_string):
    try:
        # Giải mã chuỗi base64 thành bytes
        image_bytes = base64.b64decode(base64_string)

        # Tạo đối tượng hình ảnh từ bytes
        image = Image.open(BytesIO(image_bytes))

        # Hiển thị hình ảnh hoặc thực hiện các thao tác xử lý ảnh khác tại đây (nếu cần)
        image.show()

        return image
    except Exception as e:
        print(f"Error: {e}")
        return None

# Thay thế 'your_base64_string_here' bằng chuỗi base64 thực tế của bạn
your_base64_string_here = "..."
base64_to_image(your_base64_string_here)
