import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../context';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';

export default function UserOrder() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { setCountCart } = useStateContext();

  useEffect(() => {
    // Load cart items from local storage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    // Calculate the total amount whenever cartItems change
    const calculatedTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalAmount(calculatedTotal);
    setCountCart(cartItems.length);
  }, [cartItems]);

  // Function to remove an item from the cart and clear local storage
  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1); // Remove the item at the specified index
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  }

  // Function to update the quantity of an item
  const updateQuantity = (index, newQuantity) => {
    // Ensure that the new quantity is not below 0
    newQuantity = Math.max(0, newQuantity);

    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  }


  // Function to update local storage with the cart items
  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }


  return (
    <div className='min-h-screen justify-center items-center flex bg-gradient-to-t from-gray-700 via-gray-900 to-gray-700'>
      <div className='min-h-min border-2 border-white p-5 md:w-2/3 rounded-lg m-5 text-white'>
        {cartItems.length === 0 ? (
          <h1 className='text-center'>סל הקניות שלך ריק, בחר מוצרים מהחנות <AddShoppingCartIcon/> <SentimentSatisfiedAltIcon/> 
          <Link to='/categories' className='border rounded-lg text-white bg-blue-500 p-2 mr-2'>המשך קנייה</Link></h1>
        ) : (
          <div>
            <h1 className='text-center font-bold underline '>סל הקניות שלך </h1>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className='p-3 m-1 border-white flex border-b-2'>
                  <p className='md:w-1/4 w-1/2 font-bold '> {item.name}</p>
                  <p className='md:w-1/4 w-1/2 pl-4 pr-2'>כמות :<input className='w-full text-black ps-2 font-semibold' type="number" value={item.quantity} onChange={(e) => updateQuantity(index, e.target.value)} /></p>
                  <p className='md:w-1/4 w-1/2 pl-1'> {item.price.toFixed(2)} ש"ח</p>
                  <p className='md:w-1/4 w-1/2 text-center'><button className=' p-1 border-2 rounded-lg border-white bg-red-600 text-white ring' onClick={() => removeItem(index)}>הסר מוצר</button></p>
                </li>
              ))}
            </ul>
            <h2 className='p-3 mt-4 text-center text-xl'><strong>סה"כ לתשלום : {totalAmount.toFixed(2)} ש"ח</strong></h2>
            <p className='w-full text-xl flex justify-center'>
              <Link className='border-2 border-white p-2 rounded-lg ml-3' >מעבר לתשלום</Link>      
              <Link to='/categories' className='border-2 border-white p-2 rounded-lg' >המשך קנייה</Link>      
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
