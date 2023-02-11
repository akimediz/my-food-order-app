import React, {Fragment} from 'react';
import classes from  "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from './HeaderCartButton';

const Header = ({showCart}) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton showCart={showCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A pic of Meals'/>

      </div>
    </Fragment>
  )
}

export default Header
