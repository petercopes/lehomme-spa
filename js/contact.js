"use strict";

function initContact () {
    let nombre = document.querySelector(".typeName"); /*selecciona input nombre*/
    let surname = document.querySelector(".typeSurname"); /*selecciona input apellido*/
    let mail = document.querySelector(".typeMail"); /*selecciona input mail*/
    let phone = document.querySelector(".typeNumber"); /*selecciona input numero*/
    let motive = document.querySelector("textarea"); /*selecciona textarea donde se escribe el motivo de la consulta*/
    let notice = document.getElementById("notice"); /*selecciona la seccion del html en la que se muestra un aviso en caso de completar incorrectamente*/
    let btnSendForm = document.getElementById("sendForm"); /*selecciona button para enviar el formulario*/
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; /*el patron que debe cumplir el mail para ser valido*/
    let validMail = document.getElementById("validEmail"); /*selecciona la seccion del html donde se muestra si el mail ingresado es valido*/
    let validPhone = document.getElementById("validPhone"); /*selecciona la seccion del html donde se muestra si el telefono ingresado es valido*/
    let validName = document.getElementById("validName"); /*selecciona la seccion del html donde se muestra si el nombre ingresado es valido*/
    let validSurname = document.getElementById("validSurname"); /*selecciona la seccion del html donde se muestra si el apellido ingresado es valido*/
    let validTextarea = document.getElementById("validTextarea"); /*selecciona la seccion del html donde se muestra si el motivo ingresado es valido*/
    let captchaInput = document.getElementById("userText"); /*selecciona el texto que ingreso el usuario en el captcha*/
    let btnCaptcha = document.getElementById("captcha"); /*selecciona button para comprobar captcha*/
    let resultCaptcha = document.getElementById("resultCaptcha"); /*selecciona la parte del html en la que se vera el resultado del captcha*/
    let btnReloadCaptcha = document.getElementById("reload"); /*selecciona button para actualizar captcha*/
    let number = document.getElementById("number");
    let messageValidForm = document.querySelector(".messageValidForm");


    function reloadNumber() { /*actualiza numero captcha*/
        let nuevo = Math.floor(Math.random() * (10000 - 1)) + 1;
        number.innerText = nuevo;
    }

    function validateCaptcha() { /*comproba captcha*/
        if (captchaInput.value == number.innerText) {
            resultCaptcha.classList.remove("invalid");
            resultCaptcha.classList.add("valid");
            resultCaptcha.innerText = "CORRECTO";
        } else {
            captchaInput.value = "";
            resultCaptcha.classList.remove("valid");
            resultCaptcha.classList.add("invalid");
            resultCaptcha.innerText = "INCORRECTO";
            reloadNumber();
        }
    }

    function reloadCaptcha() { /*actualiza captcha*/
        captchaInput.value = "";
        resultCaptcha.innerText = "";
        reloadNumber();
    }

    const inputs = [motive, nombre, surname, phone, mail];
    const inputsValidation = [validTextarea, validName, validSurname, validPhone, validMail];
    let inputErrors;

    function verifyAllInputs() { /*revisa que el formulario este realizado correctamente*/
        inputErrors = false;

        inputs.forEach((input, index) => {
            if ((input.type !== 'email' && input.type !== phone.type && input.value.length >= 1) || (input.type === 'email' && pattern.test(input.value)) || (input.type === phone.type && 6 < input.value.length && input.value.length <= 10)) {
                input.classList.remove("invalidInput");
                inputsValidation[index].classList.remove("invalid");
                inputsValidation[index].classList.add("valid");
                inputsValidation[index].innerText = "✓";
            } else {
                input.classList.add("invalidInput");
                inputsValidation[index].classList.remove("valid");
                inputsValidation[index].classList.add("invalid");
                inputsValidation[index].innerText = "X";
                inputErrors = true;
            }
        })
    }

    function validateForm() { /*verifica el formulario y si esta todo correcto lo envia, sino muestra avisos de lo que falta realizar correctamente*/
        verifyAllInputs();
        if (resultCaptcha.innerText == "CORRECTO") {
            if (!inputErrors) {
                notice.innerText = "";
                showMessage();
            } else {
                notice.classList.add("invalid");
                notice.innerText = "Falta completar los campos obligatorios.";

            }
        } else {
            if (!inputErrors) {
                notice.classList.add("invalid");
                notice.innerText = "Falta realizar correctamente el captcha.";

            } else {
                notice.classList.add("invalid");
                notice.innerText = "Falta realizar correctamente el captcha y completar los campos obligatorios.";

            }
        }
        reloadCaptcha();
    }

    function showMessage() {
        messageValidForm.classList.add("messageValidFormActivated");
        setTimeout(() => {
            messageValidForm.classList.remove("messageValidFormActivated");
        }, 3000);
    }

    btnReloadCaptcha.addEventListener("click", (e) => {
        e.preventDefault();
    }); /*funciones al clickear button para actualizar captcha*/
    btnReloadCaptcha.addEventListener("click", reloadNumber);
    btnCaptcha.addEventListener("click", (e) => {
        e.preventDefault();
    }); /*funciones al clickear button para comprobar captcha*/
    btnCaptcha.addEventListener("click", validateCaptcha);
    btnSendForm.addEventListener("click", (e) => {
        e.preventDefault();
        validateForm();
    }); /*se realiza la funcion de revisar y enviar la informacion al clickear enviar*/
}

initContact();