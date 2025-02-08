addEventListener("DOMContentLoaded", (event) => {

    addInputBlock();

    const inputField = document.querySelector(".in-block");
    const checkbox = document.getElementById("concent");
    updateButtonState();
    inputField.addEventListener("input", updateButtonState);
    checkbox.addEventListener("change", updateButtonState);

    let conditionBtn = document.getElementById('notice-modal');
    conditionBtn.addEventListener("click", () => {
        openModalCondition();
    })

    let openExample = document.getElementById('example');
    openExample.addEventListener("click", () => {
        openModalExample();
    })

    let closeExampleButton = document.getElementById('example-close');
    closeExampleButton.addEventListener('click', () => {
        closeExampleModal();
    });

    let closeConsentButton = document.getElementById('consent-close');
    closeConsentButton.addEventListener('click', () => {
        closeConsentModal();
    });
});

function addInputBlock() {
    let addBtn = document.querySelector('.in-block-btn.add');
    let inputWrapper = document.querySelector('.input-all-wrapper');
    let removeSrc = './assets/images/remove.svg';

    addBtn.addEventListener('click', () => {
        let inputLenght = document.querySelectorAll('.in-block');
        if (inputLenght.length <= 2) {
            let newInputWrapper = document.createElement('div');
            newInputWrapper.classList.add('inputs-wrapper');
            newInputWrapper.innerHTML = `
                <div class="input-wrapper">
                    <input class="in-block" type="text" placeholder="กรุณากรอกหมายเลขบริการ / รหัสลูกค้า" oninput="onInputNumber(this)">
                    <button type="button" class="in-block-btn remove">
                        <img class="in-block-icon" src=${removeSrc} alt="icon">
                    </button>
                </div>
            `;
            inputWrapper.appendChild(newInputWrapper);

            let removeBtn = newInputWrapper.querySelector('.in-block-btn.remove');
            removeBtn.addEventListener('click', () => {
                newInputWrapper.remove();
                errorType = [];
            });
        }
    });
}

function updateButtonState() {
    const nextPageButton = document.querySelector(".nextpage1");
    const inputField = document.querySelector(".in-block");
    const checkbox = document.getElementById("concent");
    if (inputField.value.trim() === "" || !checkbox.checked) {
        nextPageButton.classList.add("disabled");
        nextPageButton.disabled = true;
    } else {
        nextPageButton.classList.remove("disabled");
        nextPageButton.disabled = false;
    }
}

// this function use for allow number only can type
function onInputNumber(input) {
    let regex = /^\d*$/; // Only digits
    if (!input.value.match(regex)) {
        input.value = input.value.replace(/[^\d]+/g, '');
    }
}

function openModalCondition() {
    $('#modal-consent').modal();
    $('#modal-consent').modal('show');
}

function openModalExample() {
    $('#modal-example').modal();
    $('#modal-example').modal('show');
}

function closeConsentModal() {
    $('#modal-consent').modal();
    $('#modal-consent').modal('hide');
}

function closeExampleModal() {
    $('#modal-example').modal();
    $('#modal-example').modal('hide');
}

// ======================================================= validation part =======================================================

// mock number
let memberNumber = ['123456', '111000', '000000'];
let errorType = [];

// add error text after submit
function addError(text, index) {
    let inputWrappers = document.querySelectorAll('.inputs-wrapper');
    let existingError;
    if (inputWrappers[index].querySelector('.error-text')) {
        existingError = inputWrappers[index].querySelector('.error-text');
    }
    if (existingError) {
        existingError.textContent = text;
    } else {
        let newError = document.createElement('p');
        newError.classList.add('error-text', 'space-top');
        newError.textContent = text;
        inputWrappers[index].appendChild(newError);
    }
    errorType[index] = 1;
}

function removeError(index) {
    let inputWrappers = document.querySelectorAll('.inputs-wrapper');
    let existingError;
    if (inputWrappers[index].querySelector('.error-text')) {
        existingError = inputWrappers[index].querySelector('.error-text');
    }
    if (existingError) {
        existingError.remove();
        errorType[index] = 0;
    }
}

// submit and go next page
let submitButton = document.querySelector('.nextpage1');
submitButton.addEventListener('click', () => {
    checkMemberNumber();

    if (errorType.length > 0 && errorType.every(num => num === 0)) {
        window.location.href = './special_bill2.html';
    } else {
        console.log(errorType)
    }
})

//  call api member number
function checkMemberNumber() {
    let inputBlocks = document.querySelectorAll(".input-wrapper .in-block");
    inputBlocks.forEach((input, index) => {
        let inputVal = input.value.trim();
        if (memberNumber.includes(inputVal) || inputVal === "") {
            removeError(index);
            errorType[index] = 0;
        } else if (inputVal !== "") {
            addError("กรุณาตรวจสอบหมายเลขใหม่อีกครั้ง", index);
        }
    });
}

