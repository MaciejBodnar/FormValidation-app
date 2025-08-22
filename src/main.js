const nameError = document.querySelector("#name-error");
const phoneError = document.querySelector("#phone-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");
const submitError = document.querySelector("#submit-error");
const form = document.querySelector("#contact-form");

const validateName = () => {
  const name = document.querySelector("#contact-name").value;

  if (name.length === 0) {
    nameError.textContent = "Name is required";
    return false;
  }

  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.textContent = "Write full name";
    return false;
  }

  nameError.innerHTML =
    '<span class="material-symbols-outlined"> check </span>';
  return true;
};

const validatePhone = () => {
  const phone = document.querySelector("#contact-phone").value;

  if (phone.length === 0) {
    phoneError.textContent = "Phone is required";
    return false;
  }
  if (phone.length !== 9) {
    phoneError.textContent = "Phone number should be 9 digits";
    return false;
  }

  if (!phone.match(/^[0-9]{9}$/)) {
    phoneError.textContent = "Write only digits";
    return false;
  }

  phoneError.innerHTML =
    '<span class="material-symbols-outlined"> check </span>';
  return true;
};

const validateEmail = () => {
  const email = document.querySelector("#contact-email").value;

  if (email.length === 0) {
    emailError.textContent = "Email is required";
    return false;
  }

  if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailError.textContent = "Email is invalid";
    return false;
  }

  emailError.innerHTML =
    '<span class="material-symbols-outlined"> check </span>';
  return true;
};

const validateMessage = () => {
  const message = document.querySelector("#contact-message").value;

  if (30 - message.length > 0) {
    messageError.textContent =
      30 - message.length + " more characters is required";
    return false;
  }

  messageError.innerHTML =
    '<span class="material-symbols-outlined"> check </span>';
  return true;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (
    !validateName() ||
    !validatePhone() ||
    !validateEmail() ||
    !validateMessage()
  ) {
    submitError.style.display = "block";
    submitError.textContent = "Please fix error to submit";
    setTimeout(() => {
      submitError.style.display = "none";
    }, 3000);
    return false;
  } else {
    console.log(phoneError.value);
    const response = await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log(result);
    alert(result.message);
    return true;
  }
});
