 import { useState } from 'react'
import ProductCard from './Componentes/ProductCard'
import { productList } from './Data/Index'
 
 const  App = () => {

  const renderProductsList = productList.map(product => <ProductCard key={product.id}  product={product}/>)
   return (
     <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  lg:grid-cols-3 gap-4 p-2 rounded-md '> 
    {renderProductsList}
     </div>
   )
 }

export default App
