import React,{useContext} from 'react';
import classes from "./MealItem.module.css";
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';



const MealItem = ({name,description,price,id}) => {
const {addItem} = useContext(CartContext)
    const refinedPrice = `$${price.toFixed(2)}`

    const addToCartHandler = (amount)=>{
      addItem({
id:id,
name:name,
price:price,
amount:amount
      })

    }

  return <li className={classes.meal}>
    <div><h3>{name}</h3>
    <div className={classes.description}>{description}</div>
    <div className={classes.price}>{refinedPrice}</div>
    </div>
    <div>
        <MealItemForm onAddToCart={addToCartHandler}/>
    </div>
  </li>
}

export default MealItem
