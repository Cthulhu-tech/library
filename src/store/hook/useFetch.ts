export const useFetch = (method: string) => {

    const FetchData = (url: string, data: any = null) => {

        const headers:RequestInit = {
            method: method,
            mode: 'cors',
            redirect: 'follow',
            credentials: "include",
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: data === null ? null : JSON.stringify(data)
        }

        return fetch(url, headers).then((response) => {

            if(response.status === 400)
                return response.json().then(json =>{ throw new Error(json.message) })

            return response.json();

        }).then((json) => {

            return json;

        }).catch((err) => {

            if(typeof data.name !== 'undefined')
                return {message: err.message, type: 'admin'}
            if(typeof data.email !== 'undefined')
                return {message: err.message, type: 'user'}

            return err;

        })

    }


    return {FetchData}

}