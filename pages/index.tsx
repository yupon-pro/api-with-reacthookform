import { useState } from "react";
import Input from "./components/Input";
import {useForm} from "react-hook-form"
import { FormType} from "./types/FormType";
import { FormsType} from "./types/FormsType";
import { deleteForm, fetchForms, submitForm } from "./components/handleAPI";
import Link from "next/link";

export default function Home() {
  const [data,setData]=useState<FormsType[]>([]);
  const {control,handleSubmit}=useForm<FormType>({defaultValues:{userName:"",password:""}})

  const getForms=async()=>{
    const detail=await fetchForms();
    setData(detail);
  }

  const onSubmit=async(dataSet:FormType)=>{
    const detail=await submitForm(dataSet);
    console.log(detail) 
    getForms();  
  };

  const eliminate=async(formId:number)=>{
    const detail=await deleteForm(formId);
    console.log(detail);
    getForms();
  };

  
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="cursor-pointer" htmlFor="userName">userName:</label>
          <Input className="p-2 m-1" id="userName" name="userName" control={control} placeholder="name"/>
        </div>
        <div>
          <label className="cursor-pointer" htmlFor="password">Password:</label>
          <Input id="password" name="password" control={control} placeholder="password" className="p-2 m-1" type="password"/>
        </div>
        <button type="submit" className="rounded border-black bg-slate-500 p-1 m-1">Submit</button>
      </form>
      <div>
          <button onClick={getForms} className="rounded border-black bg-slate-500 p-1 my-1">Load Forms</button>
      </div>
      <ul className="block w-full">
            {
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
                            <Link href={`/api/${d.id}`}> <button className="rounded border-black bg-green-400 p-1 mx-1">GO TO API!</button></Link>
                        </div>
                    </li>
                ))
            }
            </ul>
    </main>
  )
}
