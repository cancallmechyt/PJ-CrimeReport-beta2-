import axios from "axios";

const useAxios = axios.create({
    baseURL: "https://6902-2403-6200-88a2-c598-a987-a76a-b6b2-6598.ngrok-free.app", // DatabaseUrl
    headers: {
        Authorization: `Bearer ${
          localStorage.getItem("user")!= null /*  .token, != null */
            ? JSON.parse(localStorage.getItem("user")).token
            : null
        }`,
      }
})

export default useAxios