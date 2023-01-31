import axios from "axios";
import { useEffect, useState } from "react";

export default function useDistrictList(id) {
    const [districtList, setDistrictList] = useState([]);
    const [status, setStatus] = useState('');
    useEffect(() => {
        async function requestStateList() {
            setDistrictList([]);
            setStatus('loading');
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_HOST}/regions/getDistrict/${id}`);
                setDistrictList(res.data.data);
                setStatus('success');

            } catch (error) {
                setStatus('failed')
            }
            
        }
        if (!id) {
            setDistrictList([]);
        } else {
            requestStateList();
        }

        
    },[id])

    return [districtList, status];
}