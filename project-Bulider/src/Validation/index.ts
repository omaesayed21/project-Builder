 
export const productValidation = (product: {  title: string,
    description: string,
    imageURL: string,  price: string }) => {

    const error:  {   title: string,
        description: string,
        imageURL: string, 
        price: string} = {

            title: "",
            description: "",
            imageURL: "",
            price: "",
        }
        const validateUrl = /^(https?|ftp):\/\/[^\s]+$/.test(product.imageURL)

            if (!product.title.trim() || product.title.length<10 || product.title.length >80 )  {
                    error.title = "Title must be between 10 and 80 characters"

            }
            if(!product.description.trim() || product.description.length<10 || product.description.length >900 )  {
                error.description = "Description must be between 10 and 900 characters"}
                                
            if(!product.imageURL.trim() || !validateUrl) {
                error.imageURL = "Image URL must be a valid URL"}
              
              
              if(!product.price.trim() || isNaN(Number(product.price))){

                error.price = "Price must be a Number"
              }
              
              
                return error

            }
   
    



 