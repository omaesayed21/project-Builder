 import { useState } from 'react'
import ProductCard from './Componentes/ui/ProductCard'
import { productList } from './Data/Index'
import Modal from './Componentes/ui/Modal'
import  Button  from './Componentes/ui/Button'
 
/**
 * The main application component.
 * @returns A JSX element that renders the main page layout,
 *          including a grid of product cards and a modal.
 */
 const  App = () => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  } 
  const renderProductsList = productList.map(product => <ProductCard key={product.id}  product={product}/>)
   return ( 
    
    <div className=' container mx-auto'>
      <button onClick={openModal}  className=' bg-indigo-700 hover:bg-indigo-800 w-full mb-1 '> Add</button>
        <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  lg:grid-cols-3 gap-4 p-2 rounded-md '> 
    {renderProductsList}
     </div>
    <Modal isOpen={isOpen} closeModal={closeModal} > 
    
<div className='flex items-center  space-x-2  gap-2'>
<Button   Childern={"Submit"} className=" bg-indigo-700 hover:bg-indigo-800 w-full mb-1 " />
    <Button Childern={"Edit"} className=" bg-red-700 hover:bg-red-800 w-full  " />
</div>
    
    </Modal>
    </div>
   )
   }

export default App 
