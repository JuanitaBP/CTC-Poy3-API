export default class Carousel {
    constructor() {
        //obtenemos la información 
        this.carouselCont = document.querySelectorAll(".carousel-info");
        this.template = document.querySelector(".carousel-template").content; //su contenido
        this.fragment = new DocumentFragment();
    }

    
    //Metodo para mostrar info en el carusel 
    showCarouselInfo() {
        this.carouselCont.forEach((img) => { //forEach para recorrer los contenedores 
            this.clone = this.template.cloneNode(true);
            this.fragment.appendChild(this.clone);
            img.appendChild(this.fragment);
        });
    }
}
