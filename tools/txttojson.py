import json


def text_to_json(txt_file: str, json_file: str):
    data = []
    with open(txt_file, mode='r', encoding='utf-8-sig') as f:
        lines = f.readlines()
        for line in lines:
            line.replace('\n','')
            if line[1] == '#':
                keys = []
                for key in line.split('##'):
                    if key != "":
                        keys.append(key.replace('\n',''))
            else:
                trash, name, url, description = line.split('$$')
                dict_schema = {
                    "name": name.replace('[','').replace(']',''),
                    "url": url.replace('(','').replace(')',''),
                    "description": description.replace('\n',''),
                    "keys": keys
                }
                data.append(dict_schema)

    with open(json_file, mode='w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)

    return data

txt_file = "./common/db.txt"
json_file = "./common/db.json"
text_to_json(txt_file, json_file)