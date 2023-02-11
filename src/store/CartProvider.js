import React , {useReducer} from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items:[],
  totalAmount:0
}

const cartReducer = (state,action)=>{
  if (action.type === "ADD"){
    const updatedTotalAmount = state.totalAmount + (action.payload.price * action.payload.amount);

    const existingCartItemIndex = state.items.findIndex((item)=>item.id === action.payload.id);
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if(existingCartItem){
    // let updatedItem ;

      const updatedItem = {
        ...existingCartItem, amount:existingCartItem.amount + action.payload.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    else{
      updatedItems = state.items.concat(action.payload);

    }

    return {
      items:updatedItems,
      totalAmount:updatedTotalAmount
    }
  }
 
if(action.type === "REMOVE"){
  const existingItemToRemoveIndex = state.items.findIndex((itemToRemove)=>itemToRemove.id === action.payload);

  const existingItemToRemove = state.items[existingItemToRemoveIndex];
  const updatedTotalAmount = state.totalAmount - (existingItemToRemove.price)

  
  let updatedItemsDel;

  if(existingItemToRemove.amount > 1){
    const deletingItem = {
      ...existingItemToRemove, amount:existingItemToRemove.amount-1
    }
    updatedItemsDel = [...state.items];
    updatedItemsDel[existingItemToRemoveIndex] = deletingItem;

  }
  else{
    updatedItemsDel = state.items.filter(itemToDelete=> itemToDelete.id !== action.payload)
  }

  return {
    items:updatedItemsDel,
    totalAmount:updatedTotalAmount
  }

}

return defaultCartState
}

const CartProvider = ({children}) => {
  const [cartState,dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item)=>{
      dispatchCartAction({type:"ADD",payload:item})
    };

    const removeItemFromcartHandler = (id)=>{
      dispatchCartAction({type:"REMOVE",payload:id })
    };

const cartContext = {
    items:cartState.items,
    totalAmount:cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromcartHandler
}


  return (
    <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
  
  )
}

export default CartProvider
