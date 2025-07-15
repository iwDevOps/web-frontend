// web-frontend/app.js

document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchButton');
    const dataContainer = document.getElementById('dataContainer');
    const apiResponseDiv = document.getElementById('apiResponse');
    const errorBox = document.getElementById('errorBox');
    const errorMessage = document.getElementById('errorMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');

    const apiUrl = 'http://localhost:3000/api/data';

    fetchButton.addEventListener('click', async () => {
        // Reset UI
        errorBox.classList.add('hidden');
        apiResponseDiv.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');
        fetchButton.disabled = true;
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Network response was not ok (Status: ${response.status})`);
            }
            const data = await response.json();

            // Display data
            dataContainer.textContent = JSON.stringify(data, null, 2);
            apiResponseDiv.classList.remove('hidden');

        } catch (error) {
            // Display error
            errorMessage.textContent = `Could not fetch data from the API. Is it running? Details: ${error.message}`;
            errorBox.classList.remove('hidden');
            console.error("Fetch error:", error);
        } finally {
            // Re-enable button and hide spinner
            loadingSpinner.classList.add('hidden');
            fetchButton.disabled = false;
        }
    });
});
