import os
import re
import struct

def get_image_size(file_path):
    with open(file_path, 'rb') as f:
        data = f.read(25)
        if data.startswith(b'\xff\xd8'):
            f.seek(0)
            f.read(2)
            b = f.read(1)
            try:
                while (b and ord(b) != 0xDA):
                    while (ord(b) != 0xFF): b = f.read(1)
                    while (ord(b) == 0xFF): b = f.read(1)
                    if (ord(b) >= 0xC0 and ord(b) <= 0xC3):
                        f.read(3)
                        h, w = struct.unpack(">HH", f.read(4))
                        break
                    else:
                        f.seek(struct.unpack(">H", f.read(2))[0]-2, 1)
                    b = f.read(1)
                return w, h
            except Exception:
                pass
        return 0, 0

with open('src/data/wardrobeData.js', 'r') as f:
    content = f.read()

import_pattern = re.compile(r'import\s+(\w+)\s+from\s+"(.*?)";')
for match in import_pattern.finditer(content):
    var_name = match.group(1)
    img_path = match.group(2)
    
    full_path = os.path.abspath(os.path.join('src/assets/images', img_path.replace('../assets/images/', '')))
    if os.path.exists(full_path):
        w, h = get_image_size(full_path)
        if w > h:
            print(f"{var_name}: landscape ({w}x{h})")
        elif w < h:
            pass # ignore portrait
        else:
            print(f"{var_name}: unknown/square")
