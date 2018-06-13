var app = function(){
    const url = "https://api.punkapi.com/v2/beers";
    makeRequest(url, requestComplete);

    const select = document.querySelector('select');
    select.addEventListener("change", handleOptionSelect);
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
    });
}

const handleOptionSelect = function(){
    const beer = JSON.parse(this.value);
    const header = document.querySelector('#beer-name');
    const beerDesc = document.querySelector('#beer-description');
    const beerImage = document.querySelector('#beer-image');

    header.textContent = `Beer : ${beer.name}`;
    beerDesc.textContent = `Description : ${beer.description}`;
    beerImage.innerHTML = `<img class="beer-resize" src="${beer.image_url}" alt="${beer.name}_image">`
};

window.addEventListener('load', app);