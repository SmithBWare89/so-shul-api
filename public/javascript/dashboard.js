const thoughtForm = document.querySelector(".new-thought-form");
const deleteUserBtn = document.querySelector("#delete-button");
const deleteThoughtButton = document.querySelector("#delete-thought");

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

async function deleteThought(event) {
    try {
        event.preventDefault();
        const thoughtId = event.target.closest("li").getAttribute("data-thought_id");
        const response = await fetch('/dashboard', {
            method: "delete",
            body: JSON.stringify({
                thoughtId
            }),
            headers: { "Content-Type": "application/json" }
        });

        if(response.ok) {
            location.reload();
        } else {
            alert(response.statusText);
            return;
        }
    } catch (error) {
        console.log(error);
    }
}

document.onclick = function(event) {
    event.preventDefault();
    const element = event.target;
    if (element.getAttribute("id") === "create-button") {
        return submitThoughtForm(event);
    } else if (element.getAttribute("id") === "delete-thought") {
        return deleteThought(event);
    }
}