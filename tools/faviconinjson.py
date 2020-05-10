import json
import os
from os import walk

LANGUE = 'en'


def list_files(folder: str) -> list:
    f = []
    for (dir_path, dir_names, file_names) in walk(folder):
        f.extend(file_names)
        break
    files_in_folder = []
    for files in file_names:
        fileRead = files.split('.')
        files_in_folder.append(files)
    return files_in_folder


def file_exist(address: str) -> bool:
    if os.path.exists(address):
        return True
    else:
        return False


list_images = list_files('../common/thumbnail/JPEG/')


with open(f'../common/db_{LANGUE}.json', 'r', encoding='utf-8') as f:
    list_site = json.load(f)


data = []
for site in list_site:
    site_name = site['name'].replace(" ", "_") + ".jpg"
    if site_name in list_images:
        site['thumbnail'] = site_name
        data.append(site)
    else:
        site['thumbnail'] = 'none.jpg'
        data.append(site)


with open(f'../src/firefox/json/db_{LANGUE}.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
