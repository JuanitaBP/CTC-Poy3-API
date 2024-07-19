import Request from "./request.js";

export default class Checker {
    //método que verifica si la info del input es correcta 
    verifyInput() {
        const inputValue = document.querySelector(".my-input");

        if (inputValue.value === "") {
            this.getErrorContainer("Escribe el nombre de una película para buscarlo");
        } else {
            const request = new Request();//nuevo objeto 
            request.getInfo(inputValue.value);

            inputValue.value = "";
        }
    }

    //obtener el error y guardar
    getErrorContainer(errorMsg) {
        const fragment = new DocumentFragment();
        const errorContainer = document.querySelector(".error-container");
        const errorTemplate = document.querySelector(".error-template").content; //almacena el contenido del template del index

        const clone = errorTemplate.cloneNode(true); //clonar el template
        fragment.appendChild(clone);//pasar la información

        errorContainer.appendChild(fragment); //insertamos la info al contenedor

        document.querySelector(".alert-error").innerText = errorMsg;
        this.displayError(errorContainer);
    }

    //metodo para mostrar el error 
    displayError(errorContainer) {
        errorContainer.style.display = "block";

        //que solo se muestre por cierto tiempo 
        setTimeout(() => {
            errorContainer.style.display = "none";

            //eliminar el contenedor con error 
            while (errorContainer.firstChild) {
                errorContainer.firstChild.remove();
            }
        }, 1500); //el tiempo en milisegundos  
    }
}



//     // Método para mostrar el error en el modal
//     showErrorModal(errorMsg) {
//         const modal = new bootstrap.Modal(document.getElementById('errorModal')); // Inicializa el modal de Bootstrap
//         const modalBody = document.querySelector("#errorModal .modal-text");
        
//         modalBody.innerText = errorMsg;
//         modal.show();

//         setTimeout(() => {
//             modal.hide();
//             modalBody.innerText = ""; // Limpia el contenido del modal
//         }, 1500);
//     }
// }