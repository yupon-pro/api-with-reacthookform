import type { NextApiRequest, NextApiResponse } from 'next'
import { FormsType } from '../types/FormsType'
import { forms } from '../data/Forms'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormsType | FormsType[]>
) {
  if(req.method==="GET"){
    res.status(200).json(forms);
  }else if (req.method==="POST"){
    const form=req.body.form ;
    const newForm={
      id:forms.length+1,
      form:form
    };
    forms.push(newForm);
    res.status(201).json(newForm);
  }
}
