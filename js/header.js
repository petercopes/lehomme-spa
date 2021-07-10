"use strict";
const navIcon = document.querySelector('.navIcon');
const nav = document.querySelector('nav');
const header = document.querySelector('header');
const closeButton = document.querySelector('.closeLogo');
const icon = document.querySelectorAll('header .icon');
let onHeader = false;
let onNav = false;
const navMenuButton = document.getElementById('mobileNavMenu');

function activateHeader() {
    if (!nav.classList.contains('navBar-Active')) {
        header.classList.add('headerActive');
        icon.forEach((element) => {
            element.classList.add('iconHeaderActive');
        });

        navIcon.classList.add('iconHeaderActive');

    }
}

function deactivateHeader() {
    header.classList.remove('headerActive');
    header.classList.remove('headerOnScroll');
    navIcon.classList.remove('iconHeaderActive');
    icon.forEach((element) => {
        element.classList.remove('iconHeaderActive');
    });

}

function activateHeaderScroll() {
    if (window.scrollY != 0) {
        if (header.classList.contains('headerActive')) {
            header.classList.add('headerOnScroll');
        }
    } else if (header.classList.contains('headerActive')) {
        header.classList.remove('headerOnScroll');
    }
}
nav.addEventListener('mouseenter', () => {
    onNav = true;
});
header.addEventListener('mouseenter', () => {
    activateHeader();
    onHeader = true;
});
header.addEventListener('mouseleave', () => {
    deactivateHeader();
    onHeader = false;
});
document.addEventListener('scroll', activateHeaderScroll);

navIcon.addEventListener('click', () => {
    nav.classList.add('navBar-Active');
    deactivateHeader();

});
navMenuButton.addEventListener('click', () => {
    nav.classList.add('navBar-Active');
})
closeButton.addEventListener('click', () => {
    nav.classList.remove('navBar-Active');
    if (!onHeader) {
        deactivateHeader();
    } else {
        activateHeader();
    }

});
window.addEventListener('keydown', (evt) => {
    if (evt.keyCode == 27) {
        nav.classList.remove('navBar-Active');
        if (!onHeader) {
            deactivateHeader();
        } else {
            activateHeader();
        }

    }
});