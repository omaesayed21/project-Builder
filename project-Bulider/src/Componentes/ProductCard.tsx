import CarImage from '../photo-1704340142770-b52988e5b6eb.jpg'

interface Iprops{

}

const ProductCard = ( {}: Iprops) => {
    return (
            <div className=' border '>
                <img src= {CarImage} alt="Productcard" />
            
            <h3> 2022 Toyota Corolla</h3>
            <p>The 2022 Toyota Corolla is a stylish, fuel-efficient sedan with advanced safety features and a smooth ride. It’s perfect for daily driving, offering reliability and modern tech in a sleek package</p>
            </div>
        )

}
export default ProductCard