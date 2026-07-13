import axios from "axios";

export async function register({username, email, password}) {
    try{
        const response = await axios.post("http://localhost:3000/api/auth/register" , {
            username, email, password
        }, {
            withCredentials: true
        })

        return response.data;

    }catch(err){
        console.error(err);
        throw err;
    }
}

// the register API was also setting token into cookies.
// but by default axios it does got give access of cookies to server, so we use  withCredentials:true

export async function login({email, password}){
    try{
        const response = await axios.post("http://localhost:3000/api/auth/login", {
            email, password
        }, {
            withCredentials: true
        })

        return response.data
    }catch(err){
        console.error(err);
        throw err;
    }
}

export async function logout(){
    try{
        const response = await axios.post("http://localhost:3000/api/auth/logout", {}, {
            withCredentials: true
        })

        return response.data

    }catch(err){
        console.error(err);
        throw err;
    }
}

export async function getMe(){
    try{
        const response = await axios.get("http://localhost:3000/api/auth/get-me", {
            withCredentials:true
        })

        return response.data
        
    }catch(err){    
        console.error(err);
        throw err;
    }
}