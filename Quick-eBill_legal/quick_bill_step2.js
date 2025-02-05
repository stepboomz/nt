let object = new Array(4).fill({});  // Initialize array with 4 empty objects to collect files upload
const MAX_FILE_SIZE = 20 * 1024 * 1024;


let pngSuccessImgSrc = './assets/images/png_success.svg';
let jpgSuccessImgSrc = './assets/images/jpg_success.svg';
let pdfSuccessImgSrc = './assets/images/pdf_success.svg';

let pngFailureImgSrc = './assets/images/png_fail.svg';
let jpgFailureImgSrc = './assets/images/jpg_fail.svg';
let pdfFailureImgSrc = './assets/images/pdf_fail.svg';

let binIconSrc = './assets/images/bin.svg';
let closeIconSrc = './assets/images/close-icon.svg';
let alertIconSrc = './assets/images/alert_failure.svg';

//  mock data
let data = [
    {
        serviceNumber: '7478J5882',
        customerCode: '7478J5882',
        accountName: 'นายจอห์น สมิธ',
        customerType: 'ลูกค้าบุคคลทั่วไป (บ้านพักอาศัย)',
        invoiceType: 'Paper Bill',
        billingAddress: '84 หมู่10 ต.บึง อ.ศรีราชา จ.ชลบุรี 20230',
        email: 'johnsmith@gmail.com',
        contact: '0899999999'
    }
]

