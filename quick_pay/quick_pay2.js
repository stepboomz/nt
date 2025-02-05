let otp = '1234';
let otpRef = 'AFGHN';
let telValue = document.querySelector('.tel-in-block').value;

addEventListener("DOMContentLoaded", (event) => {
    genTelItemsBlock();
    goOTP();
    cancelBtn();

    let inputs = document.querySelectorAll('.block-register');
    let closeModalBtn = document.querySelectorAll('.close-modal-btn');
    closeModalBtn.forEach(closeM => {
        closeM.addEventListener('click', () => {
            closeModal();
        })
    })


    let otpSkipBtn = document.getElementById('otp-skip-register');
    otpSkipBtn.addEventListener('click', () => {
        clearInterval(countdownSeconds);
        countdownSeconds = 59;
        startCountdown();
        removeAlertOTP();
        blockOTPEnabled();
        firstFocus();
        // call api to get new otp code
    })

    inputs.forEach(otpe => {
        otpe.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        })
    })

    inputs.forEach(function (input, index) {
        input.addEventListener('input', function (e) {
            limitInputLength(this);

            if (index < inputs.length - 1 && input.value.length === 1) {
                inputs[index + 1].focus();
            }
            stringData = '';
            inputs.forEach(function (input) {
                stringData += input.value;
                if (inputs[index].classList.contains('alert')) {
                    inputs[index].classList.remove('alert');
                }
            });

            if (index === inputs.length - 1 && input.value.length === 1) {
                if (stringData === otp) {
                    console.log('complete');
                    removeAlertOTP();
                    window.location.href = "./quick_pay3_template1.html";
                    // window.location.href = "./quick_pay3_template2.html";
                } else {
                    console.log('otp incorrect');
                    addAlert('รหัสยืนยันไม่ถูกต้อง', 0);
                }
            }
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Backspace' && input.value === '' && index > 0) {
                inputs[index - 1].focus();
            }
        });
        input.addEventListener('click', function () {
            input.focus();
        });
    });
});

// mock data
// please connect this data variable to data from api
let data = [
    {
        copName: 'ยิ่งรวย จำกัด',
        telNumber: '0869999999'
    },
    {
        copName: 'ยิ่งรวย จำกัด',
        telNumber: '0869999997'
    },
    {
        copName: 'ยิ่งรวย จำกัด',
        telNumber: '0869999998'
    },
];

let OTPalertText = document.querySelector('.otp-alert-text');
let countdownElement = document.getElementById('countdownRegister');
let firstInput = document.querySelector('.block-register');

let countdownStart = false
let countdownSeconds = 10;
let timerInterval;

function cancelBtn() {
    let cancelBtn = document.querySelector('.nextpage2-cancel');
    cancelBtn.addEventListener('click', () => {
        window.location.href = './quick_pay1.html';
    })
}

