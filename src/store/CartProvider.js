import { useState } from 'react' ;
import CartContext from './cart-context';

const CartProvider = props => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount] = useState(0);

    const addItemToCartHandler = (item) => {
  setCartItems((prevItems) => {
    const existingCartItemIndex = prevItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    const existingCartItem = prevItems[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + item.amount
      };

      updatedItems = [...prevItems];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = [...prevItems, item];
    }

    return updatedItems;
  });
};
    
    const removeItemFromCartHandler = (id) => {
    };
    
    
    const cartContext = {
        items: cartItems,
        totalAmount: totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;