addEventListener("DOMContentLoaded", (event) => {

    if (window.innerWidth < 991 || window.screen.width < 991) {
        toggleDropdown()
    } else {
        toggleBtn();
    }
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

    let closeConsentButton = document.getElementById('consent-close');
    closeConsentButton.addEventListener('click', () => {
        closeConsentModal();
    });

    let arrow = document.querySelector('.dropdown-chosen .arrow-down');
    let checkDropdown = document.getElementById('touch');

    checkDropdown.addEventListener('change', function () {
        if (this.checked) {
            arrow.classList.add('active');
        } else {
            arrow.classList.remove('active');
        }
    });
});

function toggleBtn() {
    let toggleBtns = document.querySelectorAll('.toggle-btn');
    let swapText = document.querySelectorAll('.text-swap');
    const inputField = document.querySelectorAll(".in-block");

    toggleBtns.forEach((button, index) => {
        button.addEventListener('click', () => {
            toggleBtns.forEach(btn => btn.classList.remove('active'));
            swapText.forEach(txt => txt.classList.remove('show'));
            inputField.forEach(el => el.value = '');
            button.classList.add('active');
            swapText[index].classList.add('show');

            const checkbox = document.getElementById("concent");
            updateButtonState();
            checkbox.addEventListener("change", updateButtonState);
            setPlaceholder();
        });
    });
}

function setPlaceholder() {
    let textSwap = document.querySelector('.text-swap.show');
    let inputs = document.querySelectorAll('.in-block');
    let placeholder;
    inputs.forEach(input => {
        if (textSwap && textSwap.textContent.trim() === 'หมายเลขบริการ') {
            placeholder = 'กรุณากรอกหมายเลขบริการ';
        } else {
            placeholder = 'กรุณากรอกรหัสลูกค้า';
        }
        input.placeholder = placeholder;
    });
}

function toggleDropdown() {
    let arrow = document.querySelector('.dropdown-chosen .arrow-down');
    document.querySelectorAll('.dropdown-chosen-list-wrapper').forEach((button, index) => {
        button.addEventListener('click', function () {
            const text = this.querySelector('.dropdown-chosen .wrapper-desc-text').innerHTML;
            document.querySelector('.dropdown-chosen label').innerHTML = text;
            document.getElementById('touch').checked = false;
            let swapText = document.querySelectorAll('.text-swap');
            swapText.forEach(txt => txt.classList.remove('show'));
            swapText[index].classList.add('show');
            arrow.classList.remove('active');
            setPlaceholder();
        });
    });
}

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
                    <input class="in-block" type="text" placeholder="" oninput="onInputNumber(this)">
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
            setPlaceholder();
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

function closeConsentModal() {
    $('#modal-consent').modal();
    $('#modal-consent').modal('hide');
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
let swapText = document.querySelector('.text-swap.show').textContent;
submitButton.addEventListener('click', () => {
    if (swapText === 'หมายเลขบริการ') {
        checkServiceNumber();
    } else {
        checkNumbers();
    }
    if (errorType.length > 0 && errorType.every(num => num === 0)) {
        window.location.href = './quick_pay2.html';
    }
})


//  call api member number
function checkNumbers() {
    let inputBlocks = document.querySelectorAll(".input-wrapper .in-block");
    inputBlocks.forEach((input, index) => {
        let inputVal = input.value.trim();
        if (memberNumber.includes(inputVal)) {
            removeError(index);
            errorType[index] = 0;
        } else if (inputVal !== "") {
            addError("กรุณาตรวจสอบหมายเลขใหม่อีกครั้ง", index);
        }
    });
}

//  call api service number
function checkServiceNumber() {
    let inputBlocks = document.querySelectorAll(".input-wrapper .in-block");
    inputBlocks.forEach((input, index) => {
        let inputVal = input.value.trim();
        if (memberNumber.includes(inputVal)) {
            removeError(index);
            errorType[index] = 0;
        } else if (inputVal !== "") {
            addError("กรุณาตรวจสอบหมายเลขใหม่อีกครั้ง", index);
        }
    });
}
