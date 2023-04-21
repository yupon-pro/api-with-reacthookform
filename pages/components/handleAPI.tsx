import { FormType } from "../types/FormType";

export const path="/api/serverAPI/"

export const fetchForms=async()=>{
    const res=await fetch(path,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    const detail=await res.json();
    return detail
};

export const submitForm=async(dataSet:FormType)=>{
    const res=await fetch(path,{
        method:"POST",
        body:JSON.stringify({form:dataSet}),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const detail=await res.json();
    return detail
}

export const deleteForm=async(formId:number)=>{
    const res=await fetch(`/api/${formId}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    })
    const detail=await res.json();
    return detail

};