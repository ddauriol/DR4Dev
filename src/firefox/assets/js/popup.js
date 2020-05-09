const container = document.getElementById("container")
const search_btn = document.getElementById("search_btn")
const search_input = document.getElementById("search_input");
const tags = document.getElementById("tags");
const logo_init = document.querySelector(".logo-init")

let jsonData

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './json/db.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

loadJSON(function (response) {
    jsonData = JSON.parse(response);
});

document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        TextId = target.id;
    console.log(TextId)
    if (TextId == 'search_btn' || TextId == 'search_btn_span') {
        creatQuery()
    }
    if (TextId.slice(0,3) == 'tag') {
        search_input.value = TextId.slice(4)
        creatQuery(TextId.slice(4))
    }
    if (TextId.slice(0,4) == 'star') {
        // star(1, '${value['name']}')
        TextId = TextId.slice(5)
        TextId = TextId.slice(0,-1)
        TextId = TextId.replace("'","").replace("'","")
        TextId = TextId.split(",")
        name_site = TextId[1]
        stars_int = parseInt(TextId[0])
        saveLocalStorage(name_site, stars_int)
    }
}, false);

function renderCards(data) {
    txtHTML = '<br><br>'
    Object.entries(data).forEach(([key, value]) => {
        txtKeys = '<h5 class="mt-1">'
        Object.entries(value['keys']).forEach(([key, value_keys]) => {
            txtKeys += `<a id="tag-${value_keys}" href="#" class="badge badge-red ml-2">${value_keys}</a>`
        })
        txtKeys += '</h5>'
        txtHTML += `
        <div class="card w-85 mb-2">
        <div class="row mb-0">
          <div class="col-3">
            <img class="logo" src="./assets/favicon/${value['thumbnail']}">
          </div>
          <div class="col-9">
            <div class="card-body">
              <h5 class="card-title">${value['name']}</h5>
              <p class="card-text">${value['description']}</p>
              ${txtKeys}
            </div>
          </div>
        </div>
        <div class="card-footer card-footer-white text-center">
          <a href="${value['url']}" class="btn btn-green w-75 oval-flat text-uppercase">
            Open
          </a>
        </div>
      </div>
        `
    });
    container.innerHTML = txtHTML
}

function searchInJsonData(query) {
    data = []
    Object.entries(jsonData).forEach(([key, value]) => {
        if (value['name'].toLowerCase().includes(query) == true || value['description'].toLowerCase().includes(query) == true) {
            data.push(value)
        } else {
            Object.entries(value['keys']).forEach(([key, value_keys]) => {
                if (value_keys.toLowerCase() == query.toLowerCase()) {
                    data.push(value)
                }
            });
        }
    });
    renderCards(data)
}

function creatQuery(query = "") {
    if (query == ""){
        query = search_input.value
    }
    searchInJsonData(query)
}

function showTags(){
    tag_list = [
        "Images",
        "Videos",
        "Tools",
        "Project",
        "Freebies",
        "IDEs",
        "Front-end",
        "Icons",
        "IDE Cloud",
        "Langues",
        "Style guide",
        "Charges",
        "Network",
        "Study",
        "Hosting",
        "Pentest",
        "Channels",
        "Business",
        "Fonts",
        "Vector",
        "Frameworks",
        "UI",
        "React",
        "Vue",
        "Angular",
        "Svelte"
    ]
    txtTag = ''
    Object.entries(tag_list).forEach(([key, tag]) => {
        txtTag += `<a id="tag-${tag}" href="#" class="badge badge-green ml-2 mt-2">${tag}</a>`
    })
    tags.innerHTML = txtTag
}

function translaterPage(){
    search_btn.innerHTML = browser.i18n.getMessage("btn_search")
    search_input.placeholder = browser.i18n.getMessage("input_search")
    lang = browser.i18n.getMessage("langue")
    logo_init.style.backgroundImage = `url(./assets/logo/${lang}/logo.png)`;

}

showTags()
translaterPage()
