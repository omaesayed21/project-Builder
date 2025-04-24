 import { ChangeEvent, useState } from 'react'
import ProductCard from './Componentes/ui/ProductCard'
import { formInputsList, productList , colors } from './Data/Index'
import Modal from './Componentes/ui/Modal'
import  Button  from './Componentes/ui/Button'
import Input from './Componentes/ui/Input'
import { IProduct } from './Interface/Index'
import { productValidation } from './Validation'
import ErrorMassage from './Componentes/ui/ErorrMassage'
import CircleColor from './Componentes/ui/CircleColor'
import { v4 as uuid } from "uuid";

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
  const [products , setProducts] = useState<IProduct[]>(productList)
  const [product , setProduct] = useState <IProduct> (
    defaultProductObject
    )
    const [isOpen, setIsOpen] = useState(false)
    const [tempColor , setTempColor] = useState<string[]>([])
    console.log(tempColor);

    const [errors , setErrors] = useState({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    })

  
  const onChangeHandler = (e : ChangeEvent<HTMLInputElement>) => {
    const {name , value} = e.target
    setProduct({...product , [name] : value})

    setErrors({...errors  ,[name] : ""})
  }
  
  function closeModal() {
    setIsOpen(false)
  }
  
  function openModal() {
    setIsOpen(true)
  } 
  
  const onCancelHandler = () => {
    setProduct(defaultProductObject)
    closeModal()
  }
  const onSubmitHandler = (e : ChangeEvent<HTMLFormElement>) : void =>{
    e.preventDefault()
    const errors = productValidation({
      title: product.title
      , description: product.description,
      imageURL: product.imageURL,
      price: product.price
    })
     console.log(errors);
      
     const hasErrMsg = Object.values(errors).some(values => values === "")&& Object.values(errors).every(values => values === "")

     if(!hasErrMsg){
        setErrors(errors)
      return
     }
     console.log(" send data to the server");
     setProducts(prev => [ {...product  , id : uuid() , colors: tempColor } , ...prev  ])
     setProduct(defaultProductObject);
     setTempColor([])
     closeModal()


    
    
    }


    
  
  const renderProductsList = products.map(product => <ProductCard key={product.id}  product={product}/>)
    const renderColorList = colors.map(colors => <CircleColor key={colors} color={colors} onClick={
      ()=>{
      if (tempColor.includes(colors)){ 
        setTempColor( prev => prev.filter(item =>item !== colors))
        return
      }
      setTempColor([...tempColor,colors] )
    
    
    } }/>)


    // From List
  const renderFormInputsList = formInputsList.map(input =><div className=' flex flex-col  ' key={input.id}>
 <label className=' mb-[1px] text-sm  font-medium text-gray-700' htmlFor={input.id}>{input.label}</label>
 <Input type='text' id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} ></Input>
 {errors[input.name] && <ErrorMassage message={errors[input.name]} />}
   </div> )
   return ( 
    
    <div className=' container mx-auto'>
    <Button  Childern={"Add New Product"} className=" w-50 block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium" onClick={openModal} />
        <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  lg:grid-cols-3 gap-4 p-2 rounded-md '> 
    {renderProductsList}
     </div>
    <Modal isOpen={isOpen} closeModal={closeModal} title='Add A New Product' > 
    <form className=' space-y-3'  onSubmit={onSubmitHandler} >
    {renderFormInputsList}

{/* color list  */}
    <div className='flex my-2 space-x-1 items-center'>
      {tempColor.map(color => <span className='p-1 mr-1 text-sm   rounded-md text-white' style={{backgroundColor: color}}>{color}</span>)}
    </div>
    <div className='flex my-2 space-x-1 items-center '>
    {renderColorList}
    </div>

{/* BUTTONS Modal */}
<div className='flex items-center  space-x-3  gap-2 mt-2'>
<Button   Childern={"Submit"} className=" bg-indigo-700 hover:bg-indigo-800 w-full mb-1  cursor-pointer" / >
    <Button Childern={"Cancel"} className=" bg-gray-400 hover:bg-gray-600 w-full  cursor-pointer "  onClick={onCancelHandler}/>
</div>
    </form>
    
    </Modal>
    </div>
   )
   }

export default App 
