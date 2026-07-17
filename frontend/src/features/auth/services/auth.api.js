import apiClient from "../../../services/apiClient.js";

export async function register({username, email, password}) {
    try{
        const response = await apiClient.post("/api/auth/register" , {
            username, email, password
        })

        return response.data;

    }catch(err){
        console.error(err);
        throw err;
    }
}

export async function login({email, password}){
    try{
        const response = await apiClient.post("/api/auth/login", {
            email, password
        })

        return response.data
    }catch(err){
        console.error(err);
        throw err;
    }
}

export async function logout(){
    try{
        const response = await apiClient.post("/api/auth/logout", {})

        return response.data

    }catch(err){
        console.error(err);
        throw err;
    }
}

export async function getMe(){
    try{
        const response = await apiClient.get("/api/auth/get-me")

        return response.data
        
    }catch(err){    
        console.error(err);
        throw err;
    }
}