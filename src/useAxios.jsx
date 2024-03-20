import axios from "axios";

const useAxios = axios.create({
    baseURL: "https://crime-api-firebase.onrender.com/", // DatabaseUrl
})

export default useAxios