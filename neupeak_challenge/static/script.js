

document.addEventListener('DOMContentLoaded', function () {
    const statusBtn = document.getElementById('statusBtn');
    const infoBtn = document.getElementById('infoBtn');
    const haltBtn = document.getElementById('haltBtn');
    const responseDiv = document.getElementById('response');

    statusBtn.addEventListener('click', () => sendRequest('/status'));
    infoBtn.addEventListener('click', () => sendRequest('/info'));
    haltBtn.addEventListener('click', () => sendRequest('/halt'));

    function sendRequest(endpoint) {
        fetch(`/api${endpoint}`, { method: 'POST' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                responseDiv.textContent = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                console.error('Error:', error);
                responseDiv.textContent = 'Error occurred. Check the console for details.';
            });
    }
});