document.addEventListener("DOMContentLoaded", () => {

    generateCard();
    // upload file section ========================================
    document.querySelectorAll(".custom-file-upload").forEach(button => {
        button.addEventListener("click", function () {
            const inputId = this.getAttribute("for");
            const fileInput = document.getElementById(inputId);
            if (fileInput) {
                fileInput.click();
            }
        });
    });

    document.querySelectorAll("input[type='file']").forEach((input, index) => {
        input.addEventListener("change", function () {
            const file = this.files[0];
            if (file) {
                // Check file size
                if (file.size > MAX_FILE_SIZE) {

                    let failureIcon = pdfFailureImgSrc;
                    if (file.type === "image/png") {
                        failureIcon = pngFailureImgSrc;
                    } else if (file.type === "image/jpeg" || file.type === "image/jpg") {
                        failureIcon = jpgFailureImgSrc;
                    } else if (file.type === "application/pdf") {
                        failureIcon = pdfFailureImgSrc;
                    } else {
                        failureIcon = pdfFailureImgSrc;
                        // fileName = pdfFailureImgSrc;
                    }
                    const uploadWrapper = this.closest(".upload-wrapper");
                    const uploadResult = uploadWrapper.nextElementSibling;
                    uploadWrapper.style.display = "none";
                    uploadResult.classList.add('active');

                    uploadResult.innerHTML = `
                            <div class="file-wrapper">
                                <div class="file-image-wrapper">
                                    <img src="${failureIcon}" alt="File">
                                </div>
                                <div class="file-text-wrapper">
                                    <p class="desc-text">${file.name}</p>
                                    <div class="failure">
                                        <img src="${alertIconSrc}" alt="alert">
                                        <p class="desc-text file-size red-text">ขนาดไฟล์ของคุณใหญ่เกินไป</p>
                                    </div>
                                </div>
                            </div>
                            <div class="delete-btn">
                                <img src="${closeIconSrc}" alt="Delete">
                            </div>
                        `;

                    handleErrorsRemove(index);
                    // Handle file input reset after deletion
                    uploadResult.querySelector(".delete-btn").addEventListener("click", function () {
                        deleteFile(index, input, uploadWrapper, uploadResult);
                    });

                    this.value = "";  // Clear the file input value
                    return;
                }

                // Handle file upload success
                const uploadWrapper = this.closest(".upload-wrapper");
                const uploadResult = uploadWrapper.nextElementSibling;
                uploadWrapper.style.display = "none";
                let fileIcon = pdfSuccessImgSrc;
                let fileName = file.name;
                const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

                if (file.type === "image/png") {
                    fileIcon = pngSuccessImgSrc;
                } else if (file.type === "image/jpeg" || file.type === "image/jpg") {
                    fileIcon = jpgSuccessImgSrc;
                } else if (file.type === "application/pdf") {
                    fileIcon = pdfSuccessImgSrc;
                }
                // console.log(allowedTypes.includes(file.type))
                if (allowedTypes.includes(file.type) === false) {
                    uploadResult.classList.add('active');
                    uploadResult.innerHTML = `
                    <div class="file-wrapper">
                        <div class="file-image-wrapper">
                            <img src="${pngFailureImgSrc}" alt="File">
                        </div>
                        <div class="file-text-wrapper">
                            <p class="desc-text">${fileName}</p>
                            <div class="failure">
                                <img src="${alertIconSrc}" alt="alert">
                                <p class="desc-text file-size red-text">รองรับไฟล์ .pdf , .jpg หรือ .png เท่านั้น</p>
                            </div>
                        </div>
                    </div>
                    <div class="delete-btn">
                        <img src="${closeIconSrc}" alt="Delete">
                    </div>
                `;
                    handleErrorsRemove(index);
                    // Handle file input reset after deletion
                    uploadResult.querySelector(".delete-btn").addEventListener("click", function () {
                        deleteFile(index, input, uploadWrapper, uploadResult);
                    });

                    this.value = "";  // Clear the file input value
                    return;
                }
                else {
                    uploadResult.classList.add('active');
                    uploadResult.innerHTML = `
                            <div class="file-wrapper">
                                <div class="file-image-wrapper">
                                    <img src="${fileIcon}" alt="File">
                                </div>
                                <div class="file-text-wrapper uploading">
                                    <p class="desc-text">${fileName}</p>
                                    <div class="upload-progress">
                                        <div class="progress-bar"></div>
                                    </div>
                                    <!-- Hide file size during upload -->
                                    <p class="desc-text file-size" style="display: none;">${(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <div class="delete-btn">
                                <img src="${closeIconSrc}" alt="Delete">
                            </div>
                        `;

                    handleErrorsRemove(index);

                    // Simulate file upload with progress bar
                    simulateUploadProgress(uploadResult.querySelector(".progress-bar"), uploadResult ,uploadResult.querySelector('.delete-btn img'));

                    // Store file data in the object
                    object[index] = {
                        fileName: file.name,
                        fileType: file.type,
                        fileSize: file.size,
                        fileData: file
                    };

                    // Add event listener to delete button
                    uploadResult.querySelector(".delete-btn").addEventListener("click", function () {
                        deleteFile(index, input, uploadWrapper, uploadResult);
                    });
                }
            }
        });
    });
    // ============================================================

    const termsCheckbox = document.querySelectorAll('.checkbox-main .custom-checkbox')[1]; // Get the second checkbox (terms)
    const submitButton = document.querySelector('.btn-submit');

    submitButton.disabled = !termsCheckbox.checked;

    if (submitButton.disabled) {
        submitButton.style.backgroundColor = '#cccccc';
        submitButton.style.cursor = 'not-allowed';
    }

    termsCheckbox.addEventListener('change', function () {
        submitButton.disabled = !this.checked;

        if (this.checked) {
            submitButton.style.backgroundColor = '';
            submitButton.style.cursor = 'pointer';
        } else {
            submitButton.style.backgroundColor = '#cccccc';
            submitButton.style.cursor = 'not-allowed';
        }
    });

    //  validation =================================================
    const form = document.getElementById("form");
    const nameInput = document.getElementById("name");
    const surnameInput = document.getElementById("surname");
    const telNumberInput = document.getElementById("tel-number");
    const submitBtn = document.getElementById("submitBtn");

    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        // Clear previous error messages
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(function (message) {
            message.remove();
        });

        // Perform validation
        let nameIsValid = true;
        let surnameIsValid = true;
        let numberIsValid = true;

        if (nameInput.value.trim() === "") {
            showError(nameInput, "กรุณากรอกชื่อ", 1);
            nameIsValid = false;
        }

        if (surnameInput.value.trim() === "") {
            showError(surnameInput, "กรุณากรอกนามสกุล", 2);
            surnameIsValid = false;
        }

        const telValue = telNumberInput.value.trim();
        if (telValue.length === 10) {
            if (telValue[0] !== '0') {
                showError(telNumberInput, "กรุณากรอกหมายเลขโทรศัพท์โดยเริ่มต้นด้วยเลข 0", 3);
                numberIsValid = false;
            } else {
                numberIsValid = true;
            }
        } else {
            showError(telNumberInput, "กรุณากรอกหมายเลขโทรศัพท์", 3);
            numberIsValid = false;
        }

        // Handle form validation and redirection
        handleFormValidation(nameIsValid, surnameIsValid, numberIsValid, object, 'quick_bill_step3.html');
    });

    // ============================================================
});

// Function to simulate file upload progress
function simulateUploadProgress(progressBar, uploadResult, binImg) {
    let progress = 0;
    const interval = setInterval(() => {
        if (progress < 100) {
            progress += 5;
            progressBar.style.width = progress + "%";
            binImg.src = closeIconSrc;
        } else {
            clearInterval(interval);
            // After upload completes, show file size
            uploadResult.querySelector('.upload-progress').style.display = 'none';
            uploadResult.querySelector(".file-size").style.display = "block";
            binImg.src = binIconSrc;
        }
    }, 200);
}

