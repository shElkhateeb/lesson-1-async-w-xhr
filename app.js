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
        }else {
            htmlContent = '<p>Image not found</p>';
        }
        //display figure on the page if image found
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

    }

    function addArticles() {
        const data = JSON.parse(this.responseText);
        let htmlContent = '';

        //check if articles found
        if(data.response.docs.length != 0){
            for (let i = 0; i<data.response.docs.length; i++){
                htmlContent += `<h2><a href=${data.response.docs[i].web_url} target="_blank">${data.response.docs[i].headline.main}</a></h2>
                <p>${data.response.docs[i].abstract}</p>`
            }
        } else {
            htmlContent = '<p>Articles not found</p>';
        }
        //display articles if found or an error message if not found
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }

    function handleImgError() {
        alert('faild getting image!');
    }

    function handleArticleError() {
        alert('faild getting article!');
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // create unsplash request
        const unsplashRequest = new XMLHttpRequest();

        unsplashRequest.onload = addImage;
        unsplashRequest.onerror = handleImgError;

        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID eVvhMtgcwefg9uV2yON8YC2l3Pt-aFtgeY18CkpEpFQ');
        unsplashRequest.send();

        // create New York Times request
        const nytRequest = new XMLHttpRequest();

        nytRequest.onload = addArticles;
        nytRequest.onerror = handleArticleError;

        nytRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=umb6APL0yIH53kIeGIZxdp8SIT41Rsy3`);
        nytRequest.send();
    });
})();
