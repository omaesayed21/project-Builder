import { ReactNode } from "react";

interface Iprops {
        Childern : ReactNode
        className?: string;
        width?: "w-full" |"w-fit"
    }
    
/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * A simple button that takes a label and an onClick function and returns
     * a button element with those properties.
     * @param {Iprops} props
     * @return {JSX.Element}
     */
/*******  418cd300-feb2-4137-9e07-e7758d543ebe  *******/
const Button = ({Childern , className , width = "w-full" ,...rest }: Iprops) => {
    return (
        <button className={`${className} rounded-md p-2 w-full text-white` } {...rest}>{Childern}</button>
    )
}

export default Button;