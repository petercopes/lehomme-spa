"use strict";

function initButton () {
    let button = document.querySelector(".products");
    button.addEventListener('click', ()=> {
        mostrarPagina('productos');
    });
}

initButton();