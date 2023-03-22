import { useState, useEffect } from "react";

export function usePost(url, data) {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try{
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data
                    })
                });
                const json = await res.json();
                setResult(json);
                setLoading(false);
            }catch(e){
                setError(e);
                setLoading(false);
            }
        })();   
    })

    return {result, loading, error};
}