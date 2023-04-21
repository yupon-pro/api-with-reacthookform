import { NextApiRequest, NextApiResponse } from "next";
import { forms } from "../../regardingpages/data/Forms";
import { FormsType } from "../../regardingpages/types/FormsType";



export default function handler(req:NextApiRequest,res:NextApiResponse<FormsType>){
    const formId=req.query.formId
    if(typeof formId !=="string") return ;
    if(req.method==="GET"){
        const form=forms.find(form=>form.id===parseInt(formId))
        form &&res.status(200).json(form);
    }else if(req.method==="DELETE"){
        const deletedForms= forms.find(form=>form.id===parseInt(formId))
        const index=forms.findIndex(form=>form.id===parseInt(formId))
        forms.splice(index,1)
        deletedForms && res.status(200).json(deletedForms);
    }
};