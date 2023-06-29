
customElements.define(
    "page-home",
    class extends HTMLElement {
        connectedCallback() {
            this.innerHTML = document.getElementById("page-home").innerHTML;
            cargarInicio();
        }
    }
);
customElements.define(
    "page-products",
    class extends HTMLElement {
        connectedCallback() {
            this.innerHTML = document.getElementById("page-products").innerHTML;
            if (state.products.length === 0) {
                document.querySelector("#product-container").innerHTML = `<loader-screen></loader-screen>`;
                obtenerProductos();
            } else {
                document.querySelector("#product-container").innerHTML = `<loader-screen></loader-screen>`;
                listarProductos(state.products, true);
            }
        }
    }
);
customElements.define(
    "page-favorites",
    class extends HTMLElement {
        connectedCallback() {
            this.innerHTML = document.getElementById("page-favorites").innerHTML;
        }
    }
);
customElements.define(
    "product-component",
    class extends HTMLElement {
        connectedCallback() {
            let descripcion = this.getAttribute("title");
            this.innerHTML =
                `<ion-grid>
                    <ion-row class="listaProducto ion-justify-content-start ion-align-items-center">
                        <ion-col size="3">
                            <img src="${this.getAttribute("thumbnail")}" />
                        </ion-col>
                        <ion-col size="9">
                            <ion-text>
                                <h2>${this.getAttribute("currency_id") + " " + this.getAttribute("price")}<h2>
                                <p class="descripcionProducto">${descripcion.slice(0, 50)}</p>
                            </ion-text>
                        </ion-col>
                    </ion-row>
                </ion-grid>`
            this.addEventListener("click", () => ampliarProduto(this.getAttribute("id")));
        }
    }
);
customElements.define(
    "product-component-carrito",
    class extends HTMLElement {
        connectedCallback() {
            let descripcion = this.getAttribute("title");
            this.innerHTML =
                `<ion-grid>
                    <ion-row class="listaProducto ion-justify-content-start ion-align-items-center">
                        <ion-col size="3">
                            <img src="${this.getAttribute("thumbnail")}" />
                        </ion-col>
                        <ion-col size="9">
                            <ion-text>
                                <h2>${this.getAttribute("currency_id") + " " + this.getAttribute("price")}<h2>
                                <p class="descripcionProducto">${descripcion.slice(0, 50)}</p>
                            </ion-text>
                        </ion-col>
                    </ion-row>
                </ion-grid>`
        }
    }
);
customElements.define(
    "page-products-amp",
    class extends HTMLElement {
        connectedCallback() {
            this.innerHTML = document.getElementById("page-products-amp").innerHTML;
        }
    }
);
customElements.define(
    "header-navigation",
    class extends HTMLElement {
        connectedCallback() {
            this.innerHTML = document.getElementById("header-navigation").innerHTML;
            $menu = document.querySelector("ion-menu");
        }
    }
);
customElements.define(
    "back-navigation",
    class extends HTMLElement {
        connectedCallback() {
            this.innerHTML = document.getElementById("back-navigation").innerHTML;
        }
    }
);
customElements.define(
    "page-carrito",
    class extends HTMLElement {
        connectedCallback() {
            this.innerHTML = document.getElementById("page-carrito").innerHTML;
            listarProductosCarrito();
        }
    }
);
customElements.define(
    "form-compra",
    class extends HTMLElement {
        connectedCallback() {
            this.innerHTML = document.getElementById("form-compra").innerHTML;
        }
    }
);



