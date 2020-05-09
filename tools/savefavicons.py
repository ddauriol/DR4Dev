import requests
import favicon
import json

json_file = "../common/db.json"
favicons_folder = "../common/favicon/"
user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
headers = {'User-Agent': user_agent}

with open(json_file, 'r', encoding='utf-8') as f:
    data = json.load(f)
    for site in data:
        site_name = site['name'].replace(" ", "_")
        try:
            icons = favicon.get(site['url'], headers=headers, timeout=2)
            icon = icons[0]
            response = requests.get(icon.url, stream=True)
            favicon_name = favicons_folder + site_name + "." + icon.format
            with open(favicon_name, 'wb') as image:
                for chunk in response.iter_content(1024):
                    image.write(chunk)
        except:
            pass