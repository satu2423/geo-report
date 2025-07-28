const form = document.getElementById('incident-form');
const confirmationDiv = document.getElementById('confirmation');

const urlParams = new URLSearchParams(window.location.search);
const lat = urlParams.get('lat');
const lng = urlParams.get('lng');

document.getElementById('lat').value = lat;
document.getElementById('lng').value = lng;

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const response = await fetch('/report', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    if (response.ok) {
        form.style.display = 'none';
        confirmationDiv.style.display = 'block';
    } else {
        alert(result.message);
    }
});
