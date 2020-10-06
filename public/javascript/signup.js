const signupForm = document.querySelector(".signup-form");

async function signupFormHandler() {  
    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    if (username && email && password) {
      const response = await fetch("/signup", {
        method: "post",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        window.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
};

signupForm.onclick = function(event) {
    event.preventDefault();
    const element = event.target;
    if (element.nodeName === 'BUTTON') {
        return signupFormHandler();
    }
};
