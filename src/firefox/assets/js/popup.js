const container = document.getElementById("container_main");
const btSearch = document.getElementById("search_btn");
const inputSearch = document.getElementById("search_input");
const divKeyWords = document.getElementById("tags");
const classLogoInit = document.querySelector(".logo-init");
const searchForm = document.getElementById("search_form");

/*global browser*/
const firefox = browser.i18n;

let jsonData;

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "./json/db.json", true);
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

document.addEventListener(
  "click",
  function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
      TextId = target.id;
    console.log(TextId);
    if (TextId == "search_btn") {
      creatQuery();
    }
    if (TextId.slice(0, 3) == "tag") {
      inputSearch.value = TextId.slice(4);
      creatQuery(TextId.slice(4));
    }
  },
  false
);

searchForm.addEventListener(
  "submit",
  function (e) {
    creatQuery();
    e.preventDefault();
  },
  false
);

function renderCards(data) {
  let txtHTML = "<br><br>";
  Object.entries(data).forEach(([key, value]) => {
    let txtKeys = "<h5 class='mt-1'>";
    Object.entries(value["keys"]).forEach(([key, value_keys]) => {
      txtKeys += `<a id="tag-${value_keys}" href="#" class="badge badge-red ml-2">${value_keys}</a>`;
    });
    txtKeys += "</h5>";
    txtHTML += `
        <div class="card w-85 mb-2">
        <div class="row mb-0">
          <div class="col-3">
            <img class="logo" src="./assets/favicon/${value["thumbnail"]}">
          </div>
          <div class="col-9">
            <div class="card-body">
              <h5 class="card-title">${value["name"]}</h5>
              <p class="card-text">${value["description"]}</p>
              ${txtKeys}
            </div>
          </div>
        </div>
        <div class="card-footer card-footer-white text-center">
          <a href="${value["url"]}" target="_blank" class="btn btn-green w-75 oval-flat text-uppercase">
            Open
          </a>
        </div>
      </div>
        `;
  });
  container.innerHTML = txtHTML;
  document.documentElement.scrollTop = 0;
}

function searchInJsonData(query) {
  let data = [];
  Object.entries(jsonData).forEach(([key, value]) => {
    if (
      value["name"].toLowerCase().includes(query) == true ||
      value["description"].toLowerCase().includes(query) == true
    ) {
      data.push(value);
    } else {
      Object.entries(value["keys"]).forEach(([key, value_keys]) => {
        if (value_keys.toLowerCase() == query.toLowerCase()) {
          data.push(value);
        }
      });
    }
  });
  renderCards(data);
}

function creatQuery(query = "") {
  if (query == "") {
    query = inputSearch.value;
  }
  searchInJsonData(query);
}

function showTags() {
  let keyWords = [
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
    "Svelte",
  ];
  let txtWord = "";
  Object.entries(keyWords).forEach(([key, word]) => {
    txtWord += `<a id="tag-${word}" href="#" class="badge badge-green ml-2 mt-2">${word}</a>`;
  });
  divKeyWords.innerHTML = txtWord;
}

function translaterPage() {
  btSearch.innerHTML = firefox.getMessage("btn_search");
  inputSearch.placeholder = firefox.getMessage("input_search");
  let locale = firefox.getMessage("langue");
  classLogoInit.style.backgroundImage = `url(./assets/logo/${locale}/logo.png)`;
}

showTags();
translaterPage();
