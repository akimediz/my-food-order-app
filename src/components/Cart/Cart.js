import React, { useContext ,useState} from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({ hideCart }) => {
  const [isCheckout,setIsCheckout] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [didSubmit,setDidSubmit] = useState(false);
  const { items, totalAmount,addItem, removeItem } = useContext(CartContext);

  const grandTotalAmount = `$${totalAmount.toFixed(2)}`;
  const hasItems = items.length > 0;

  const cartItemRemoveHandler = (id) => {
    removeItem(id)
  };

  const cartItemAddHandler = (item) => {
    addItem({...item, amount:1})

  };
  const orderHandler = ()=>{
    setIsCheckout(true);

  }
  const submitOrderHandler = async (userData)=>{
    setIsSubmitting(true);
    await fetch("https://react-http-d7190-default-rtdb.firebaseio.com/order.json", {
      method:"POST",
      body:JSON.stringify({
        user:userData,
        orderedItems:items
      })

    })
    setIsSubmitting(false)
setDidSubmit(true);

  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null,item)}
          onRemove={cartItemRemoveHandler.bind(null,item.id)}
        />
        // <li>{item.name}</li>
      ))}
    </ul>
  );
const modalActions = <div className={classes.actions}>
<button className={classes["button--alt"]} onClick={hideCart}>
  Close
</button>
{hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
</div>

const cartModalContent = <>
{cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{grandTotalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm ={submitOrderHandler} onCancel={hideCart}/> }
      {!isCheckout && modalActions}
</>


const isSubmittingModalContent = <p>Sending Order Data ... </p>

const didSubmitModal = <p>Successfully submit the order .</p>
  return (
    <Modal hideCart={hideCart}>
      
    { !isSubmitting && !didSubmit && cartModalContent}
    {isSubmitting && isSubmittingModalContent}
    {!isSubmitting && didSubmit && didSubmitModal}
    </Modal>
  );
};

export default Cart;
