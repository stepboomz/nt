addEventListener("DOMContentLoaded", (event) => {
    removeStorage()
    renderList();
    clearAllCheckBox();
    cancelBtnAddListener();
});

// ====================== mock data =========================

let data = [
    {
        companyName: 'บ. นิวเทรนด์ ดีเวล๊อปเมนท์ จำกัด',
        telNumber: '0952222322',
        customerCode: '123456521789',
        customerType: 'mobile',
        bill: [
            {
                invoiceNumber: '9130603446410',
                billingCycle: '12/12/2567',
                paymentDueDate: '12/01/2568',
                cost: '317.50',
            },
            {
                invoiceNumber: '2122230321251',
                billingCycle: '12/11/2567',
                paymentDueDate: '12/12/2567',
                cost: '412.25',
            }
        ]
    },
    {
        companyName: 'บ. นิวเทรนด์ ดีเวล๊อปเมนท์ จำกัด',
        telNumber: '0952222363',
        customerCode: '245456521789',
        customerType: 'mobile',
        bill: [
            {
                invoiceNumber: '313326231545',
                billingCycle: '04/12/2567',
                paymentDueDate: '04/01/2568',
                cost: '447.50',
            },
            {
                invoiceNumber: '326339524654',
                billingCycle: '04/11/2567',
                paymentDueDate: '04/12/2567',
                cost: '378.25',
            }
        ]
    },
    {
        companyName: 'บ. นิวเทรนด์ ดีเวล๊อปเมนท์ จำกัด',
        telNumber: '0952222369',
        customerCode: '245456521789',
        customerType: 'mobile',
        bill: [
            {
                invoiceNumber: '414404',
                billingCycle: '07/12/2567',
                paymentDueDate: '07/01/2568',
                cost: '459.50',
            },
        ]
    },
]

// ==========================================================

let filterData = [
    // filterData example
    // [
    //     {
    //         "company": "Domino family จำกัด",
    //         "telNumber": "095-222-2322",
    //         "customerCode": "123456521789",
    //         "customerType": "mobile",
    //         "bill": {
    //             "invoiceNumber": "212224",
    //             "billingCycle": "12/12/2567",
    //             "paymentDueDate": "12/01/2568",
    //             "cost": "317.50"
    //         }
    //     }
    // ]
]; 

