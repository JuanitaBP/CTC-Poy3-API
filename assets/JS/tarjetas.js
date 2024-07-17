import Request from "./request.js";

export default class Cards {
    getImages(json) {
        const values = Object.values(json);
        const imgArray = [];

        while (imgArray.length <= 11) { //cant de tarjetas para mostrar
            let item = this.newItem(values);
            imgArray.push(item);
        }

        const request = new Request();//nueva classe
        request.getMultipleInfo(imgArray);
    }

    newItem(values) {
        const item = values[Math.floor(Math.random() * values.length)]; //obtener elemntos aleatorios de las pelis
        return item;
    }

    async getMoviesExample() {
        const response = await fetch("/exampleDB.json"); //cambiar si es necesario
        const json = await response.json();

        this.getImages(json);
    }
}