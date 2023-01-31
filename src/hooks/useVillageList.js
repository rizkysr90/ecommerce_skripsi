import axios from "axios";
import { useEffect, useState } from "react";

export default function useVillageList(id) {
    const [villageList, setVillageList] = useState([]);
    const [status, setStatus] = useState('');
    useEffect(() => {
        async function requestStateList() {
            setVillageList([]);
            setStatus('loading');
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_HOST}/regions/getVillage/${id}`);
                setVillageList(res.data.data);
                setStatus('success');

            } catch (error) {
                setStatus('failed')
            }
            
        }
        if (!id) {
            setVillageList([]);
        } else {
            requestStateList();
        }

        
    },[id])

    return [villageList, status];
}