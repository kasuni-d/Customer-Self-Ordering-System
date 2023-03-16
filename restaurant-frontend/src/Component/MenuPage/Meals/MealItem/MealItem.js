import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';
import foodimage from '../../../Images/food.jpg';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `Rs ${props.price.toFixed(2)}`;

  const addToCartHandler = quantity => {
    cartCtx.addItem({
      mealId: props.id,
      mealName: props.name,
      quantity: quantity,
      amount: props.price
    });
  };

  return (
    <ul className={classes.meal}>
      <div className={classes.foodimg}>
      <img src={foodimage}  alt='food' />
      </div>
      
      <li className={classes.meal1}>
      <div className={classes.desc}>
        <h4>{props.name}</h4>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      </li>
      
      <div className={classes.qntform}>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
      
    </ul>
  );
};

export default MealItem;
