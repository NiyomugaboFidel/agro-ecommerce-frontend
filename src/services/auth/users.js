import customAxios from "../../lib/customAxios"

export const getUsers=async()=>{
    try{
        const res=await customAxios.get('/users')
        return res.data
    }catch(error){
        return error.response.data.message;
    }
}

export const getUserById=async(id)=>{
    try{
        const res=await customAxios.get(`users/${id}`)
        return res.data
    }catch(error){
        return error.response.data.message;
    }
}

export const updateUserRole=async(id,userRole)=>{
    try{
        const res=await customAxios.patch(`/users/update-role/${id}`,{userRole})
        return res.data
    }catch(error){
        return error.response.data.message;
    }
}

export const updateUserActive=async(id)=>{
    try{
        const res=await customAxios.patch(`/users/update-status/${id}`)
        return res.data
    }catch(error){
        return error.response.data.message;
    }
}