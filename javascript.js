const nabthat = (function () {
    
    const mydata = JSON.parse(data);
    const articlesArr = [];

    const replaceButton = document.getElementById('zastap-button');
    const addButton = document.getElementById('doklej-button');
    const resetButton = document.getElementById('reset-button');
    const nameButton = document.getElementById('name-button');

    const alert = document.getElementById('alert');
    const alertText = document.getElementById('alert-text');
    const alertClose = document.getElementsByClassName('close')[0];

    let currentArticle = null;

    function showAlert(message) {
        alert.style.display = 'block';
        alertText.innerText = message;
    }

    alertClose.addEventListener('click', function() {
        alert.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == alert) {
        alert.style.display = 'none';
        }
    }); 

    nameButton.addEventListener('click', function() {
        const off = document.getElementById('user-info-off');
        const on = document.getElementById('user-info-on');
        off.style.display === 'block' ? off.style.display = 'none' : off.style.display = 'block';
        on.style.display === 'none' ? on.style.display = 'block' : on.style.display = 'none';
        document.getElementById('toggle-menu').checked = false; 
    });

    resetButton.addEventListener('click', function() {
        restart();
        document.getElementById('toggle-menu').checked = false;
    });

    replaceButton.addEventListener('click', function() {
        if (articlesArr.length === mydata.length) {
            articlesArr.length = 0;
            selectedOption();
            replaceArticle(currentArticle);
        } else {
            selectedOption();
            isArticle(currentArticle) ? showAlert('Artykuł już wykorzystany!') : replaceArticle(currentArticle);
        }
    });

    addButton.addEventListener('click', function() {
        if (articlesArr.length === mydata.length) {
            showAlert('Koniec artykułów!');
        } else {
            selectedOption();
            isArticle(currentArticle) ? showAlert('Artykuł już wykorzystany!') : addArticle(currentArticle);
        }
    });
    
    function addArticle(id) {
        articlesArr.push(id);
        console.log(articlesArr);
        return document.querySelector('.text-contianer').innerHTML += '<article>' + mydata[(id-1)]['content'] + '</article>';
    }

    function replaceArticle(id) {
        articlesArr.length = 0;
        articlesArr.push(id);
        console.log(articlesArr);
        return document.querySelector('.text-contianer').innerHTML = '<article>' + mydata[(id-1)]['content'] + '</article>';
    }
    
    function checkOption() {
        return checkedOption = [...document.getElementsByClassName('radio-input')].filter( el => el.checked )[0].value;
    }

    function isArticle(id) {
        return articlesArr.includes(id) ? true : false;
    }

    function randomArticle() {
        currentArticle = Math.floor((Math.random() * (mydata.length)) + 1);
        if (isArticle(currentArticle)) {
            randomArticle();
        } 
    }

    function selectedOption() {
        if (checkOption() === 'first-option') {
            currentArticle = 1;
        } else if (checkOption() === 'second-option') {
            currentArticle = 2;
        } else if (checkOption() === 'random-option') {
            randomArticle();
        }
    }

    function restart() {
        replaceArticle(1);
        [...document.getElementsByClassName('radio-input')][0].checked = true;
    }
    
    restart();

})();