import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps){
    return(
        <input
        className="border-0 rounded-md h-9 px-2 outline-none mb-3"
        {...props}
        />
    )
}