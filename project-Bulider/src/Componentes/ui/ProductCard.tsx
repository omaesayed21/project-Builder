import { IProduct } from '../../Interface/Index'
import Button from './Button'
import Image from './Image'
import { textSlice } from '../Utils/function'
import CircleColor from './CircleColor'
interface Iprops{
    product: IProduct
    setProductToEdit : (product  : IProduct) => void
    openEditModal : () => void
    idx :number
    setProductEditidx : (value : number) => void
    openConfirmModal :() => void
}

const ProductCard = ( { product  , setProductToEdit , openEditModal , idx , setProductEditidx , openConfirmModal} : Iprops) => {
  const renderColorList = product.colors && product.colors.map(colors => <CircleColor key={colors} color={colors}
  />)
  const onEdit =() =>{
    setProductToEdit(product)
    openEditModal()
    setProductEditidx(idx)
  }

  const onRemove = ( ) =>{
    setProductToEdit(product)
    openConfirmModal()
    
      }
    return (
        <div className='rounded-md p-4 flex flex-col mx-auto max-w-sm md:max-w-md min-h-[500px] shadow-md bg-white  gap-2'>
        <Image 
          imageUrl={product.imageURL} 
          alt="Productcard" 
          className="rounded-md mb-2 h-52 w-full object-cover"
        />
      
        <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
        <p className="text-gray-600 flex-grow">{textSlice(product.description, 50)}</p>
      
        <div className='flex my-2 space-x-2 items-center'>
          {renderColorList}
          {/* <span className='w-5 h-5 bg-indigo-600 rounded-full cursor-pointer'></span>
          <span className='w-5 h-5 bg-red-600 rounded-full cursor-pointer'></span>
          <span className='w-5 h-5 bg-yellow-600 rounded-full cursor-pointer'></span> */}
        </div>
      
        <div className='flex items-center justify-between mt-auto'>
          <span className='text-indigo-600 text-xl font-bold'>${product.price}</span>
          <Image 
            imageUrl={product.category.imageURL} 
            alt="Productcard" 
            className="w-10 h-10 rounded-full object-contain" 
          />
        </div>
      
        <div className='flex items-center justify-between space-x-2 mt-4'>
          <Button Childern={"Edit"} className="bg-blue-700 w-full  hover:bg-blue-800 cursor-pointer "  onClick={onEdit}/>
          <Button Childern={"Remove"} className=" bg-red-700 hover:bg-red-800 cursor-pointer w-full  "  onClick={onRemove}/>
        </div>
      </div>
      
        )

}
export default ProductCard