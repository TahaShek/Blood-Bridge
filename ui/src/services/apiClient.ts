import axios from "axios";

const apiClient =axios.create({
    baseURL:"http://localhost:8080/api/v1",
    withCredentials:true,
    headers:{
        "Content-Type" : "application/json"
    }
});

apiClient.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.status === 401){
            console.log("session is expired ")
        }
    }
)

export default apiClient