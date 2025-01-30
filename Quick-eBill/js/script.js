//    <script>
//       function toggleCollapsible(element) {
//         const content = element.nextElementSibling;
//         const icon = element.querySelector(".toggle-icon");
//         content.classList.toggle("collapsed");
//         icon.classList.toggle("collapsed");
//       }

//       document.addEventListener("DOMContentLoaded", function () {
//         const content = document.querySelector(".collapsible-content");
//         const icon = document.querySelector(".toggle-icon");
//         if (content) content.classList.remove("collapsed");
//         if (icon) icon.classList.remove("collapsed");
//       });

//       ///check service
//       function validateServiceNumber(input) {
//         input.value = input.value.replace(/[^0-9]/g, "");

//         const value = input.value.trim();
//         const errorElement = document.getElementById("serviceNumberError");

//         if (!value) {
//           input.classList.add("error");
//           errorElement.style.display = "block";
//         } else {
//           input.classList.remove("error");
//           errorElement.style.display = "none";
//         }

//         checkFormValidity();
//       }

//       ///check idnumber passport
//       function validateIdNumber(input) {
//         input.value = input.value.replace(/[^A-Za-z0-9]/g, "");

//         const value = input.value.trim();
//         const errorElement = document.getElementById("idNumberError");

//         const isValid = value.length >= 7 && value.length <= 13;

//         if (!isValid) {
//           input.classList.add("error");
//           errorElement.style.display = "block";
//         } else {
//           input.classList.remove("error");
//           errorElement.style.display = "none";
//         }

//         checkFormValidity();
//       }

//       //check form  if disable button
//       function checkFormValidity() {
//         const serviceNumber = document
//           .getElementById("serviceNumber")
//           .value.trim();
//         const idNumber = document.getElementById("idNumber").value.trim();
//         const submitBtn = document.getElementById("submitBtn");

//         const isValid =
//           serviceNumber &&
//           idNumber &&
//           idNumber.length >= 7 &&
//           idNumber.length <= 13;

//         submitBtn.disabled = !isValid;
//       }

//       // validateform button go to page 2
//       function validateForm(event) {
//         event.preventDefault();

//         const serviceNumber = document
//           .getElementById("serviceNumber")
//           .value.trim();
//         const idNumber = document.getElementById("idNumber").value.trim();

//         if (!serviceNumber) {
//           validateServiceNumber(document.getElementById("serviceNumber"));
//           return false;
//         }

//         if (!idNumber || idNumber.length < 7 || idNumber.length > 13) {
//           validateIdNumber(document.getElementById("idNumber"));
//           return false;
//         }

//         // alert("go to page2");
//         window.location.href = "NTQuicke-Bill.html"; // เปลี่ยนหน้าเมื่อเงื่อนไขผ่าน
//         return true;
//       }

//       document.addEventListener("DOMContentLoaded", function () {
//         const form = document.getElementById("ebillForm");
//         const inputs = form.querySelectorAll("input");

//         inputs.forEach((input) => {
//           if (input.id === "serviceNumber") {
//             validateServiceNumber(input);
//           } else if (input.id === "idNumber") {
//             validateIdNumber(input);
//           }
//         });
//       });

//       function showExample() {
//         document.getElementById("exampleModal").style.display = "block";
//       }

//       function closeExample() {
//         document.getElementById("exampleModal").style.display = "none";
//       }

//       // Close modal when clicking outside
//       window.onclick = function (event) {
//         const modal = document.getElementById("exampleModal");
//         if (event.target == modal) {
//           modal.style.display = "none";
//         }
//       };
//     </script>
    