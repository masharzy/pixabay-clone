const key = "26117422-af3e2ef1c540a8e6b4a8e3e60";

const getELementId = (id) => {
  return document.getElementById(id);
};

document.getElementById("search-form").addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    if (getELementId("search-form").value === "") {
      alert("Please enter a value to search");
    } else {
      getELementId("loader").style.display = "block";
      getELementId("results").innerHTML = "";
      const searchValue = getELementId("search-form");
      const type = getELementId("type");
      const url = `https://pixabay.com/api/?key=${key}&q=${searchValue.value}&image_type=${type.value}&pretty=true`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => getImages(data));

      const getImages = (data) => {
        if (data.totalHits === 0) {
          getELementId("loader").style.display = "none";
          alert("No images found");
        }
        data.hits.forEach((image) => {
          const results = getELementId("results");
          const div = document.createElement("div");
          div.classList.add("item");
          div.innerHTML = `
                
                <a href="${image.pageURL}"><img class="w-100" src="${image.webformatURL}" alt=""></a> 
                <div class="overlay">
                    <div class="text">
                        <h3><a href="${image.pageURL}">${image.tags}</a></h3>
                        <p>
                            <a href="${image.pageURL}"><i class="fa fa-thumbs-up"></i> ${image.likes}</a>
                            <a href="${image.pageURL}"><i class="fa fa-comment"></i> ${image.comments}</a>
                        </p>
                    </div>
                </div>
                <a href="${image.pageURL}" class="view-button">View Image</a>
                
                `;
          results.appendChild(div);
        });
        getELementId("loader").style.display = "none";
      };
      event.preventDefault();
      document.getElementById("search-btn").click();
    }
  }
});
