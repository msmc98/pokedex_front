import { useState, useEffect } from "react";

export default function useFetchData(url) {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [controller, setController] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);
        (async () =>{
            try{
                const res = await fetch(url, {signal: abortController.signal});
                const json = await res.json();
                setResult(json);
                setLoading(false);
            }catch(e){
                if(e.name === "AbortError"){
                    console.log("Fetch Aborted");
                }else{
                    setError(e);
                    setLoading(false);
                }
                setLoading(false);
            }
            return () => abortController.abort();
        })();   
    }, [url])

    const handleCancelRequest = () =>{
        if(controller){
            controller.abort();
            setError("Request Cancelled");
        }
    }

    return {result, loading, error, handleCancelRequest};
}