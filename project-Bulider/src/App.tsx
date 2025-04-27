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
import toast , { Toaster} from 'react-hot-toast'

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
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);


  console.log(productEditidx);
  

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
 
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setProductEdit({
      ...productEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

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
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);


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
    // console.log(errors);

    const hasErrMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");


    if (!hasErrMsg) {
      setErrors(errors)
      return
    }
    console.log(" send  to the server");
    setProducts(prev => [{ ...product, id: uuid(), colors: tempColor, category: selectedCatogeris }, ...prev])
    setProduct(defaultProductObject);
    setTempColor([])
    closeModal()


    toast('Product has been Added!', {
      icon: '✅',
      style: {
        borderRadius: '8px',
        background: '#333',
        color: '#fff',
        padding: '12px 16px',
        fontSize: '16px',
        fontWeight: '500',
      },
      position: 'top-center',
      duration: 3000,
    });
  }
    
  const onSubmitEditHandler = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const errors = productValidation({
      title: productEdit.title
     , description: productEdit.description,
      imageURL: productEdit.imageURL,
      price: productEdit.price,
    })
    // console.log(errors);

    const hasErrMsg = Object.values(errors).some(value => value === "") && Object.values(errors).every(value => value === "");


    if (!hasErrMsg) {
      setErrors(errors)
      return
    }


    const updatedProducts= [...products]
    updatedProducts[productEditidx] = {...productEdit , colors : tempColor.concat(productEdit.colors) }
    setProducts(updatedProducts)

    // setProducts(prev => [{ ...product, id: uuid(), colors: tempColor, category: selectedCatogeris }, ...prev])
    setProductEdit(defaultProductObject);
    setTempColor([])
    closeEditModal()
    toast('Product has been Updated!', {
      icon: '✅',
      style: {
        borderRadius: '8px',
        background: '#333',
        color: '#fff',
        padding: '12px 16px',
        fontSize: '16px',
        fontWeight: '500',
      },
      position: 'top-center',
      duration: 3000,
    });
  }

  const removeProductHandler = () => {
    const Filter = products.filter(product => product.id !== productEdit.id)

    setProducts(Filter)
    closeConfirmModal()
    toast('Product has been Deleted!', {
      icon: '✅',
      style: {
        borderRadius: '8px',
        background: '#333',
        color: '#fff',
        padding: '12px 16px',
        fontSize: '16px',
        fontWeight: '500',
      },
      position: 'top-center',
      duration: 3000,
    }); }

 


// Randers

const renderProductsList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductEdit}
      openEditModal={openEditModal}
      setProductEditidx={setProductEditIdx}
      idx={idx}
      openConfirmModal={openConfirmModal}
    />
));


  const renderColorList = colors.map(colors => <CircleColor key={colors} color={colors} onClick={
    () => {
            // DUPLICATE  TO Cancel  in add Modal

      if (tempColor.includes(colors)) {
        setTempColor(prev => prev.filter(item => item !== colors))
        return
      }
      setTempColor([...tempColor, colors])


      // DUPLICATE  TO Cancel  in Edit Modal
      if (productEdit.colors.includes(colors)) {
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
    <div className="flex items-center justify-between mx-8 my-6">
  <h1 className="text-2xl font-semibold text-gray-800">
    Product Builder
  </h1>

  <button
    className="bg-indigo-700 hover:bg-indigo-800 text-white text-sm px-5 py-2 rounded-md font-medium transition-colors cursor-pointer"
    onClick={openModal}
  >
    Add Product
  </button>
</div>

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

          {/* BUTTONS Modal for ADD product */}

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

          <Select
            selected={productEdit.category}
            setSelected={value => setProductEdit({ ...productEdit, category: value })}
          />
          
                    {/* color list  */}

          
          <div className='flex my-2 space-x-1 items-center'>
            { tempColor.concat(productEdit.colors).map(color => <span className='p-1 mr-1 text-sm   rounded-md text-white' style={{ backgroundColor: color }}>{color}</span>)}
          </div>

          <div className='flex my-2 space-x-1 items-center '>
            {renderColorList}
          </div>


{/* Buttos Modal for Edit */}
          <div className='flex items-center  space-x-3  gap-2 mt-2'>
            <Button Childern={"Submit"} className=" bg-indigo-700 hover:bg-indigo-800 w-full mb-1  cursor-pointer" />
            <Button Childern={"Cancel"} className=" bg-gray-400 hover:bg-gray-600 w-full  cursor-pointer " onClick={onCancelHandler} />
          </div>
        </form>

      </Modal>

{/*  Delete Modal */}

<Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
        <Button Childern={"Yes , remove "} className=" bg-[#c2344d] hover:bg-red-800 cursor-pointer" onClick={removeProductHandler} />
        <Button Childern={"Cancel"} className="bg-[#f5f5fa] hover:bg-gray-300 !text-black cursor-pointer" onClick={closeConfirmModal} />
        </div>
      </Modal>

    <Toaster/>
    </div>
  ) 


}

export default App
  
