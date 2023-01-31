import axios from "axios";
import { useEffect, useState } from "react";

export default function useStateList(id) {
    const [stateList, setStateList] = useState([]);
    const [status, setStatus] = useState('');
    useEffect(() => {
        async function requestStateList() {
            setStateList([]);
            setStatus('loading');
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_HOST}/regions/getState/${id}`);
                setStateList(res.data.data);
                setStatus('success');

            } catch (error) {
                setStatus('failed')
            }
            
        }
        if (!id) {
            setStateList([]);
        } else {
            requestStateList();
        }

        
    },[id])

    return [stateList, status];
}