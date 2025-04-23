interface iprops {
    message: string;
}
const ErrorMassage = ({ message }: iprops) => {
  return message ?  <span className=" text-red-700  font-semibold  text-sm  block"> {message}</span> : null

};
export default ErrorMassage;