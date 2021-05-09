const btn = document.querySelector(".searchBtn");

btn.addEventListener("click", async function () {

    const apiKey = "api_key=0beca48521ee0ee70915815ea49063f4";
    const searchText = document.forms["textInput"]["sText"].value;
    const text = "text=" + searchText;
    const query = "sort=date-taken-asc&per_page=10&format=json&nojsoncallback=1"; // nojsoncallback=1
    const flickrURL = `https://api.flickr.com/services/rest/?method=flickr.photos.search&${apiKey}&${text}&${query}`; // api.flickr.com || www.flickr.com
    
    console.log(flickrURL);

    fetch(flickrURL)
    .then(response => response.json())
    .then(data => {
        
        /*const myArr = data;
        console.log(myArr);
        console.log(myArr.photos);
        console.log(myArr.photos.photo);
        console.log(myArr.photos.photo[0]);
        console.log(myArr.photos.photo[0].id);
        console.log(myArr.stat);*/

        //const imageSection = document.getElementById("main");

        for (let i = 0; i < data.photos.photo.length; i++){

            let farmId = myArr.photos.photo[i].farm;
            let serverId = data.photos.photo[i].server;
            let photoId = data.photos.photo[i].id;
            let secret = data.photos.photo[i].secret;
            let imgURL = `https://farm${farmId}.staticflickr.com/${serverId}/${photoId}_${secret}_m.jpg`; // [mstzb]   https://farm${farmId}.staticflickr.com/${serverId}/${photoId}_${secret}_m.jpg
            // https://live.staticflickr.com/${serverId}/${photoId}_${secret}_m.jpg
            createImage(imgURL);
            //let img = document.createElement("img")
            //img.setAttribute("src", imgURL);
            //imageSection.appendChild(img);
        }
    });

    function createImage(imgURL) {
        console.log("hrj");
        //const imageSection = document.getElementById('gallerySection');
        let img = document.createElement("img");
        console.log("here we go");
        img.setAttribute("src", imgURL);
        img.textContent = "hej";
        console.log(img.src);
        document.querySelector("main").appendChild(img); // getElementById("main")
        console.log("im going crazy");
    }

    //console.log(responseData);

    /*const response = await fetch(flickrURL);
    console.log(response);
    console.log(response.url);
    console.log(response.ok);
    const result = await response.json();
    console.log(result.results);

    console.log(flickrURL);
    
    console.log(information)
    console.log(information.photo)
    const imagelist = document.querySelector(".uList")

     for (let i = 0; i< information.photo.length; i++){

        const listitem = document.createElement("li")
        listitem.innerText = "hello"
        const img = document.createElement("img")
        imagelist.append(listitem)
        //listitem.append(img)
        
     }*/
})