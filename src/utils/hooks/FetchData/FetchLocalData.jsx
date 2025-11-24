import { useState, useEffect } from 'react';


export function useFetchLocalData(localUrl, method, body, param, update) {
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    // const [send, setsend] = useState(true);


    useEffect(() => {
        if (!localUrl) return;

        setLoading(true)
        setError(false)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Connection", "Keep-alive");

        var myInit = {
            method: (method ? method : "GET"),
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: (body ? JSON.stringify(body) : null)
        };



        async function fetchData() {
            try {
                const response = await fetch(localUrl, myInit);
                const data = await response.json();
                setData(data);
                if (data.timestamp && data.status) {
                    console.log("==Une erreur serveur ==", data);
                    setError(true);
                }
            } catch (err) {
                console.log(err);
                setError(true);
            } finally {
                setLoading(false);
            }

        }
        fetchData();

    }, [localUrl, method, body, param, update])
    return { isLoading, data, error };
}