import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';


const Cart = props => {
    const cartCtx = useContext(CartContext);
    
    const cartItems = (
        <ul className={classes['cart-items']}>
   {cartCtx.items.map((item) => {
  return (
    <CartItem
      key={item.id}
      id={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={() => cartCtx.removeItem(item.id)}
    />
  );
})}
    </ul>
);

const totalAmount = cartCtx.items.reduce((total, item) => {
  return total + item.price * item.amount;
}, 0);

   return (
    <Modal onClose={props.onClose}>
    {cartItems}
    <div className={classes.total}>
       <span>Total Amount</span>
<span>${totalAmount.toFixed(2)}</span>
    </div>
    <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
            Close
        </button>
        <button className={classes.button}>Order</button>
    </div>
    </Modal>
   ); 
};

export default Cart;