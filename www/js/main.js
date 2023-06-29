const apiURL = "https://api.mercadolibre.com";
const storeID = "600";
const $nav = document.querySelector("ion-nav");
let $menu;
const state = {
    products: [],
    productosCarrito: []
}

function navegarMenu(page) {
    let root = undefined;
    $nav.getActive().then(res => {
        console.log(res.component);
        root = res.component;
        if (root === page) {
            console.log($menu);
            $menu.close(); /* por alguna razon misteriosa aca no me cierra menu */
            console.log("misma pagina");
        } else {
            console.log($menu);
            $menu.close();
            cambiarRoot(page);
            console.log("diferente pagina");
        }
        console.log(root);
    });
}
function navegar(page) {
    $nav.push(page);
}
function cambiarRoot(page) {
    $nav.setRoot(page);
}
function volverRoot() {
    $nav.popToRoot();
}

function cargarInicio() {
    let publicidad = ["https://http2.mlstatic.com/D_NQ_798003-MLA50451134607_062022-OO.webp", "https://http2.mlstatic.com/D_NQ_827859-MLA50539839744_072022-OO.webp", "https://http2.mlstatic.com/D_NQ_999479-MLA50402275062_062022-OO.webp"]
    document.getElementById("content-home").innerHTML = `<div class="swiper mySwiper">
        <div class="swiper-wrapper">
            ${publicidad.map((picture) => {
        return (`<div class="swiper-slide"><img src="${picture}"></div>`)
    }).join(``)}
        </div>
        <div class="swiper-pagination"></div>
        </div>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <ion-button id="btnInicio" expand="full" size="large" color="primary" onclick="navegarMenu('page-products')">Productos</ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>`
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
        autoplay: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    })
}

function obtenerProductos() {
    const URL = `${apiURL}/sites/MLU/search?`
    const params = {
        official_store_id: storeID,
        limit: 30,
        offset: 0
    }
    fetch(buildUrl(URL, params)).then(apiToJson).then(listarProductos).catch(console.error);
}

function listarProductos(data, itsLoaded) {
    let infoHtml = "";
    if (itsLoaded) {
        state.products.forEach((prod) => {
            infoHtml +=
                `<product-component id="${prod.id}" title="${prod.title}" thumbnail="${prod.thumbnail}" currency_id="${prod.currency_id}" price="${prod.price}" stock="${prod.stock}"></product-component>`;
        });
    } else {
        for (let prod of data.results) {
            state.products.push({
                id: prod.id,
                title: prod.title,
                thumbnail: prod.thumbnail,
                currency_id: prod.currency_id,
                price: prod.price,
                stock: prod.available_quantity
            });
            infoHtml +=
                `<product-component id="${prod.id}" title="${prod.title}" thumbnail="${prod.thumbnail}" currency_id="${prod.currency_id}" price="${prod.price}" stock="${prod.stock}"></product-component>`;
        }
    }
    document.querySelector("#product-container").innerHTML = infoHtml;
}
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/* function obtenerProductosRandom() {
    let infoHtml = "";
    let productosRandom = [];
    for (let i = 0; i < 6; i++) {
        let random = randomInteger(0, 29);
        productosRandom.push(state.products[random])
    }
    productosRandom.forEach((prod) => {
        infoHtml +=
            `<product-component id="${prod.id}" title="${prod.title}" thumbnail="${prod.thumbnail}" currency_id="${prod.currency_id}" price="${prod.price}" stock="${prod.stock}"></product-component>`;
    });
    document.querySelector("#page-home ion-content").innerHTML = infoHtml;
} */
function ampliarProduto(id) {
    console.log(id);
    let productoAmpliado = {};
    navegar('page-products-amp');
    /* loader in */
    Promise.all([
        fetch(`https://api.mercadolibre.com/items/${id}`).then(apiToJson),
        fetch(`https://api.mercadolibre.com/reviews/item/${id}`).then(apiToJson)
    ])
        .then((infoConsultas) => {
            console.log(infoConsultas[0])
            console.log(infoConsultas[1])
            console.log(infoConsultas[2])
            productoAmpliado = {
                id: id,
                nombre: infoConsultas[0].title,
                currency_id: infoConsultas[0].currency_id,
                precio: infoConsultas[0].price,
                img: infoConsultas[0].pictures[0].secure_url
            }
            document.querySelector("page-products-amp ion-content").innerHTML =
                `<div class="swiper mySwiper">
                    <div class="swiper-wrapper">
                        ${infoConsultas[0].pictures.map((picture) => {
                    return (`<div class="swiper-slide"><img src="${picture.secure_url}"></div>`)
                }).join(``)}
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <ion-grid>
                    <ion-row>
                        <ion-badge color="secondary">${infoConsultas[0].condition === "new" ? "Nuevo" : "Usado"}</ion-badge>
                        <ion-badge color="tertiary">${infoConsultas[0].sold_quantity} vendidos</ion-badge>
                    </ion-row>
                    <ion-row>
                        <p>${infoConsultas[0].title}</p>
                    </ion-row>
                    <ion-row class="ion-justify-content-between ion-align-items-center">
                        <ion-col size="6">
                            <h2>${infoConsultas[0].currency_id} ${infoConsultas[0].price}</h2>
                        </ion-col>
                        <ion-col size="6">
                            <ion-button id="btnAgregarCarrito" expand="full" size="large" color="primary" onclick="agregarAlCarrito('${productoAmpliado.id}','${productoAmpliado.nombre}','${productoAmpliado.precio}','${productoAmpliado.currency_id}','${productoAmpliado.img}')">Agregar al carrito</ion-button>
                        </ion-col>
                    </ion-row>
                    <ion-row class="ion-justify-content-center ion-align-items-center">
                        <ion-col size="12">
                            <ion-accordion-group>
                                <ion-accordion value="features">
                                    <ion-item slot="header" color="light">
                                        <ion-label>Características</ion-label>
                                    </ion-item>
                                    <div class="ion-padding" slot="content">
                                        <ion-list class="features-list">
                                            ${infoConsultas[0].attributes.map((attribute) => {
                    if (attribute.value_name !== null) {
                        return (`<ion-item>
                                    <ion-col class="ion-text-center" size="6">${attribute.name}:</ion-col>
                                    <ion-col class="ion-text-center" size="6">${attribute.value_name}</ion-col>
                                </ion-item>`)
                    }
                }).join(``)}
                                        </ion-list>
                                    </div>
                                </ion-accordion>
                            </ion-accordion-group>
                        </ion-col>
                    </ion-row>
                </ion-grid>`
            var swiper = new Swiper(".mySwiper", {
                slidesPerView: "auto",
                spaceBetween: 30,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                }
            })
        })
        .catch(console.log)
        .finally(/* loader out */);
}

