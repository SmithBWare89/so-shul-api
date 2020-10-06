const logoutBtn = document.querySelector("#logout");

async function logout() {
    const response = await fetch('/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/homepage');
    } else {
        alert(response.statusText);
    }
};

logoutBtn.addEventListener("click", logout);