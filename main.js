// GLOBAL SCOPE VARIABLES //

let currentPage = 1;
let totalPages = 0;
const imageSection = document.getElementById('mainImgArea');

// GLOBAL SCOPE VARIABLES //

document.querySelector(".searchBtn").addEventListener("click", async function () {
    currentPage = 1;
    loadImages();
})

function loadImages() {
    imageSection.innerHTML = "";
    const apiKey = "api_key=0beca48521ee0ee70915815ea49063f4";
    const searchText = document.getElementById("searchText").value;
    if (searchText == "") {location.reload();}
    else {
    const text = "text=" + searchText;
    const query = "sort=date-taken-asc&per_page=20&format=json&nojsoncallback=1" + `&page=${currentPage}`; // nojsoncallback=1 // per_page=20
    const flickrURL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&${apiKey}&${text}&${query}`;
    talkToFlickr(flickrURL);
    }
}

async function talkToFlickr(flickrURL) {
        console.log(flickrURL) // ska ta bort
        const response = await fetch(flickrURL);
        const data = await response.json();
        totalPages = data.photos.pages;
        loopData(data);
}

function loopData(data) {
    for (let i = 0; i < data.photos.photo.length; i++){
        //let farmId = data.photos.photo[i].farm; // https://live.staticflickr.com/${serverId}/${photoId}_${secret}_m.jpg
        let serverId = data.photos.photo[i].server;
        let photoId = data.photos.photo[i].id;
        let secret = data.photos.photo[i].secret;
        let imgURL = `https://live.staticflickr.com/${serverId}/${photoId}_${secret}_q.jpg`; // https://farm${farmId}.staticflickr.com/${serverId}/${photoId}_${secret}_m.jpg
        createImage(imgURL);
    }
}

function createImage(imgURL) {
    let newImg = document.createElement('img');
    newImg.src = imgURL;
    imageSection.appendChild(newImg);

    newImg.addEventListener("click", async function () { // inte implementerat
        document.getElementById('lightbox').style.display = "block";
        let bigSrc = newImg.src.replace('q.jpg', 'z.jpg');
        document.getElementById('lightboxImg').setAttribute("src", bigSrc);
    })
}

document.getElementById('lightbox').addEventListener("click", async function () {
    document.getElementById('lightbox').style.display = "none";
})

document.getElementById('imgBtnPrev').addEventListener("click", async function () {
    if (currentPage > 1){
        currentPage--;
        loadImages();
    }
    // else some felmeddelande
})

document.getElementById('imgBtnNext').addEventListener("click", async function () {
    if (currentPage < totalPages){
        currentPage++;
        loadImages();
    }
    // else some felmeddelande
})