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
  setCartItems((prevItems) => {
    const existingCartItem = prevItems.find(
      (item) => item.id === id
    );

    if (existingCartItem.amount === 1) {
      return prevItems.filter((item) => item.id !== id);
    }

    return prevItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          amount: item.amount - 1
        };
      }

      return item;
    });
  });
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