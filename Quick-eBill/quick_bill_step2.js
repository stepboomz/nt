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