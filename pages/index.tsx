import { ClassAttributes, FC, useRef, useState } from "react";
import Input from "../regardingpages/components/Input";
import {useForm} from "react-hook-form"
import { FormType} from "../regardingpages/types/FormType";
import { FormsType} from "../regardingpages/types/FormsType";
import { deleteForm, fetchForms, submitForm } from "../regardingpages/components/handleAPI";
import Link from "next/link";
import { GetStaticProps } from "next";

type Forms=FormsType[] & GetStaticProps;

export async function getStaticProps(){
  const res=fetch("https://api-with-reacthookform.vercel.app/api/serverAPI").then(data=>data.json()).catch(error=>{throw error});
  try{
    const forms=await res;
    return{
      props:{
        forms
      }
    }
  }catch{
    const forms=[{
      id:0,
      form:{
        userName:"Amagi Yuri",
        password:"the University of Kyushu-u",
      }
    }]
    return{
      props:{
        forms
      }
    }
  }
}

export default function Home({forms}:any) {
  const [data,setData]=useState<FormsType[]>(forms);
  const [loaded,setLoaded]=useState<boolean>(false);
  const {control,handleSubmit,reset}=useForm<FormType>({defaultValues:{userName:"",password:""}})

  const display=async()=>{
    const detail=await fetchForms();
    setData(detail);
  }
  
  const onSubmit=async(dataSet:FormType)=>{
    const detail=await submitForm(dataSet);
    loaded && display();
    console.log(detail);
    reset();   
  };

  const eliminate=async(formId:number)=>{
    const detail=await deleteForm(formId);
    console.log(detail);
    display();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-center">
      <button onClick={()=>console.log(forms)} className="rounded border-black bg-slate-500 py-1 px-2 m-2">Confirm SSG</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="cursor-pointer" htmlFor="userName">userName:</label>
          <Input className="p-2 m-1" id="userName" name="userName" control={control} placeholder="name" />
        </div>
        <div>
          <label className="cursor-pointer" htmlFor="password">Password:</label>
          <Input id="password" name="password" control={control} placeholder="password" className="p-2 m-1" type="password"/>
        </div>
        <button type="submit" className="rounded border-black bg-slate-500 p-1 m-1">Submit</button>
      </form>
      <div>
          <button onClick={()=>{setLoaded(true),display()}}  className="rounded border-black bg-slate-500 py-1 px-2 m-1">Load Forms</button>
          <button onClick={()=>setLoaded(false)}  className="rounded border-black bg-slate-500 py-1 px-2 m-1">Close Forms</button>
      </div>
      <ul className="block w-full">
            {
              loaded &&
                data.map(d=>(
                    <li key={d.id} className="bg-blue-300 w-9/12 my-2 mx-auto ">
                        {d.form.userName}:{d.form.password}:{d.id}
                        <div className="flex justify-evenly">
                            <button onClick={()=>eliminate(d.id) } className="rounded border-black bg-red-400 p-1 mx-1">Delete</button>
                            {/* 
                            ()=>だったら、関数を呼ぶ処理になる。しかし関数オブジェクトを呼ぶだけだったら、
                            暗黙の裡にe:MouseEventがPromise関数に渡されることになり、型があわないというエラーが出る。 
                            (空！)=>は、イベントを何も渡していないことを明示する。
                            */}
                            <Link href={`/api/${d.id}`}><button className="rounded border-black bg-green-400 p-1 mx-1">GO TO API!</button></Link>
                        </div>
                    </li>
                ))
            }
            </ul>
    </main>
  )
}
