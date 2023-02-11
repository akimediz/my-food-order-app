import React, {useContext,useEffect,useState} from 'react';
import classes from "./HeaderCartButton.module.css";
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';



const HeaderCartButton = ({showCart}) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const {items} = useContext(CartContext);
const totalItems = items.reduce((curNumber, item)=>{
  return curNumber + item.amount
}, 0);


const btnClasses = `${classes.button} ${ btnIsHighlighted ?  classes.bump: ""}`;

useEffect(()=>{
  if (items.length === 0){
    return;
  }
  setBtnIsHighlighted(true);

  const timer = setTimeout(()=>{
    setBtnIsHighlighted(false);
  },300);

  return ()=>{
    clearTimeout(timer)
  }

},[items])
  return (
 <button className={btnClasses} onClick={showCart}>
    <span className={classes.icon}>
        <CartIcon/>
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>{totalItems}</span>

 </button>
  )
}

export default HeaderCartButton
