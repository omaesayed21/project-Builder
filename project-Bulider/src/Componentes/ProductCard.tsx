import { IProduct } from '../Interface/Index'
import Button from './Button'
import Image from './Image'
import { textSlice } from './Utils/function'
interface Iprops{

    product: IProduct
}

const ProductCard = ( { product}: Iprops) => {
    return (
            <div className=' border  rounded-md p-2 flex flex-col'>
                <Image imageUrl={product.imageURL} alt={"Productcard"} alt="Productcard" className="rounded-md mb-2" />
            <h2 className='text-2xl font-bold mb-2'>{product.title}</h2>
            <p> {textSlice(product.description, 50)}</p>
            
          <div className=' flex my-2 space-x-2 items-center'>
          <span className='w-5 h-5 bg-indigo-600 rounded-full  cursor-pointer'></span>
            <span className='w-5 h-5 bg-red-600 rounded-full cursor-pointer'></span>
            <span className='w-5 h-5 bg-yellow-600 rounded-full cursor-pointer'></span>
          </div>
                <div className=' flex items-center  justify-between'>
                <span className=' text-indigo-600  text-xl  text-bolder'>${product.price}</span>
                <Image imageUrl={product.imageURL} alt="Productcard" className="w-10 h-10 rounded-full object-contain" />

                </div>
                <div className=' flex items-center justify-between space-x-2 mt-5'>
                <Button Childern={"Edit"} className="bg-red-700 " />
                <Button Childern={"Delete"} className="bg-blue-700 " />
                </div>
            </div>
        )

}
export default ProductCard