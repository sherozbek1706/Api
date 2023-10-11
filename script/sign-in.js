const $form = document.querySelector("#form"),
  $emailInput = $form.querySelector("#email"),
  $passwordInput = $form.querySelector("#password"),
  $emailMessage = $form.querySelector("[data-message-email]"),
  $passwordMessage = $form.querySelector("[data-message-password]"),
  $mainMessage = $form.querySelector("[data-main-message]"),
  $btn = $form.querySelector("button");

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
const PASSWORD_REGEX = /[a-zA-Z0-9]{8,}/;

$form.addEventListener("submit", createNewUser);

function checkValue(value, regex, element, type) {
  if (!regex.test(value)) {
    element.setAttribute(`data-message-${type}`, "error");
    element.innerText = `${type} is invalid`.toUpperCase();
    element.style.display = "block";
  }
  return regex.test(value);
}

async function createNewUser(e) {
  e.preventDefault();

  const isEmailValid = checkValue(
    $emailInput.value,
    EMAIL_REGEX,
    $emailMessage,
    "email"
  );
  const isPasswordValid = checkValue(
    $passwordInput.value,
    PASSWORD_REGEX,
    $passwordMessage,
    "password"
  );

  if (isEmailValid && isPasswordValid) {
    try {
      $btn.setAttribute("disabled", true)
      const response = await axios.post(
        `http://localhost:3000/api/auth/signin`,
        {
          email: $emailInput.value,
          password: $passwordInput.value,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      console.log(response);
      if(response.status === 200){
        $btn.removeAttribute("disabled");
        localStorage.setItem("token", response.data.token)
        location.replace(location.origin+"/pages/dashboard.html") 
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    $mainMessage.setAttribute("data-main-message", "error");
    $mainMessage.innnerText = "You intered something wrong!";
  }
}
