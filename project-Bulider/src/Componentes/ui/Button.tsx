import { ButtonHTMLAttributes , ReactNode } from "react";

interface Iprops extends ButtonHTMLAttributes<HTMLButtonElement>{
    children : ReactNode
        className?: string;
        width?: "w-full" |"w-fit"
    }
    
    /**
     * A simple button that takes a label and an onClick function and returns
     * a button element with those properties.
     * @param {Iprops} props
     * @return {JSX.Element}
     */
const Button = ({children , className , width = "w-full" ,...rest }: Iprops) => {
    return (
        <button className={`${className} rounded-lg p-2 w-full text-white ` } {...rest}>{children}</button>
    )
}

export default Button;