import axios from "axios";

const useAxios = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        Authorization: `Bearer ${
          localStorage.getItem("user")!= null /*  .token, != null */
            ? JSON.parse(localStorage.getItem("user")).token
            : null
        }`,
      }
})

export default useAxios