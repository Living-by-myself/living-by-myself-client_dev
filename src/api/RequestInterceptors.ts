import axios from "axios";

axios.interceptors.response.use(
    function (config){
        const accessToken = localStorage.getItem('accessToken')
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error){
        return Promise.reject(error)
    }

)