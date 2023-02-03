import axios from "axios";
const fetcher = async (url, body = null) => {
    const res = await axios.post(url,body);
    return res.data?.data;
}

module.exports = fetcher;