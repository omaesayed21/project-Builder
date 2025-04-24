interface Iprops {
    color: string
 }
const CircleColor = ({color }: Iprops) => {

    return (
        <div className=" block w-5 h-5 bg-indigo-600 rounded-full cursor-pointer" style={{ backgroundColor: (color) }}> </div>
    )

}
export default CircleColor