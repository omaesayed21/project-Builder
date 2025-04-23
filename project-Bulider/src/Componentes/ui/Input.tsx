import { InputHTMLAttributes } from "react"

interface Iprops extends React.InputHTMLAttributes<HTMLInputElement> {

}
const Input = ({...rest}: Iprops) => {
    return (
    
     
        <input type="text"  className="border-[1px] border-gray-400  Shadow-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-3 text-md  " {...rest}  />
        )}
        export default Input