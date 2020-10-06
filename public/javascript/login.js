const loginFormHandler = async function () {
  try {
    const emailEl = document.querySelector("#email-login").value.trim();
    console.log(emailEl)
    const passwordEl = document.querySelector("#password-login").value.trim();
    console.log(passwordEl)
    if (emailEl && passwordEl) {
      const response = await fetch("/login", {
        method: "post",
        body: JSON.stringify({
          email: emailEl,
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
    
