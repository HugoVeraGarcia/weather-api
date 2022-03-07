import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url) => {

    const [response, setResponse] = useState({});

    useEffect(()=>{
        console.log('desde Fetch',url);

        axios.get(url)
        .then(res => {
            console.log('desde Fetch', res);
            setResponse(res);
        });
    },[ url ])

    return ( response );
        
};

export default useFetch;