"use strict";

function initImgSlide () {
    let image = document.querySelector("#img1");
    let leftSwipeButton = document.querySelector('.leftSwipe');
    let rightSwipeButton = document.querySelector('.rightSwipe');
    leftSwipeButton.addEventListener('click', swipeImage);
    rightSwipeButton.addEventListener('click', swipeImage);
    function swipeImage() {
        if (image.src.includes('images/home1.jpg')) {
            image.classList.add('hidden');
            setTimeout(() => {
                image.src = "images/home2.jpg";
                image.classList.remove('hidden');
            }, 300);

        } else {
            image.classList.add('hidden');
            setTimeout(() => {
                image.src = "images/home1.jpg";
                image.classList.remove('hidden');
            }, 200);

        }
    }
}

initImgSlide();