"use strict";

async function initDinamicTable() {
    const url = "https://60d8bcffeec56d00174774a8.mockapi.io/productos";
    let prodRandom = [
        { "name": "ABRIGO ESTRUCTURA", "price": 35990, "stock": "AVAILABLE", "imagen": "images/prodRandom/2.jpg" },
        { "name": "CAZADORA DOBLE FAZ", "price": 17990, "stock": "OUT OF STOCK", "imagen": "images/prodRandom/1.jpg" },
        { "name": "CAZADORA BOMBER CONFORT", "price": 10990, "stock": "AVAILABLE", "imagen": "images/prodRandom/3.jpg" },
        { "name": "CAZADORA BORREGUILLO", "price": 10990, "stock": "AVAILABLE", "imagen": "images/prodRandom/4.jpg" },
        { "name": "CAZADORA CANGURO", "price": 10990, "stock": "OUT OF STOCK", "imagen": "images/prodRandom/5.jpg" },
        { "name": "CAZADORA EFECTO PIEL", "price": 14990, "stock": "OUT OF STOCK", "imagen": "images/prodRandom/6.jpg" },
        { "name": "SUDADERA LIMITED EDITION", "price": 9590, "stock": "AVAILABLE", "imagen": "images/prodRandom/7.jpg" },
        { "name": "BOTÍN PIEL SPORT NEGRO", "price": 17990, "stock": "OUT OF STOCK", "imagen": "images/prodRandom/8.jpg" },
        { "name": "CAZADORA ACOLCHADA", "price": 17990, "stock": "AVAILABLE", "imagen": "images/prodRandom/9.jpg" }
    ]
    let tableJson = document.querySelector(".tableJson");
    let pageNumber = 1;
    let limitProductsPage = 6;
    let maxPage = 99999;
    let nextPageButton = document.getElementById('nextPageButton');
    nextPageButton.addEventListener('click', async(e) => {
        e.preventDefault();
        if (pageNumber <= maxPage) {
            pageNumber += 1;

            await loadProductos(pageNumber);
            updateBySlider();
            if (pageNumber > maxPage) {
                maxPage = pageNumber;
            }
        }
    });
    let previousPageButton = document.getElementById('previousPageButton');
    previousPageButton.addEventListener('click', async(e) => {
        e.preventDefault();
        if (pageNumber - 1 > 0) {
            pageNumber -= 1;
            await loadProductos(pageNumber)
            updateBySlider();
        }

    });


    function createProductDiv(product) {
        let newDiv = document.createElement('div');
        let containerStock = document.createElement('div');
        containerStock.classList.add("containerStock");
        containerStock.addEventListener('click', async(e) => {
            await mostrarPagina('producto');
            updateProductView(product);
        });
        newDiv.classList.add("productWrapper");
        let imagen = document.createElement('img');
        imagen.src = product.imagen;
        imagen.classList.add("small");
        containerStock.appendChild(imagen);
        let stock = document.createElement('div');
        let stockText = document.createElement('p');
        stockText.innerText = product.stock;
        if (product.stock === "AVAILABLE") {
            stock.classList.add("stock");
        } else {
            stock.classList.add("noStock");
        }
        stock.appendChild(stockText);
        containerStock.appendChild(stock);
        newDiv.appendChild(containerStock);
        let infoProd = document.createElement('div');
        let nameProd = document.createElement('figcaption');
        nameProd.innerText = product.name;
        nameProd.classList.add("uppercase");
        infoProd.appendChild(nameProd);
        let price = document.createElement('p');
        price.setAttribute(`data-price`, `${product.price}`)
        price.innerText = `${product.price},00 ARS`;
        price.classList.add("priceProd");
        infoProd.appendChild(price);
        infoProd.classList.add("infoProd");
        infoProd.addEventListener('click', async(e) => {
            await mostrarPagina('producto');
            updateProductView(product);
            productSliderSetUp(product);
            console.log('done');
        });
        newDiv.appendChild(infoProd);
        return newDiv;
    }

    function updateProductView(product) {
        const productName = document.querySelector('.productTitle');
        const priceM = document.querySelector('.productPrice.mobile');
        const priceD = document.querySelector('.productPrice.desktop');
        const productDescription = document.querySelector('.productDescription');
        const productImage = document.querySelector('.bigImg');
        productName.innerHTML = product.name;
        priceM.innerHTML = `${product.price},00 ARS`;
        priceD.innerHTML = `${product.price},00 ARS`;
        productDescription.innerHTML = `${product.name}. Este producto fue hecho en Italia`;
        productImage.src = product.imagen;
    }
    async function createProductContainer(product) {
        let productDiv = createProductDiv(product);
        let productWrapper = document.createElement('div');
        productWrapper.classList.add("displayLine");
        productWrapper.appendChild(productDiv);
        let deleteButton = document.createElement('button');
        deleteButton.innerText = "delete";
        deleteButton.classList.add('deleteProductButton','button');

        deleteButton.addEventListener('click', async(e) => {
            await deleteProduct(product.codigoProducto);
            await loadProductos(pageNumber);
        });
        productWrapper.appendChild(deleteButton);
        let editButton = document.createElement('button');

        editButton.codigo = product.codigoProducto;
        editButton.addEventListener('click', async(e) => {
            let form = document.getElementById("hiddenForm");
            form.codigo = editButton.codigo;

            form.classList.remove("hide");
            form.classList.add("column");
            form.classList.add("hiddenFormActivated");
            form.addEventListener('submit', async function() {
                event.preventDefault();
                let formData = new FormData(this);
                let newObject = {
                    "name": formData.get('product'),
                    "price": formData.get('price'),
                    "stock": formData.get('stock'),
                    "imagen": formData.get('imagen')
                };
                if (form.codigo === product.codigoProducto) {
                    console.log('checks out');
                    await editProduct(product.codigoProducto, newObject);
                    await loadProductos(pageNumber);
                }
                form.classList.remove("column");
                form.classList.remove("hiddenFormActivated");
                form.classList.add("hide");
            });
        });
        editButton.innerText = "edit";
        editButton.classList.add('editProductButton','button');
        productWrapper.appendChild(editButton);
        tableJson.appendChild(productWrapper);
    }

    function clearTable() {
        while (tableJson.firstChild) {
            tableJson.removeChild(tableJson.lastChild);

        }
    }
    async function loadProductos(number) {
        try {
            let page = `?page=${pageNumber}&limit=${limitProductsPage}`;
            let res = await fetch(url + page);
            let productos = await res.json();
            clearTable();
            if (productos.length > 0) {
                for (let producto of productos) {
                    createProductContainer(producto);
                }
            } else {
                pageNumber -= 1;
                maxPage = pageNumber;
                loadProductos(pageNumber);
            }
        } catch (error) {
            console.log(error)
        }
    }
    async function uploadProduct(product) {
        try {
            let res = await fetch(url, {
                "method": "POST",
                "headers": { 'Content-Type': 'application/json' },
                "body": JSON.stringify(product)
            });
            if (res.status == 201) {
                console.log('añadido con exito');
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function editProduct(id, newObject) {
        try {
            let res = await fetch(`${url}/${id}`, {
                "method": "PUT",
                "headers": { 'Content-Type': 'application/json' },
                "body": JSON.stringify(newObject)
            });
            if (res.status == 200) {
                console.log("editado correctamente");
            } else {
                console.log(res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function deleteProduct(id) {
        try {
            let res = await fetch(`${url}/${id}`, {
                "method": "DELETE"
            });
            if (res.status == 200) {
                console.log('eliminado exitosamente');
            } else {
                console.log(res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    let btnVaciar = document.getElementById("vaciar").addEventListener('click', emptyDataBase);
    async function emptyDataBase() {
        event.preventDefault();
        try {
            let res = await fetch(url);
            let productos = await res.json();
            for (let product of productos) {
                await deleteProduct(product.codigoProducto);
            }
            clearTable();
            pageNumber = 1;
        } catch (error) {
            console.log(error);
        }
    }

    function verificarNoRepeticion(arreglo, pos) {
        for (let index = 0; index < arreglo.length; index++) {
            if (arreglo[index] == pos) {
                while (arreglo[index] == pos) {
                    pos = Math.floor(Math.random() * 9);
                }
            }
        }
        return pos;
    }

    let upload3RandomButton = document.getElementById("btn3");
    upload3RandomButton.addEventListener('click', async(e) => {
        e.preventDefault();
        let posExistentes = [];
        for (let i = 1; i <= 3; i++) {
            let randomPos = Math.floor(Math.random() * 9);
            randomPos = verificarNoRepeticion(posExistentes, randomPos);
            posExistentes.push(randomPos);
            await uploadProduct(prodRandom[randomPos]);
        }
        await loadProductos(pageNumber);
    });

    let cantidadProductos = document.getElementById("cantCol");
    let form1 = document.getElementById("form1");
    let form2 = document.getElementById("form2");
    cantidadProductos.addEventListener('change', () => {
        if (cantidadProductos.value == "1") {
            form2.children[0].classList.remove("column");
            form2.children[0].classList.add("hide");
        } else {
            form2.children[0].classList.remove("hide");
            form2.children[0].classList.add("column");
        }
    })
    let alertForm = document.querySelector(".invalid");
    let uploadButton = document.getElementById("btncargar");
    uploadButton.addEventListener('click', async(e) => {
        e.preventDefault();
        let formData1 = new FormData(form1);
        let name1 = formData1.get('product');
        let price1 = formData1.get('price');
        if (cantidadProductos.value == "1") {
            if ((name1 != "") && (price1 != "")) {
                await createObject(formData1);
            } else {
                mostrarAviso();
            }
        } else {
            let formData2 = new FormData(form2);
            let name2 = formData2.get('product');
            let price2 = formData2.get('price');
            if ((name1 != "") && (price1 != "") && (name2 != "") && (price2 != "")) {
                await createObject(formData1);
                await createObject(formData2);
            } else {
                mostrarAviso();
            }
        }
        await loadProductos(pageNumber);

    });
    async function createObject(formData) {
        let newObject = {
            "name": formData.get('product'),
            "price": parseInt(formData.get('price')),
            "stock": formData.get('stock'),
            "imagen": formData.get('imagen')
        };
        await uploadProduct(newObject);
    }

    function mostrarAviso() {
        alertForm.innerText = "Faltan completar campos."
        setTimeout(() => {
            alertForm.innerText = "";
        }, 2500)
    }
    await loadProductos(1);

    let slider = document.querySelector(".slider");
    slider.addEventListener('change', updateBySlider);

    function updateBySlider() {
        let price = document.getElementById("priceRange");
        price.innerHTML = `${slider.value},00 ARS`;
        let childrenTable = tableJson.children;
        for (let index = 0; index < childrenTable.length; index++) {
            let precio = childrenTable[index].children[0].children[1].children[1];
            precio = parseInt(precio.dataset.price);
            if (precio > slider.value) {
                childrenTable[index].classList.add("hide");
            } else {
                childrenTable[index].classList.remove("hide");
            }
        }
    }
}

initDinamicTable();