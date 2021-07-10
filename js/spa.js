"use strict";

let sectionPartial = document.querySelector(".sectionPartial");
let home = document.querySelector(".home");
let products = document.querySelector(".shop");
let contact = document.querySelector(".contact");
let headerHomeButton = document.getElementById('homeHeaderLogo');
headerHomeButton.addEventListener('click', async() => {
    await mostrarPagina('home');
});
home.addEventListener('click', async() => {
    await mostrarPagina('home');
});
products.addEventListener('click', async() => {
    await mostrarPagina('productos');
});
contact.addEventListener('click', async() => {
    await mostrarPagina('contacto');
});
async function mostrarPagina(pagina) {
    try {
        let res = await fetch(`${pagina}.html`);
        let web = await res.text();
        sectionPartial.innerHTML = web;
        nav.classList.remove('navBar-Active');
        if (!onHeader) {
            deactivateHeader();
        } else {
            activateHeader();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        ejecutarInits(pagina);

    } catch (error) {
        console.log(error);
    }
}

function ejecutarInits(pagina) {
    let scripts = document.querySelectorAll('.funcionalidad');
    if (scripts.length >= 2) {
        for (let index = 2; index < scripts.length; index++) {
            scripts[index].remove();
        }
    }
    if (pagina === 'home') {
        let fileRef1 = document.createElement('script');
        fileRef1.setAttribute("src", `js/imgSlideAnim.js`);
        fileRef1.setAttribute("class", `funcionalidad`);
        document.getElementsByTagName("body")[0].appendChild(fileRef1);
        let fileRef2 = document.createElement('script');
        fileRef2.setAttribute("src", `js/buttonShop.js`);
        fileRef2.setAttribute("class", `funcionalidad`);
        document.getElementsByTagName("body")[0].appendChild(fileRef2);
    }
    if (pagina === 'contacto') {
        let fileRef1 = document.createElement('script');
        fileRef1.setAttribute("src", `js/contact.js`);
        fileRef1.setAttribute("class", `funcionalidad`);
        document.getElementsByTagName("body")[0].appendChild(fileRef1);
    }
    if (pagina === 'productos') {
        let fileRef1 = document.createElement('script');
        fileRef1.setAttribute("src", `js/dinamicTable.js`);
        fileRef1.setAttribute("class", `funcionalidad`);
        document.getElementsByTagName("body")[0].appendChild(fileRef1);
        let formButton = document.getElementById('displayAddForm');
        let adminForm = document.getElementById('loadProductsForm');
        formButton.addEventListener('click',(e)=>{
            e.preventDefault();
            adminForm.classList.remove('hide');
            formButton.classList.add('hide');
        })
        let closeFormButton = document.getElementById('closeMainForm');
        closeFormButton.addEventListener('click',()=>{
            adminForm.classList.add('hide');
            formButton.classList.remove('hide');
        })
    }
    if (pagina === 'producto') {
        let fileRef1 = document.createElement('script');
        fileRef1.setAttribute("src", `js/sizeChart.js`);
        fileRef1.setAttribute("class", `funcionalidad`);
        document.getElementsByTagName("body")[0].appendChild(fileRef1);
        let closeButton = document.querySelector('.exitProducto');
        closeButton.addEventListener('click', async(e) => {
            await mostrarPagina('productos');
            ejecutarInits();
        })
    }
}

mostrarPagina('home');