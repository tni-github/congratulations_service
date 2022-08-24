const buttonMen = document.querySelector('.header__button-gender_men');
const buttonWomen = document.querySelector('.header__button-gender_women');
const body = document.body;
const cardImage = document.querySelector('.card__image');
const cardText = document.querySelector('.card__text');
const buttonText = document.querySelector('.header__button-change_text');
const buttonImage = document.querySelector('.header__button-change_image');

const state = {
    gender: body.classList.contains('women') ? 'women' : 'men',
};

const getRandomForArray = (arr) => {
    const randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber];
}

const getData = () => { return fetch('db.json').then((response) => response.json()) };

const changeCard = () => {
    if (state.photo.includes('black')) {
        cardText.style.color = '#fff';
    } else {
        cardText.style.color = '';
    }
    cardImage.src = `image/${state.photo}`;
    cardText.innerHTML = state.text.replaceAll('\n', '<br>');
}

const getDataToCard = () => {
    getData().then(data => {
        state.text = getRandomForArray(data.text[state.gender]);
        state.photo = getRandomForArray(data.photo[state.gender]);
        changeCard();
    });
}

const changeToMen = () => {
    if (state.gender !== 'men') {
        body.classList.add('men');
        body.classList.remove('women');
        state.gender = 'men';
        getDataToCard();
    }
};

const changeToWomen = () => {
    if (state.gender !== 'women') {
        body.classList.add('women');
        body.classList.remove('men');
        state.gender = 'women';
        getDataToCard();
    }
};

const changeText = () => {
    getData().then(data => {
        state.text = getRandomForArray(data.text[state.gender]);
        changeCard();
    });
};

const changeImage = () => {
    getData().then(data => {
        state.photo = getRandomForArray(data.photo[state.gender]);
        changeCard();
    });
};

buttonMen.addEventListener('click', changeToMen);
buttonWomen.addEventListener('click', changeToWomen);
buttonText.addEventListener('click', changeText);
buttonImage.addEventListener('click', changeImage);
getDataToCard();