const quotes = [
    "The greatness of a community is most accurately measured by the compassionate actions of its members. – Coretta Scott King",
    "We cannot live only for ourselves. A thousand fibers connect us with our fellow men. – Herman Melville",
    "Alone, we can do so little; together, we can do so much. – Helen Keller",
    "The best way to find yourself is to lose yourself in the service of others. – Mahatma Gandhi",
    "Act as if what you do makes a difference. It does. – William James"
];

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

    if (response.ok) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('quote').textContent = randomQuote;
        form.style.display = 'none';
        confirmationDiv.style.display = 'block';
    } else {
        const result = await response.json();
        alert(result.message);
    }
});
