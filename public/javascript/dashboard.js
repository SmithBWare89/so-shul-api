const thoughtForm = document.querySelector(".new-thought-form");

async function submitThoughtForm(event) {
    try {
        event.preventDefault();
        const thoughtText = document.querySelector("#thought-text").value.trim();
        const response = await fetch('/api/thoughts', {
            method: 'POST',
            body: JSON.stringify({
                thoughtText
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response.ok
            ? document.location.replace('/dashboard')
            : alert(response.statusText);
    } catch(err) {
        console.log(err);
    }
}

thoughtForm.onclick = function(event) {
    event.preventDefault();
    const element = event.target;
    if (element.nodeName === 'BUTTON') {
        return submitThoughtForm(event);
    }
}