function formatPhoneNumber(number) {
    // Format the phone number as xxx-xxx-xxxx
    return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

function genTelItemsBlock() {
    let itemsWrapper = document.getElementById('items-wrapper');
    itemsWrapper.innerHTML = ''; 

    // Group data by copName
    let groupedData = {};
    data.forEach(item => {
        if (!groupedData[item.copName]) {
            groupedData[item.copName] = [];
        }
        groupedData[item.copName].push(item.telNumber);
    });

    // Generate HTML
    for (let copName in groupedData) {
        let companyBlock = document.createElement('div');
        companyBlock.classList.add('company-block');

        // Add company name
        let divCompany = document.createElement('div');
        divCompany.classList.add('text-wrapper', 'space-top');
        divCompany.innerHTML = `
            <p class="wrapper-desc-text">${copName}</p>`;
        
        companyBlock.appendChild(divCompany);

        // Add phone numbers
        groupedData[copName].forEach(telNumber => {
            let formattedNumber = formatPhoneNumber(telNumber);
            let div = document.createElement('div');
            div.classList.add('item-bill');
            div.innerHTML = `
                <div class="text-wrapper">
                    <p class="wrapper-desc-text">หมายเลขบริการ</p>
                </div>
                <div class="text-wrapper">
                    <p class="wrapper-big-tel-text">${formattedNumber}</p>
                </div>`;
            companyBlock.appendChild(div);
        });

        // Append to main wrapper
        itemsWrapper.appendChild(companyBlock);
    }
}

function goOTP() {
    let submitBtn = document.querySelector('.nextpage2-submit');
    submitBtn.addEventListener('click', () => {
        checkTelError();
    })

}

function setPhoneNumberRefOTPBlock() {
    let telValue = document.querySelector('.tel-in-block').value.trim();
    let refCode = document.getElementById('ref-code');
    let phoneNumber = document.getElementById('number-phone-register');
    phoneNumber.innerHTML = telValue;
    refCode.innerHTML = otpRef;
}

function checkTelError() {
    let tel = document.querySelector('.tel-in-block').value;
    if (tel[0] !== '0') {
        addError('กรุณากรอกเบอร์โทรศัพท์ที่ขึ้นต้นด้วยเลข 0')
    } else {
        openModalOTP();
    }
}

function checkTel() {
    const tel = document.querySelector('.tel-in-block').value.trim(); // Trim spaces for cleaner input
    const submitBtn = document.querySelector('.nextpage2-submit');

    if (tel.length === 10) {
        submitBtn.classList.remove('disabled');
        submitBtn.disabled = false;
    } else {
        submitBtn.classList.add('disabled');
        submitBtn.disabled = true;
    }
}

function onInputTel(input) {
    let regex = /^\d*$/; // Only digits
    if (!input.value.match(regex)) {
        input.value = input.value.replace(/[^\d]+/g, '');
    }
    // Limit to 10 digits
    if (input.value.length > 10) {
        input.value = input.value.substring(0, 10);
    }
    checkTel();
}

function addError(text) {
    let errorText = document.querySelector('.tel-wrapper .error-text');

    if (!errorText) {
        let inputWrapper = document.querySelector('.tel-wrapper');
        let newError = document.createElement('p');
        newError.classList.add('error-text', 'space-top');
        newError.innerHTML = text;
        inputWrapper.appendChild(newError);
    } else {
        let errorText = document.querySelector('.error-text');
        errorText.innerHTML = text;
    }
}

// register OTP
function openModalOTP() {
    $('#otpModal').modal();
    $('#otpModal').modal('show');
    setPhoneNumberRefOTPBlock();
    blockOTPEnabled();
    startCountdown();
    setTimeout(() => {
        firstFocus();
    }, 500)

}

function closeModal() {
    $('.modal').modal();
    $('.modal').modal('hide');
    removeonlyBlockAlert();
}

function blockOTPDisabled() {
    let inputs = document.querySelectorAll('.block-register');
    inputs.forEach(bloc => {
        bloc.disabled = true;
    })
}

function blockOTPEnabled() {
    let inputs = document.querySelectorAll('.block-register');
    inputs.forEach(bloc => {
        bloc.disabled = false;
    })
}

function removeonlyBlockAlert() {
    let blocks = document.querySelectorAll('.block-register');
    blocks.forEach(function (input) {
        input.classList.remove('alert');
        input.value = '';
    });
}

function startCountdown() {
    countdownStart = true;
    countdownSeconds = 10;
    clearInterval(timerInterval);
    updateCountdown();
    timerInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    toggleOTPskip();
    let seconds = countdownSeconds % 60;
    countdownElement.textContent = seconds.toString().padStart(2, '0');

    if (countdownSeconds <= 0) {
        clearInterval(timerInterval);
        addAlert('รหัส OTP ของท่านหมดอายุแล้วกรุณากดส่งอีกครั้ง', 1);
        // removeonlyBlockAlert();
    } else {
        countdownSeconds--;
    }
}

function toggleOTPskip() {
    let otpSkipWrapper = document.querySelectorAll('.otp-skip-wrapper');
    let otpSkipBtn = document.getElementById('register02progress');
    if (countdownSeconds == 0) {
        otpSkipWrapper.forEach(wrapper => {
            wrapper.style.display = 'flex';
        })
        // otpSkipBtn.disabled = false;
    } else {
        otpSkipWrapper.forEach(wrapper => {
            wrapper.style.display = 'none';
        })
        otpSkipBtn.disabled = true;
    }
}

function limitInputLength(input) {
    if (input.value.length > 1) {
        input.value = input.value.slice(0, 1);
    }
}

function firstFocus() {
    let firstInput = document.querySelector('.block-register');
    if (firstInput) {
        firstInput.focus();
    }
}

function removeData() {
    let blocks = document.querySelectorAll('.block-register');
    blocks.forEach(function (input) {
        input.value = '';
    });
    removeAlertOTP();
    firstFocus();
}

function addAlert(msg, error) {
    // error 0 = otp inccorect
    // error 1 = time out
    let registerAlertText = document.querySelectorAll('.otp-alert-register');
    if (msg == undefined || msg == '') {
        registerAlertText.forEach(alrt => {
            alrt.classList.add('show');
        })

    } else {
        registerAlertText.forEach(alrt => {
            alrt.innerHTML = msg;
            alrt.classList.add('show');
        })
    }

    let blocks = document.querySelectorAll('.block-register');
    blocks.forEach(function (input) {
        input.classList.add('alert');
        input.value = '';
        if (error === 1) {
            blockOTPDisabled();
        }
        // blockOTPDisabled();
    });
    firstInput.focus();
}

function removeAlertOTP() {
    let registerAlertText = document.querySelectorAll('.otp-alert-register');
    registerAlertText.forEach(alrt => {
        alrt.classList.remove('show');
    })

    let blocks = document.querySelectorAll('.block-register');
    blocks.forEach(function (input) {
        input.classList.remove('alert');
        input.disabled = false;
    });
}