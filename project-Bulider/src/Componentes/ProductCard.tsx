import CarImage from '../photo-1704340142770-b52988e5b6eb.jpg'
import Image from './Image'
interface Iprops{

}

const ProductCard = ( {}: Iprops) => {
    return (
            <div className=' border  rounded-md p-2 flex flex-col'>
                <Image imageUrl={"https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} alt="Productcard" className="rounded-md mb-2" />
            <h2 className='text-2xl font-bold mb-2'> 2022 Toyota Corolla</h2>
            <p>The 2022 Toyota Corolla is a stylish, fuel-efficient sedan with advanced safety features and a smooth ride. It’s perfect for daily driving, offering reliability and modern tech in a sleek package</p>
            
          <div className=' flex my-2 space-x-2 items-center'>
          <span className='w-5 h-5 bg-indigo-600 rounded-full  cursor-pointer'></span>
            <span className='w-5 h-5 bg-red-600 rounded-full cursor-pointer'></span>
            <span className='w-5 h-5 bg-yellow-600 rounded-full cursor-pointer'></span>
          </div>
                <div className=' flex items-center  justify-between'>
                <span className=' text-indigo-600  text-xl  text-bolder'>$20,000</span>
                <Image imageUrl={"https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} alt="Productcard" className="w-10 h-10 rounded-full object-contain" />

                </div>
                <div className=' flex items-center justify-between space-x-2 mt-5'>
                    <button className='bg-red-700 rounded-md p-2 w-full text-white'>Edit</button>
                    <button className='bg-blue-700 rounded-md p-2 w-full text-white'>Destory</button>
                </div>
            </div>
        )

}
export default ProductCard