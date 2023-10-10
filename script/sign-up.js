const $form = document.querySelector("#form"),
  $usernameInput = $form.querySelector("#username"),
  $emailInput = $form.querySelector("#email"),
  $passwordInput = $form.querySelector("#password"),
  $usernameMessage = $form.querySelector("[data-message-username]"),
  $emailMessage = $form.querySelector("[data-message-email]"),
  $passwordMessage = $form.querySelector("[data-message-password]"),
  $mainMessage = $form.querySelector("[data-main-message]");

const USERNAME_REGEX = /^[A-Za-z0-9_-]{3,}$/;
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

  const isUserNameValid = checkValue(
    $usernameInput.value,
    USERNAME_REGEX,
    $usernameMessage,
    "username"
  );
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

  if (isUserNameValid && isEmailValid && isPasswordValid) {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/signup`,
        {
          username: $usernameInput.value,
          email: $emailInput.value,
          password: $passwordInput.value,
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if(response.status === 201){
        location.replace(location.origin+"/pages/sign-in.html")
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    $mainMessage.setAttribute("data-main-message", "error");
    $mainMessage.innnerText = "You intered something wrong!";
  }
}
