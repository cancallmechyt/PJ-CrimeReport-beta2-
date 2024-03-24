import axios from "axios";

const useAxios = axios.create({
    baseURL: "http://localhost:5000", // DatabaseUrl https://crime-api-firebase.onrender.com , http://localhost:5000
})

export default useAxios