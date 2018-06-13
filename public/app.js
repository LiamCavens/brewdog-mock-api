var app = function(){
    const url = "https://api.punkapi.com/v2/beers";
    makeRequest(url, requestComplete);
}

const makeRequest = function (url, callbackFunction) {
    const request = new XMLHttpRequest(); 
    request.open("GET", url);
    request.addEventListener("load", callbackFunction);
    request.send();
}

const requestComplete = function () {
    if (this.status !== 200) return;

    const beers = JSON.parse(this.response);
    populateList(beers);
}

const populateList = function (beers) {
    const select = document.querySelector('#beer-list');
    beers.forEach(function (beer) {
        const option = document.createElement('option');
        option.textContent = `${beer.name}`;
        option.value = JSON.stringify(beer);
        select.appendChild(option);
    })
}

window.addEventListener('load', app);