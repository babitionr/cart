import Navbar from "./conponents/Navbar";
import CartContainer from "./conponents/cartContainer";

import { useDispatch, useSelector } from "react-redux";
import { calculateTotals,getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./conponents/Modal";

function App() {
  const { cartItem, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals(), [cartItem])
  })

  useEffect(() => {
    dispatch(getCartItems('random'))
  }, [])

  return (
    <>
      <main>
        { isOpen && <Modal /> }
        <Navbar />
        <CartContainer />
      </main>
    </>  
  )
}
export default App;
