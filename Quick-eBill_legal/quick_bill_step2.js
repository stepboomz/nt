let object = new Array(4).fill({});  // Initialize array with 4 empty objects
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
    // upload file section
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
            console.log(file);
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
                        fileIcon = pdfFailureImgSrc;
                        fileName = "Unsupported file type";
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

                if (file.type === "image/png") {
                    fileIcon = pngSuccessImgSrc;
                } else if (file.type === "image/jpeg" || file.type === "image/jpg") {
                    fileIcon = jpgSuccessImgSrc;
                } else if (file.type === "application/pdf") {
                    fileIcon = pdfSuccessImgSrc;
                }

                uploadResult.classList.add('active');
                uploadResult.innerHTML = `
                    <div class="file-wrapper">
                        <div class="file-image-wrapper">
                            <img src="${fileIcon}" alt="File">
                        </div>
                        <div class="file-text-wrapper uploading">
                            <p class="desc-text">${file.name}</p>
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

                // Simulate file upload with progress bar
                simulateUploadProgress(uploadResult.querySelector(".progress-bar"), uploadResult);

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
        });
    });
    // ==================

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


    submitButton.addEventListener('click', function (e) {
        if (!termsCheckbox.checked) {
            e.preventDefault();
            alert('กรุณายอมรับข้อตกลงและเงื่อนไขก่อนดำเนินการต่อ');
            return false;
        }
        window.location.href = 'quick_bill_step3.html';
    });
});

// Function to simulate file upload progress
function simulateUploadProgress(progressBar, uploadResult) {
    let progress = 0;
    const interval = setInterval(() => {
        if (progress < 100) {
            progress += 5;
            progressBar.style.width = progress + "%";
        } else {
            clearInterval(interval);

            // After upload completes, show file size
            uploadResult.querySelector('.upload-progress').style.display = 'none';
            uploadResult.querySelector(".file-size").style.display = "block";
        }
    }, 200); // Adjust the speed of the progress bar (200ms per step)
}

// Function to delete the file
function deleteFile(index, input, uploadWrapper, uploadResult) {
    object[index] = {};
    uploadWrapper.style.display = "flex";
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

