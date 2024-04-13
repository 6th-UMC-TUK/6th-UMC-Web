const signupBtn = document.querySelector(".signUp_button");
const nameBox = document.querySelector(".name_box");
const emailBox = document.querySelector(".email_box");
const ageBox = document.querySelector(".age_box");
const passwordBox = document.querySelector(".password_box");
const checkPwBox = document.querySelector(".check_pw_box");
const nameInput = document.querySelector(".name_input");
const emailInput = document.querySelector(".email_input");
const ageInput = document.querySelector(".age_input");
const passwordInput = document.querySelector(".password_input");
const checkPwInput = document.querySelector(".check_pw_input");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");

if (nameBox && ageBox && emailBox && checkPwBox && passwordBox) {
}

signupBtn.addEventListener("click", () => {
  let isValidForm = true; //비활성화 여부 탐지

  // 이름 유효성 검사
  if (nameInput.value.trim() && typeof nameInput.value === "string") {
    const nameMsg = document.createElement("span");
    nameMsg.classList.add("name_correct");
    nameMsg.innerText = "멋진 이름이네요!";
    nameBox.appendChild(nameMsg);
  } else {
    const nameErrorMsg = document.createElement("span");
    nameErrorMsg.classList.add("name_error");
    nameErrorMsg.innerText = "올바른 이름 형식이 아닙니다.";
    nameBox.appendChild(nameErrorMsg);
  }
  //email 유효성 검사
  if (
    emailInput.value.trim() &&
    typeof emailInput.value === "string" &&
    emailInput.value.includes("@")
  ) {
    const emailMsg = document.createElement("span");
    emailMsg.classList.add("email_correct");
    emailMsg.innerText = "올바른 이메일 형식입니다!";
    emailBox.appendChild(emailMsg);
  } else {
    const emailErrorMsg = document.createElement("span");
    emailErrorMsg.classList.add("email_error");
    emailErrorMsg.innerText = "올바른 이메일 형식이 아닙니다.";
    emailBox.appendChild(emailErrorMsg);
  }

  //나이 유효성 검사
  const ageValue = ageInput.value.trim();
  const age = Number(ageValue);

  if (!age) {
    const ageErrorMsg = document.createElement("span");
    ageErrorMsg.classList.add("age_error");
    ageErrorMsg.innerText = "나이를 입력해 주세요.";
    ageBox.appendChild(ageErrorMsg);
    isValidForm = false;
  } else if (isNaN(age)) {
    const ageErrorMsg = document.createElement("span");
    ageErrorMsg.classList.add("age_error");
    ageErrorMsg.innerText = "나이는 숫자를 입력해야 합니다.";
    ageBox.appendChild(ageErrorMsg);
    isValidForm = false;
  } else if (age < 0) {
    const ageErrorMsg = document.createElement("span");
    ageErrorMsg.classList.add("age_error");
    ageErrorMsg.innerText = "나이는 음수가 될 수 없습니다.";
    ageBox.appendChild(ageErrorMsg);
    isValidForm = false;
  } else if (ageValue.includes(".")) {
    //여기가 좀 어려웠다.. 정수형으로 가공전에 소수인지 판별해주기
    const ageErrorMsg = document.createElement("span");
    ageErrorMsg.classList.add("age_error");
    ageErrorMsg.innerText = "나이는 소수가 될 수 없습니다.";
    ageBox.appendChild(ageErrorMsg);
    isValidForm = false;
  } else if (age < 19) {
    const ageErrorMsg = document.createElement("span");
    ageErrorMsg.classList.add("age_error");
    ageErrorMsg.innerText = "우리 영화 사이트는 19살 이상만 가입이 가능합니다.";
    ageBox.appendChild(ageErrorMsg);
    isValidForm = false;
  }

  // 나이 유효성 검사 (나이가 유효한 경우)
  if (isValidForm && ageInput.value) {
    const ageMsg = document.createElement("span");
    ageMsg.classList.add("age_correct");
    ageMsg.innerText = "올바른 나이 형식입니다!";
    ageBox.appendChild(ageMsg);
  }

  // 비밀번호 유효성 검사
  const password = passwordInput.value.trim();

  if (!password) {
    const passwordErrorMsg = document.createElement("span");
    passwordErrorMsg.classList.add("password_error");
    passwordErrorMsg.innerText = "비밀번호를 입력해 주세요.";
    passwordBox.appendChild(passwordErrorMsg);
    isValidForm = false;
  } else if (password.length < 4) {
    const passwordErrorMsg = document.createElement("span");
    passwordErrorMsg.classList.add("password_error");
    passwordErrorMsg.innerText = "비밀번호는 최소 4자리 이상이어야 합니다.";
    passwordBox.appendChild(passwordErrorMsg);
    isValidForm = false;
  } else if (password.length > 12) {
    const passwordErrorMsg = document.createElement("span");
    passwordErrorMsg.classList.add("password_error");
    passwordErrorMsg.innerText = "비밀번호는 최대 12자리까지 가능합니다.";
    passwordBox.appendChild(passwordErrorMsg);
    isValidForm = false;
  } else if (!password.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/)) {
    const passwordErrorMsg = document.createElement("span");
    passwordErrorMsg.classList.add("password_error");
    passwordErrorMsg.innerText =
      "영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해야 합니다.";
    passwordBox.appendChild(passwordErrorMsg);
    isValidForm = false;
  } else {
    const passwordSuccessMsg = document.createElement("span");
    passwordSuccessMsg.classList.add("password_correct");
    passwordSuccessMsg.innerText = "유효한 비밀번호 형식입니다!";
    passwordBox.appendChild(passwordSuccessMsg);
  }

  //비밀번호 확인 유효성 검사

  const confirmPassword = checkPwInput.value.trim();

  if (!confirmPassword) {
    const confirmPwErrorMsg = document.createElement("span");
    confirmPwErrorMsg.classList.add("checkPw_error");
    confirmPwErrorMsg.innerText = "비밀번호 확인을 입력해 주세요.";
    checkPwBox.appendChild(confirmPwErrorMsg);
    isValidForm = false;
  } else if (password !== confirmPassword) {
    const confirmPwErrorMsg = document.createElement("span");
    confirmPwErrorMsg.classList.add("checkPw_error");
    confirmPwErrorMsg.innerText = "비밀번호가 일치하지 않습니다.";
    checkPwBox.appendChild(confirmPwErrorMsg);
    isValidForm = false;
  } else {
    const confirmPwSuccessMsg = document.createElement("span");
    confirmPwSuccessMsg.classList.add("checkPw_correct");
    confirmPwSuccessMsg.innerText = "비밀번호가 일치합니다.";
    checkPwBox.appendChild(confirmPwSuccessMsg);
  }

  if (isValidForm) {
    modal.style.display = "block";
  }
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
