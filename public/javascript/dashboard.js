const thoughtForm = document.querySelector(".new-thought-form");
const deleteBtn = document.querySelector("#delete-button");

async function submitThoughtForm(event) {
    try {
        event.preventDefault();
        const thoughtText = document.querySelector("#thought-text").value.trim();
        const response = await fetch('/dashboard', {
            method: 'POST',
            body: JSON.stringify({
                thoughtText
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // If NEW POST successful
        if(response.ok) {
            // Redirect to dashboard
            document.location.replace('/dashboard');
        } else {
            // Alert user of the response
            alert(response.statusText);
        }
    } catch(err) {
        console.log(err);
    }
}

async function deleteExistingUser (event) {
    try {
        event.preventDefault();
        const response = await fetch('/dashboard', {
            method: 'delete'
        })

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            // Alert user of the response
            alert(response.statusText);
        }
    } catch (error) {
        console.log(error);
    }
}

thoughtForm.onclick = function(event) {
    event.preventDefault();
    const element = event.target;
    if (element.nodeName === 'BUTTON') {
        return submitThoughtForm(event);
    }
}

deleteBtn.addEventListener("click", deleteExistingUser)