import json

import translaterdb as translator


LANGUE = 'pt_BR'


def text_to_json(txt_file: str, json_file: str) -> dict:
    data = []
    with open(txt_file, mode='r', encoding='utf-8-sig') as f:
        lines = f.readlines()
        id_int = 1
        for line in lines:
            line.replace('\n', '')
            if line[1] == '#':
                keys = []
                for key in line.split('##'):
                    if key != "":
                        keys.append(key.replace('\n', ''))
            else:
                trash, name, url, description = line.split('$$')
                if LANGUE != 'pt_BR':
                    description = translator.translate(description, LANGUE)
                dict_schema = {
                    "id": id_int,
                    "name": name.replace('[', '').replace(']', ''),
                    "url": url.replace('(', '').replace(')', ''),
                    "description": description.replace('\n', ''),
                    "keys": keys
                    
                }
                data.append(dict_schema)
                id_int = id_int + 1

    with open(json_file, mode='w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)

    return data


txt_file = "../common/db.txt"
json_file = f"../common/db_{LANGUE}.json"
text_to_json(txt_file, json_file)
