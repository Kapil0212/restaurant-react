import Input from '../../UI/Input';
import  classes from './MealItemForm.module.css';
import { useContext, useRef } from 'react';
import CartContext from '../../../store/cart-context';

const MealItemForm = (props) => {
    const cartCtx = useContext(CartContext);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        cartCtx.addItem({
           id: props.id,
           name: props.name,
           amount: enteredAmountNumber,
           price: props.price
    });
};

    return (
         <form className={classes.form} onSubmit={submitHandler}>
        <Input  
            ref={amountInputRef}
            label="Amount"
            input={{ id: 'amount' ,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }} />

        <button type="submit">+ Add</button>
    </form>
    );
};
    export default MealItemForm;