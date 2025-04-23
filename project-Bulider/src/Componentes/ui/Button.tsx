import { ReactNode } from "react";

interface Iprops {
        Childern : ReactNode
        className?: string;
        width?: "w-full" |"w-fit"
    }
    
    /**
     * A simple button that takes a label and an onClick function and returns
     * a button element with those properties.
     * @param {Iprops} props
     * @return {JSX.Element}
     */
const Button = ({Childern , className , width = "w-full" ,...rest }: Iprops) => {
    return (
        <button className={`${className} rounded-md p-2 w-full text-white ` } {...rest}>{Childern}</button>
    )
}

export default Button;