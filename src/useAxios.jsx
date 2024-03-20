import axios from "axios";

const useAxios = axios.create({
    baseURL: "https://fb8a-2403-6200-88a2-c598-50cd-ad2a-98a5-8eb5.ngrok-free.app", // DatabaseUrl
})

export default useAxios