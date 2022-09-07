export const useFetch = (method: string) => {

    let load = false;
    let error = null;

    const FetchData = (url: string) => {

        return fetch(url, {
            method: method,
            mode: 'cors',
            redirect: 'follow',
            credentials: "include",
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
        }).then((response) => {

            return response.json();

        }).then((json) => {

            load = true;

            return json;

        }).catch((err) => {

            load = true;

            error = err;

        })

    }


    return {load, error, FetchData}

}