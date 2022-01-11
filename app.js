(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    function addImage() {
        let htmlContent = '';
        const data = JSON.parse(this.responseText);

        //check for results
        if(data.results.length != 0){
            const firstImage = data.results[0];

            //create figure element for the first image
            htmlContent = `<figure><img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`

            //display figure on the page
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }else {
            const errorMsge = '<p>Image not found</p>';
            responseContainer.insertAdjacentHTML('afterbegin', errorMsge);
        }
        
    }

    function handleImgError() {
        alert('faild getting image!');
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // create unsplash request
        const unsplashRequest = new XMLHttpRequest();

        unsplashRequest.onload = addImage;
        unsplashRequest.onerror = handleError;

        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID eVvhMtgcwefg9uV2yON8YC2l3Pt-aFtgeY18CkpEpFQ');
        unsplashRequest.send();
    });
})();
