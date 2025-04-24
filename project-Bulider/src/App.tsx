import { ChangeEvent, useState } from 'react'
import ProductCard from './Componentes/ui/ProductCard'
import { formInputsList, productList, colors, categories } from './Data/Index'
import Modal from './Componentes/ui/Modal'
import Button from './Componentes/ui/Button'
import Input from './Componentes/ui/Input'
import { IProduct } from './Interface/Index'
import { productValidation } from './Validation'
import ErrorMassage from './Componentes/ui/ErorrMassage'
import CircleColor from './Componentes/ui/CircleColor'
import { v4 as uuid } from "uuid";
import Select from './Componentes/ui/Select'
import ProductName from './Type/Index'

// /**
//  * The main application component.
//  * @returns A JSX element that renders the main page layout,
//  *          including a grid of product cards and a modal.
//  */
const defaultProductObject = {
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
const App = () => {
  //  states
  const [products, setProducts] = useState<IProduct[]>(productList)
  const [product, setProduct] = useState<IProduct>(
    defaultProductObject
  )
  const [productEdit, setProductEdit] = useState<IProduct>(defaultProductObject)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [tempColor, setTempColor] = useState<string[]>([])
  const [ productEditidx , setProductEditIdx ] = useState<number>(0)


  console.log(productEdit);

  console.log(tempColor);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  })

  const [selectedCatogeris, setSelectedCatogeris] = useState(categories[0])

  // Functions

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })

    setErrors({ ...errors, [name]: "" })
  }
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProductEdit({ ...productEdit, [name]: value })

    setErrors({ ...errors, [name]: "" })
  }

  // ADD MODAL FUNCTIONS
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  // EDIT MODAL FUNCTIONS
  function closeEditModal() {
    setIsOpenEditModal(false)
  }

  function openEditModal() {
    setIsOpenEditModal(true)
  }

  const onCancelHandler = () => {
    setProduct(defaultProductObject)
    closeModal()
  }
  const onSubmitHandler = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const errors = productValidation({
      title: product.title
      , description: product.description,
      imageURL: product.imageURL,
      price: product.price,
    })
    console.log(errors);

    const hasErrMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");


    if (!hasErrMsg) {
      setErrors(errors)
      return
    }
    console.log(" send data to the server");
    setProducts(prev => [{ ...product, id: uuid(), colors: tempColor, category: selectedCatogeris }, ...prev])
    setProduct(defaultProductObject);
    setTempColor([])
    closeModal()




  }
  const onSubmitEditHandler = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const errors = productValidation({
      title: product.title
      , description: product.description,
      imageURL: product.imageURL,
      price: product.price,
    })
    console.log(errors);

    const hasErrMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");


    if (!hasErrMsg) {
      setErrors(errors)
      return
    }
    console.log(" send data to the server");
    setProducts(prev => [{ ...product, id: uuid(), colors: tempColor, category: selectedCatogeris }, ...prev])
    setProductEdit(defaultProductObject);
    setTempColor([])
    closeModal()




  }


// Randers

  const renderProductsList 
  = products.map(product , idx =>
<>
<h2>{idx}</h2>
     <ProductCard key={product.id} product={product} setProductToEdit={setProductEdit} openEditModal={openEditModal}   setProductEditidx={setProductEditIdx} idx={idx}/>


</>)

  const renderColorList = colors.map(colors => <CircleColor key={colors} color={colors} onClick={
    () => {
      if (tempColor.includes(colors)) {
        setTempColor(prev => prev.filter(item => item !== colors))
        return
      }
      setTempColor([...tempColor, colors])


    }} />)

  const renderProductEditList = (id: string, label: string, name: ProductName) =>{
    return (
      <div className=' flex flex-col  ' >
        <label className=' mb-[1px] text-sm  font-medium text-gray-700' htmlFor=
          {id}
        >{label}</label>
        <Input type='text' id={id} name={name} value={productEdit[name]} onChange={onChangeEditHandler} ></Input>

        {errors[name] && <ErrorMassage message={errors[name]} />}
      </div>
    )
  }


  // From List
  const renderFormInputsList = formInputsList.map(input => <div className=' flex flex-col  ' key={input.id}>
    <label className=' mb-[1px] text-sm  font-medium text-gray-700' htmlFor={input.id}>{input.label}</label>
    <Input type='text' id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} ></Input>
    {errors[input.name] && <ErrorMassage message={errors[input.name]} />}
  </div>)
  return (

    <div className=' container mx-auto'>
      <Button Childern={"Add New Product"} className=" w-50 block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium" onClick={openModal} />
      <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  lg:grid-cols-3 gap-4 p-2 rounded-md '>
        {renderProductsList}
      </div>

      {/* Add Product Modal */}
      <Modal isOpen={isOpen} closeModal={closeModal} title='Add A New Product' >
        <form className=' space-y-3' onSubmit={onSubmitHandler} >
          {renderFormInputsList}
          <Select selected={selectedCatogeris} setSelected={setSelectedCatogeris}  ></Select>

          {/* color list  */}
          <div className='flex my-2 space-x-1 items-center'>
            {tempColor.map(color => <span className='p-1 mr-1 text-sm   rounded-md text-white' style={{ backgroundColor: color }}>{color}</span>)}
          </div>

          <div className='flex my-2 space-x-1 items-center '>
            {renderColorList}
          </div>

          {/* BUTTONS Modal */}
          <div className='flex items-center  space-x-3  gap-2 mt-2'>
            <Button Childern={"Submit"} className=" bg-indigo-700 hover:bg-indigo-800 w-full mb-1  cursor-pointer" />
            <Button Childern={"Cancel"} className=" bg-gray-400 hover:bg-gray-600 w-full  cursor-pointer " onClick={onCancelHandler} />
          </div>
        </form>

      </Modal>

      {/* Edit Product Modal */}
      <Modal isOpen={isOpenEditModal} closeModal={closeEditModal} title='Edit This Product' >
        <form className=' space-y-3' onSubmit={onSubmitEditHandler} >
          {renderProductEditList("Title", "Product Title", "title")}
          {renderProductEditList("Description", "Product Description", "description")}
          {renderProductEditList("Imaage URL", "Product Image URL", "imageURL")}
          {renderProductEditList("price", "Product Price", "price")}

     

          {/* {renderFormInputsList}
    <Select  selected={selectedCatogeris} setSelected={setSelectedCatogeris}  ></Select>

    
{/* color list  */}
          {/* <div className='flex my-2 space-x-1 items-center'>
      {tempColor.map(color => <span className='p-1 mr-1 text-sm   rounded-md text-white' style={{backgroundColor: color}}>{color}</span>)}
    </div>

    <div className='flex my-2 space-x-1 items-center '>
    {renderColorList}
    </div> */}

          {/* BUTTONS Modal */}
          <div className='flex items-center  space-x-3  gap-2 mt-2'>
            <Button Childern={"Submit"} className=" bg-indigo-700 hover:bg-indigo-800 w-full mb-1  cursor-pointer" />
            <Button Childern={"Cancel"} className=" bg-gray-400 hover:bg-gray-600 w-full  cursor-pointer " onClick={onCancelHandler} />
          </div>
        </form>

      </Modal>
    </div>
  )
}

export default App