function agregarAlCarrito(id, nombre, precio, currency_id, img) {
    confirmBtn();
    let producto = {
        id: id,
        title: nombre,
        currency_id: currency_id,
        price: precio,
        thumbnail: img
    }
    console.log(producto);
    state.productosCarrito.push(producto);
}

function listarProductosCarrito() {
    const $carrito = document.getElementById("content-carrito");
    $carrito.innerHTML = "";
    let infoHtml = "";
    let btnForm = `<ion-button id="btnForm" expand="full" size="large" color="primary" onclick="abrirForm()">Comprar</ion-button>`;
    if (state.productosCarrito.length !== 0) {
        state.productosCarrito.forEach((prod) => {
            infoHtml +=
                `<product-component-carrito id="${prod.id}" title="${prod.title}" thumbnail="${prod.thumbnail}" currency_id="${prod.currency_id}" price="${prod.price}"></product-component-carrito>`;
        });
        $carrito.innerHTML = infoHtml + btnForm;
    } else {
        infoHtml = `<ion-grid>
                        <ion-col size="12" ion-justify-content-center ion-align-items-center>
                            <p>No hay productos en el carrito</p>
                        </ion-col>
                    </ion-grid>`;
        $carrito.innerHTML = infoHtml;
    }

}

function confirmBtn() {
    const btnA = document.getElementById("btnAgregarCarrito");
    btnA.setAttribute("color", "success");
    btnA.setAttribute("disabled", true);
    btnA.innerHTML = `<ion-icon name="checkmark-outline"></ion-icon>`;
}

function abrirForm() {
    navegar('form-compra');
}

function finalizarCompra() {
    const $nombre = document.getElementById("inputNombre");
    const $apellido = document.getElementById("inputApellido");
    const $tarjeta = document.getElementById("inputTarjeta");
    const $vence = document.getElementById("inputVence");
    const $CVC = document.getElementById("inputCVC");
    if ($nombre.value !== "" && $apellido.value !== "" && $tarjeta.value !== "" && $vence.value !== "" && $CVC.value !== "") {
        navegarMenu("page-home");
        handleButtonClick("success", "Compra realizada con éxito");
        state.productosCarrito = []
    } else {
        handleButtonClick("danger", "Debe completar todos los capos")
    }
}

async function handleButtonClick(color, texto) {
    const toast = await toastController.create({
        color: color,
        duration: 3000,
        message: texto,
        showCloseButton: true,
    });

    await toast.present();
}