function deleteFile(index, input, uploadWrapper, uploadResult) {
    object[index] = {};
    uploadWrapper.style.display = "block";
    uploadResult.classList.remove('active');
    input.value = "";
}

function generateCard() {
    let card = document.getElementById('info-card');
    card.innerHTML = `
        <div class="info-row">
            <div class="info-label">หมายเลขบริการ</div>
            <div class="info-value">${data[0].serviceNumber}</div>
        </div>
        <div class="info-row">
            <div class="info-label">รหัสลูกค้า</div>
            <div class="info-value">${data[0].customerCode}</div>
        </div>
        <div class="info-row">
            <div class="info-label">ชื่อบัญชีลูกค้า</div>
            <div class="info-value">${data[0].accountName}</div>
        </div>
        <div class="info-row">
            <div class="info-label">ประเภทลูกค้า</div>
            <div class="info-value">${data[0].customerType}</div>
        </div>
        <div class="info-row">
            <div class="info-label">ประเภทใบแจ้งค่าใช้บริการ</div>
            <div class="info-value">${data[0].invoiceType}</div>
        </div>
        <div class="info-row">
            <div class="info-label">ที่อยู่จัดส่งใบแจ้งค่าบริการ</div>
            <div class="info-value">${data[0].billingAddress}</div>
        </div>
        <div class="info-row">
            <div class="info-label">อีเมล</div>
            <div class="info-value">${data[0].email}</div>
        </div>
        <div class="info-row">
            <div class="info-label">เบอร์ติดต่อ</div>
            <div class="info-value">${formatPhoneNumber(data[0].contact)}</div>
        </div>
    `
}

function formatPhoneNumber(number) {
    // Format the phone number as xxx-xxx-xxxx
    return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}


function showError(input, message, index) {
    const errorMessage = document.createElement("p");
    if (index % 2 === 0) {
        errorMessage.classList.add("error-message", "red-text", "mrl-5");
    } else {
        errorMessage.classList.add("error-message", "red-text");
    }
    // errorMessage.style.fontSize = '1rem';
    errorMessage.textContent = message;
    input.parentElement.appendChild(errorMessage);
}


function validateInputFL(input) {
    let regex = /^[ก-๙a-zA-Z\s-]+$/;
    let regexTN = /^[๐-๙]+$/;
    if (input.value.match(regexTN) || input.value.charAt(0).match(/[๐-๙]/) || input.value.charAt(input.value.length - 1).match(/[๐-๙]/)) {
        input.value = input.value.replace(/[๐-๙]+$/, '');
    } else if (!input.value.match(regex)) {
        input.value = input.value.replace(/[^ก-๙a-zA-Z\s-]+/g, '');
    }

    input.value = input.value.replace(/\s+/g, '');

    if (input.value.startsWith("-")) {
        input.value = input.value.replace(/^[-]+/, '');
    }
    if (input.value.startsWith(" ")) {
        input.value = input.value.replace(/^\s+/, '');
    }
    if (input.value.includes("฿")) {
        input.value = input.value.replace(/฿/g, '');
    }
}

function validatePhoneNumber(input) {
    const telNumberInput = document.getElementById("tel-number");
    telNumberInput.value = telNumberInput.value.replace(/\D/g, "");

    if (telNumberInput.value.length > 10) {
        telNumberInput.value = telNumberInput.value.slice(0, 10);
    }
}

function objectIndexIsEmpty(object) {
    for (let i = 0; i < object.length; i++) {
        if (!object[i].fileData) {
            return true;
        }
    }
    return false;
}


function handleFormValidation(nameIsValid, surnameIsValid, numberIsValid, object, redirectUrl) {
    if (nameIsValid && surnameIsValid && numberIsValid && objectIndexIsEmpty(object) === false) {
        window.location.href = redirectUrl;
    } else {
        handleErrors(object);
    }
}

function handleErrors(object) {
    object.forEach((file, index) => {
        if (!file.fileData) {
            const fileInput = document.querySelectorAll("input[type='file']")[index];
            const uploadWrapper = fileInput.closest(".upload-wrapper");
            let error = document.createElement('p');
            error.classList.add('red-text', 'file-error');
            error.innerHTML = 'กรุณาอัปโหลดไฟล์'
            uploadWrapper.appendChild(error);
        }
    });
}

function handleErrorsRemove(index) {
    const uploadWrapper = document.querySelectorAll(".upload-file");
    const errorMessage = uploadWrapper[index].querySelector('.file-error');
    if (errorMessage) {
        errorMessage.remove();
    }
}