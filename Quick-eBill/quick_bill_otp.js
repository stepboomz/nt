
document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".otp-input");
  const submitBtn = document.getElementById("submitBtn");
  const resendBtn = document.getElementById("resendBtn");
  const timerElement = document.getElementById("timer");
  let timeLeft = 59;

  inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      if (e.target.value.length === 1) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });

  const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      resendBtn.style.display = "inline";
      submitBtn.disabled = true;
    } else {
      timeLeft--;
    }
  };

  let timerInterval = setInterval(updateTimer, 1000);

  submitBtn.addEventListener("click", () => {
    const otp = Array.from(inputs)
      .map((input) => input.value)
      .join("");

    if (otp.length !== 4 || !/^\d+$/.test(otp)) {
      inputs.forEach((input) => {
        input.classList.add("error");
        setTimeout(() => input.classList.remove("error"), 500);
      });
      return;
    }

    if (otp === "1234") {
      alert("การยืนยัน OTP สำเร็จ!");
      inputs.forEach((input) => {
        input.style.borderColor = "#4CAF50";
      });
      submitBtn.disabled = true;
    } else {
      inputs.forEach((input) => {
        input.classList.add("error");
        input.style.borderColor = "#ff4444";
      });
      alert("รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
    }
  });

  resendBtn.addEventListener("click", () => {
    timeLeft = 1;
    timerInterval = setInterval(updateTimer, 1000);
    resendBtn.style.display = "none";
    submitBtn.disabled = false;
    inputs.forEach((input) => {
      input.value = "";
      input.style.borderColor = "#ddd";
      input.classList.remove("error");
    });
    inputs[0].focus();
  });
});
