let data;
addEventListener("DOMContentLoaded", (event) => {

    let storedData = localStorage.getItem("data");
    if (storedData) {
        data = JSON.parse(storedData);
        console.log("Retrieved Data:", data);
        renderSetp2List();
    } else {
        console.log("No data found in localStorage");
    }

    cancelBtnAddListener();
});

// ====================== mock data =========================


// let data = [
//     {
//         companyName: 'Domino family จำกัด',
//         telNumber: '0952222322',
//         customerCode: '123456521789',
//         customerType: 'mobile',
//         bill: [
//             {
//                 invoiceNumber: '212223',
//                 billingCycle: '12/11/2567',
//                 paymentDueDate: '12/12/2567',
//                 cost: '412.25',
//             }
//         ]
//     },
//     {
//         companyName: 'Domino family จำกัด',
//         telNumber: '0952222363',
//         customerCode: '245456521789',
//         customerType: 'mobile',
//         bill: [
//             {
//                 invoiceNumber: '313326',
//                 billingCycle: '04/12/2567',
//                 paymentDueDate: '04/01/2568',
//                 cost: '447.50',
//             },
//         ]
//     },
//     {
//         companyName: 'Domino family จำกัด',
//         telNumber: '0952222363',
//         customerCode: '245456521789',
//         customerType: 'mobile',
//         bill: [
//             {
//                 invoiceNumber: '414404',
//                 billingCycle: '07/12/2567',
//                 paymentDueDate: '07/01/2568',
//                 cost: '459.50',
//             },
//         ]
//     },
// ]

// ==========================================================


function renderSetp2List() {
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
                updateSummCost(item, this.checked);
                updateSubmitBtn(); 
            });
        });
    });
}

function updateSubmitBtn() {
    let nextPageBtn = document.querySelector('.nextpage3-submit');
    let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

    if (checkedBoxes.length > 0) {
        nextPageBtn.classList.remove('disabled');
        nextPageBtn.disabled = false;
        nextPageBtn.addEventListener('click', () => {
            saveStorage();
            window.location.href = './../acknowledgpage/acknowlegd_complete.html';
        })
    } else {
        nextPageBtn.classList.add('disabled');
    }
}

function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
}

function cancelBtnAddListener() {
    let cancelBtn = document.querySelector('.nextpage3-cancel');
    cancelBtn.addEventListener('click', () => {
        window.location.href = './quick_pay3_template2.html';
    })
}

let cost = 0;

function updateSummCost(billData, isChecked) {
    let billCost = parseFloat(billData.cost) || 0;

    if (isChecked) {
        cost += billCost;
    } else {
        cost -= billCost;
    }

    cost = Math.max(0, cost);
    cost = parseFloat(cost.toFixed(2));

    updateSumToBlock();
    console.log("Total Cost:", cost);
}

function updateSumToBlock() {
    const sum = document.getElementById('sum-cost');
    if(cost === 0){
        sum.innerHTML = cost;
    } else {
        sum.innerHTML = cost.toFixed(2);
    }
    
}

// =================== get filterData to localStorage for this page ================================

function saveStorage() {
    localStorage.setItem("payment", JSON.stringify(filterData));
}

function getStorage() {
    let storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
}

// ==================================================================================================