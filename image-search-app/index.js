const apiKey = "a_K3PU5BnhIvOF9cmzd9HTC211Fi1OH9eC8tbfljWgU";
const formElement = document.querySelector("form");
const searchInput = document.getElementById("search");
const searchResultElement= document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

let inputData = "";
let page=1;

async function searchImages(){
    inputData = searchInput.value;
    const apiUrl=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;

    const response = await fetch(apiUrl);
    const data =await response.json();
    if(page ===1){
        searchResultElement.innerHTML ="";
    }
    const results = data.results;
    results.map((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src =result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href= result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink),
        searchResultElement.appendChild(imageWrapper)

    });

    page++

    if(page > 1){
        showMoreButton.style.display = "block";
    }
}

formElement.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchImages();
});

showMoreButton.addEventListener("click",()=>{
    searchImages();
})