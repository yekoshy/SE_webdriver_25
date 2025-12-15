async function fetchData(link) {
        try {
            // 1. Make the request
            const response = await fetch(link, { method: 'GET' });
            console.log(response);
            return response.ok;
            
            


        } catch (error) {
            // Handle network errors or non-200 HTTP status codes
            //console.error('There was a problem with the fetch operation:', error);
            return false;
        }
    }

    let flag =  fetchData('https://picsum.photos/200')
    console.log(flag)