function renderList() {
    let containerWrapper = document.getElementById('lists-order-wrapper');
    containerWrapper.innerHTML = ""; 

    data.forEach((items, index) => {
        let collapseId = `collapseList${index + 1}`; 

        let element = `<div class="lists-order space-top1">
                        <div type="button" class="list-order-header-wrapper collapsed" data-bs-toggle="collapse"
                            data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
                            <div class="text-wrapper">
                                <p class="wrapper-big-header-text">${items.companyName}</p>
                            </div>
                            <div class="text-wrapper flex-div-column">
                                <p class="header-normal-text">หมายเลขบริการ</p>
                                <p class="wrapper-big-header-text tel">${formatPhoneNumber(items.telNumber)}</p>
                            </div>
                        </div>
                        <div id="${collapseId}" class="collapse">
                            <div class="list-order-body-wrapper">
                                <div class="list-header-wrapper">
                                    <div class="list-header first">
                                        <div class="text-wrapper">
                                            <p class="wrapper-desc-text bold text-center">#</p>
                                        </div>
                                    </div>
                                    <div class="list-header first">
                                        <div class="text-wrapper">
                                            <p class="wrapper-desc-text bold text-center">ลำดับ</p>
                                        </div>
                                    </div>
                                    <div class="list-header">
                                        <div class="text-wrapper">
                                            <p class="wrapper-desc-text bold text-center">รอบบิล</p>
                                        </div>
                                    </div>
                                    <div class="list-header long">
                                        <div class="text-wrapper">
                                            <p class="wrapper-desc-text bold text-center">เลขที่ใบแจ้งค่าบริการ</p>
                                        </div>
                                    </div>
                                    <div class="list-header medium">
                                        <div class="text-wrapper">
                                            <p class="wrapper-desc-text bold text-center">ประเภทบริการ</p>
                                        </div>
                                    </div>
                                    <div class="list-header long">
                                        <div class="text-wrapper">
                                            <p class="wrapper-desc-text bold text-center">รหัสลูกค้า</p>
                                        </div>
                                    </div>
                                    <div class="list-header">
                                        <div class="text-wrapper">
                                            <p class="wrapper-desc-text bold text-center">กำหนดชำระ</p>
                                        </div>
                                    </div>
                                    <div class="list-header">
                                        <div class="text-wrapper">
                                            <p class="wrapper-desc-text bold text-center">จำนวนเงิน (บาท)</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="lists-body-wrapper" id="body-${collapseId}">
                                </div>
                            </div>
                        </div>
                    </div>`;

        containerWrapper.insertAdjacentHTML("beforeend", element);

        let listBodyWrapper = document.getElementById(`body-${collapseId}`);

        items.bill.forEach((item, billIndex) => {
            let checkboxId = `selectList_${index}_${billIndex}`;

            let list = `<div class="list-body-wrapper">
                            <div class="list-header first">
                                <div class="checkbox-wrapper">
                                    <input type="checkbox" id="${checkboxId}" data-index="${index}" data-bill="${billIndex}" />
                                </div>
                            </div>
                            <div class="list-header first">
                                <div class="text-wrapper">
                                    <p class="wrapper-desc-text text-center">${billIndex + 1}</p>
                                </div>
                            </div>
                            <div class="list-header">
                                <div class="text-wrapper">
                                    <p class="wrapper-desc-text text-center">${item.billingCycle}</p>
                                </div>
                            </div>
                            <div class="list-header long">
                                <div class="text-wrapper">
                                    <p class="wrapper-desc-text text-center">${item.invoiceNumber}</p>
                                </div>
                            </div>
                            <div class="list-header medium">
                                <div class="text-wrapper">
                                    <p class="wrapper-desc-text text-center uppercase">${items.customerType}</p>
                                </div>
                            </div>
                            <div class="list-header long">
                                <div class="text-wrapper">
                                    <p class="wrapper-desc-text text-center">${items.customerCode}</p>
                                </div>
                            </div>
                            <div class="list-header">
                                <div class="text-wrapper">
                                    <p class="wrapper-desc-text text-center">${item.paymentDueDate}</p>
                                </div>
                            </div>
                            <div class="list-header">
                                <div class="text-wrapper">
                                    <p class="wrapper-desc-text text-center">${item.cost}</p>
                                </div>
                            </div>
                        </div>`;

            listBodyWrapper.insertAdjacentHTML("beforeend", list);

            document.getElementById(checkboxId).addEventListener("change", function () {
                updateFilterData(items, item, this.checked);
                updateSubmitBtn(); 
            });
        });
    });
}

function updateFilterData(companyData, billData, isChecked) {
    const existingCompany = filterData.find(item => item.telNumber === companyData.telNumber);

    if (isChecked) {
        if (existingCompany) {
            existingCompany.bill.push(billData);
        } else {
            filterData.push({
                companyName: companyData.companyName,
                telNumber: companyData.telNumber,
                customerCode: companyData.customerCode,
                customerType: companyData.customerType,
                bill: [billData]
            });
        }
    } else {
        if (existingCompany) {
            existingCompany.bill = existingCompany.bill.filter(bill => bill.invoiceNumber !== billData.invoiceNumber);
            if (existingCompany.bill.length === 0) {
                filterData = filterData.filter(item => item.telNumber !== companyData.telNumber);
            }
        }
    }
    console.log("Filtered Data:", filterData);
}

function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
}

function updateSubmitBtn() {
    let nextPageBtn = document.querySelector('.nextpage3-submit');
    let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

    if (checkedBoxes.length > 0) {
        nextPageBtn.classList.remove('disabled');
        nextPageBtn.disabled = false;
        nextPageBtn.addEventListener('click', () => {
            saveStorage();
            window.location.href = './quick_pay3_template2_step2.html';
        })
    } else {
        nextPageBtn.classList.add('disabled');
    }
}

function clearAllCheckBox() {
    let allCheckBox = document.querySelectorAll('.checkbox-wrapper input[type="checkbox');
    allCheckBox.forEach(el => {
        el.checked = false;
    })
}

function cancelBtnAddListener() {
    let cancelBtn = document.querySelector('.nextpage3-cancel');
    cancelBtn.addEventListener('click', () => {
        window.location.href = './quick_pay2.html';
    })
}

// ====================================== localStorage for test next step  ==========================

function saveStorage() {
    localStorage.setItem("data", JSON.stringify(filterData));
}

function removeStorage() {
    localStorage.removeItem("data");
}

// ==================================================================================================

