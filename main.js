// GLOBAL SCOPE VARIABLES //

    let currentPage = 1;
    let totalPages = 0;
    const imageSection = document.getElementById('mainImgArea');

//--------------------------------//

// EVENT LISTENERS FOR HEADER TAGS //

document.getElementById('headerh1').addEventListener("click", async function () {
    location.reload();
})

document.getElementById('searchText').addEventListener("input", async function () {
    if(this.value != "") {
        document.querySelector(".searchBtn").style.backgroundColor = 'white';
        document.querySelector(".searchBtn").style.color = 'black';
    }
    else {
        document.querySelector(".searchBtn").style.backgroundColor = 'gray';
        document.querySelector(".searchBtn").style.color = 'white';
    }
})

document.querySelector(".searchBtn").addEventListener("click", async function () {
    currentPage = 1;
    loadImages();
})

//--------------------------------//

// FUNCTION-FLOW FOR HANDLING IMAGES //

function loadImages() {
    imageSection.innerHTML = "";
    const apiKey = "api_key=0beca48521ee0ee70915815ea49063f4";
    const searchText = document.getElementById("searchText").value;
    if (searchText == "") {
        document.querySelector(".searchBtn").style.backgroundColor = 'red';
        setTimeout(function() { document.querySelector(".searchBtn").style.backgroundColor = 'gray'; }, 200);
        document.getElementById('searchResults').innerText = `Please enter something in the searchbox`;
        document.getElementById('pageCounter').innerText = `0 of 0`;
        document.getElementById('imgBtnNext').style.backgroundColor = 'gray';
        document.getElementById('imgBtnNext').style.color = 'white';
        document.getElementById('imgBtnPrev').style.backgroundColor = 'gray';
        document.getElementById('imgBtnPrev').style.color = 'white';
        totalPages = 0;
        currentPage = 1;
    }
    else {
    const text = "text=" + searchText;
    let sortOption = document.querySelector('input[name="sortOrder"]:checked').value;
    const query = `sort=${sortOption}-desc` + "&per_page=20&format=json&nojsoncallback=1" + `&page=${currentPage}`;
    const flickrURL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&${apiKey}&${text}&${query}`;
    talkToFlickr(flickrURL);
    }
}

async function talkToFlickr(flickrURL) {
        const response = await fetch(flickrURL);
        const data = await response.json();
        totalPages = data.photos.pages;
        document.getElementById('searchResults').innerText = `Found ${data.photos.total} images based on your search results`;
        if (totalPages == 0) {document.getElementById('pageCounter').innerText = `0 of ${totalPages}`;}
        else {
            document.getElementById('pageCounter').innerText = `${currentPage} of ${totalPages}`;
            if (totalPages > 1) {
                document.getElementById('imgBtnNext').style.backgroundColor = 'white';
                document.getElementById('imgBtnNext').style.color = 'black';
            }
            loopData(data);
        }
}

function loopData(data) {
    for (let i = 0; i < data.photos.photo.length; i++){
        let serverId = data.photos.photo[i].server;
        let photoId = data.photos.photo[i].id;
        let secret = data.photos.photo[i].secret;
        let imgURL = `https://live.staticflickr.com/${serverId}/${photoId}_${secret}_q.jpg`;
        createImage(imgURL, data.photos.photo[i].title);
    }
}

function createImage(imgURL, imgTitle) {
    let newImg = document.createElement('img');
    newImg.src = imgURL;
    newImg.title = imgTitle;
    imageSection.appendChild(newImg);

    newImg.addEventListener("click", async function () {
        document.getElementById('lightbox').style.display = "block";
        let bigSrc = newImg.src.replace('q.jpg', 'z.jpg');
        document.getElementById('lightboxPtag').innerText = newImg.title;
        document.getElementById('lightboxImg').setAttribute("src", bigSrc);
    })
}

//--------------------------------//

// EVENT LISTENERS FOR LIGHTBOX //

document.getElementById('lightbox').addEventListener("click", async function () {
    document.getElementById('lightbox').style.display = "none";
})

//--------------------------------//

// EVENT LISTENERS FOR PAGE-BUTTONS //

document.getElementById('imgBtnPrev').addEventListener("click", async function () {
    if (currentPage > 1){
        currentPage--;
        if(currentPage == 1) {
            document.getElementById('imgBtnPrev').style.backgroundColor = 'gray';
            document.getElementById('imgBtnPrev').style.color = 'white';
        }
        loadImages();
    }
    else {
        document.getElementById('imgBtnPrev').style.backgroundColor = 'red';
        setTimeout(function() { document.getElementById('imgBtnPrev').style.backgroundColor = 'gray'; }, 200);
    }
})

document.getElementById('imgBtnNext').addEventListener("click", async function () {
    if (currentPage < totalPages){
        currentPage++;
        if (currentPage > 1) {
            document.getElementById('imgBtnPrev').style.backgroundColor = 'white';
            document.getElementById('imgBtnPrev').style.color = 'black';
        }
        loadImages();
    }
    else {
        document.getElementById('imgBtnNext').style.backgroundColor = 'red';
        setTimeout(function() { document.getElementById('imgBtnNext').style.backgroundColor = 'gray'; }, 200);
    }
})

//--------------------------------//