const btn = document.querySelector(".searchBtn");
console.log(btn)

btn.addEventListener("click", async function () {

    const apiKey = "api_key=0beca48521ee0ee70915815ea49063f4";
    const searchText = document.getElementById("searchText").value;
    const text = "text=" + searchText;
    const query = "sort=date-taken-asc&per_page=20&format=json&nojsoncallback=1"; // nojsoncallback=1
    const flickrURL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&${apiKey}&${text}&${query}`; // api.flickr.com || www.flickr.com

    console.log(searchText)
    //console.log(flickrURL);

    talkToFlickr(flickrURL);

    /*fetch(flickrURL)
    .then(response => response.json())
    .then(data => {
        
        /*const myArr = data;
        console.log(myArr);
        console.log(myArr.photos);
        console.log(myArr.photos.photo);
        console.log(myArr.photos.photo[0]);
        console.log(myArr.photos.photo[0].id);
        console.log(myArr.stat);

        //const imageSection = document.getElementById("main");

        for (let i = 0; i < data.photos.photo.length; i++){

            //let farmId = data.photos.photo[i].farm;
            let serverId = data.photos.photo[i].server;
            let photoId = data.photos.photo[i].id;
            let secret = data.photos.photo[i].secret;
            let imgURL = `https://live.staticflickr.com/${serverId}/${photoId}_${secret}_s.jpg`; // [mstzb]   https://farm${farmId}.staticflickr.com/${serverId}/${photoId}_${secret}_m.jpg
            // https://live.staticflickr.com/${serverId}/${photoId}_${secret}_m.jpg
            createImage(imgURL);
        }
    }).catch(err => {
        console.log(err);
    });*/
})

async function talkToFlickr(flickrURL) {
        console.log(flickrURL);
        const response = await fetch(flickrURL);
        console.log("response recieved")
        const data = await response.json();
        console.log("data recieved")
        console.log(data)
        loopData(data);
}

 function loopData(data) {
    for (let i = 0; i < data.photos.photo.length; i++){
        //let farmId = data.photos.photo[i].farm;
        let serverId = data.photos.photo[i].server;
        let photoId = data.photos.photo[i].id;
        let secret = data.photos.photo[i].secret;
        let imgURL = `https://live.staticflickr.com/${serverId}/${photoId}_${secret}_q.jpg`; // [mstzb]   https://farm${farmId}.staticflickr.com/${serverId}/${photoId}_${secret}_m.jpg
        // https://live.staticflickr.com/${serverId}/${photoId}_${secret}_m.jpg
        createImage(imgURL);
    }
}

 function createImage(imgURL) {
    let imageSection = document.getElementById('mainImgArea');
    console.log("here we go");
    let imgTag = document.createElement('img');
    imgTag.src = imgURL;
    //imgTag.setAttribute("src", imgURL)
    console.log(imgTag.src);
    imageSection.appendChild(imgTag);
    console.log("im going crazy");
}