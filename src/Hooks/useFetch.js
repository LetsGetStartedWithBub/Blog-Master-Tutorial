import {useState,useEffect} from 'react';

const useFetch = (url) =>{
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        //For checking server delayed response scenario
        setTimeout(()=>{
            fetch(url, {signal:abortCont.signal})
        .then(res => {
            if(!res.ok){
                throw Error("Could not fetch from the source");
            }
            return res.json();
        })
        .then(data => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            if(err.name === "AbortError"){
                console.log("Fetch Aborted")
            }
            else{
                //auto catches network/connection error
                setIsPending(false);
                setError(err.message);
            }
        });
        },1000);
        return() => abortCont.abort();
    }, [url])    

    return { data , isPending , error};
}
export default useFetch;