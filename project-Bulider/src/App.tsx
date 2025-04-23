 import { ChangeEvent, useState } from 'react'
import ProductCard from './Componentes/ui/ProductCard'
import { formInputsList, productList } from './Data/Index'
import Modal from './Componentes/ui/Modal'
import  Button  from './Componentes/ui/Button'
import Input from './Componentes/ui/Input'
import { IProduct } from './Interface/Index'
 
// /**
//  * The main application component.
//  * @returns A JSX element that renders the main page layout,
//  *          including a grid of product cards and a modal.
//  */
const defaultProductObject  = {
  title: "",
  description: "",
  imageURL: "",
  price: "",
  colors: [],
  category: {
    name: "",
    imageURL: "",
  },
  
}
 const  App = () => {
  const [product , setProduct] = useState <IProduct> (
    defaultProductObject
  )
  const onChangeHandler = (e : ChangeEvent<HTMLInputElement>) => {
    const {name , value} = e.target
    setProduct({...product , [name] : value})
  }

  const onSubmitHandler = (e : ChangeEvent<HTMLFormElement>) : void =>{
    e.preventDefault()
    console.log(product);
    
  }

  const onCancelHandler = () => {
    setProduct(defaultProductObject)
    closeModal()
  }
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  } 
  const renderProductsList = productList.map(product => <ProductCard key={product.id}  product={product}/>)
  const renderFormInputsList = formInputsList.map(input =><div className=' flex flex-col  ' key={input.id}>
 <label className=' mb-[1px] text-sm  font-medium text-gray-700' htmlFor={input.id}>{input.label}</label>
 <Input type='text' id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} ></Input>
  </div> )
   return ( 
    
    <div className=' container mx-auto'>
      <button onClick={openModal}  className=' bg-indigo-700 hover:bg-indigo-800 w-full mb-1 '> Add</button>
        <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  lg:grid-cols-3 gap-4 p-2 rounded-md '> 
    {renderProductsList}
     </div>
    <Modal isOpen={isOpen} closeModal={closeModal} title='Add A New Product' > 
    <form className=' space-y-3'  onSubmit={onSubmitHandler} >
    {renderFormInputsList}
<div className='flex items-center  space-x-3  gap-2'>
<Button   Childern={"Submit"} className=" bg-indigo-700 hover:bg-indigo-800 w-full mb-1  cursor-pointer" / >
    <Button Childern={"Cancel"} className=" bg-gray-400 hover:bg-gray-600 w-full  cursor-pointer "  onClick={onCancelHandler}/>
</div>
    </form>
    
    </Modal>
    </div>
   )
   }

export default App 
