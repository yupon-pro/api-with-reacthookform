import { InputHTMLAttributes } from "react"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"
import { Form } from "../types/FormType";

type InputProps<T>=Form & InputHTMLAttributes<HTMLInputElement> & UseControllerProps;

const Input=<T extends FieldValues>(props:InputProps<T>):JSX.Element=>{
    const {name,control,...inputAttributes}=props;
    const {
        field,
        fieldState:{error},
    }=useController({name,control,rules:{required:{value:true,message:"Please Enter words"}}})

    return(
        <>
            <input  id={name}  {...inputAttributes} {...field} />
            {error && (
                <div>
                    <span>{error.message}</span>
                </div>
            )}
        </>
    )
};

export default Input