const fetchData = (url, title, tracks, bass, treble) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); // Opens a request to the given URL
    
    xhr.onload = () => {
        if (xhr.status === 200) { // Checks if the request was successful
            try {

                // TODO: Convert xhr.responseText into a JavaScript object and store it in responseData
                const json = JSON.parse(xhr.responseText);
                title(json.title);
                tracks(json.tracks);
                bass(json.filters.bass);
                treble(json.filters.treble);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        } else {
            console.error('Failed to load data');
        }
    };
    
    xhr.onerror = () => console.error('XHR request error');
    xhr.send();
};

// TODO: Export fetchData so it can be imported in app.js
export { fetchData };