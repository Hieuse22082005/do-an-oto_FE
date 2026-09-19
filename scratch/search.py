import os
import codecs

search_term = 'định giá'

def search_dir(dir_path):
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                file_path = os.path.join(root, file)
                try:
                    with codecs.open(file_path, 'r', 'utf-8') as f:
                        lines = f.readlines()
                        for i, line in enumerate(lines):
                            if search_term in line.lower():
                                print(f"{file_path}:{i+1}: {line.strip()}")
                except Exception as e:
                    pass

search_dir('components')
search_dir('app')
