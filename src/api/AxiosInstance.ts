import axios from "axios";

const instance = axios.create({
    baseURL:'https://tracelover.shop'
});

export default instance;