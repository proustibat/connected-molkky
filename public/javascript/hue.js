document.addEventListener("DOMContentLoaded", () => {
    const discoverConnect = document.querySelector('[data-action="discover"]');

    discoverConnect.addEventListener('click', async () => {
        discoverConnect.classList.add('disabled');
        await fetch('/api/hue/discover', {method: 'GET'})
            .then((response) => {
                if(response.ok) {
                    return response.json();
                }
                else {
                    throw(`Error: ${status}`);
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.error(err);
            });
        discoverConnect.classList.remove('disabled');
    });
});