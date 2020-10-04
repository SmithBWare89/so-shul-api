const loginFormHandler = async function () {
  try {
    const usernameEl = document.querySelector("#username-input-login").value.trim();
    const passwordEl = document.querySelector("#password-input-login").value.trim();
    if (usernameEl && passwordEl) {
      const response = await fetch("/api/user/login", {
        method: "post",
        body: JSON.stringify({
          username: usernameEl,
          password: passwordEl,
        }),
        headers: { "Content-Type": "application/json" },
      })
      if (response.ok) {
        return window.location = "/dashboard";
      } else {
        alert(response.statusText);
        return;
      }
    }
  } catch(err) {
    console.log(err);
  }
  };
  
const loginForm = document.querySelector(".login-form");

loginForm.onclick = function(event) {
    event.preventDefault();
    const element = event.target;
    if (element.nodeName === 'BUTTON') {
        return loginFormHandler();
    }
}
    
