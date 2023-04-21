import { InputHTMLAttributes } from "react"
import { FieldValues, UseControllerProps, useController } from "react-hook-form"
import { FormType } from "../types/FormType";

type InputProps<T>=FormType & InputHTMLAttributes<HTMLInputElement> & UseControllerProps;

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