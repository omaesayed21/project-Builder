interface Iprops extends React.HTMLAttributes<HTMLDivElement> {
    color: string
 }
const CircleColor = ({color  , ...rest}: Iprops) => {

    return (
        <div className=" block w-5 h-5 bg-indigo-600 rounded-full cursor-pointer" style={{ backgroundColor: (color)   }} {...rest}> </div>
    )

}
export default CircleColor