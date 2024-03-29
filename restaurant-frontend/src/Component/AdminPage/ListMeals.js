import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MealService from '../Services/MealService'
import editIcon from '../Images/editIcon.png'
import deleteIcon from '../Images/deleteicon.jpg'
import classes from "../AdminPage/Admin.module.css";
import LogoutModal from '../EmployeeNav/LogoutModal';

const ListMeals = () => {

    const [meals, setMeals] = useState([])
    const [MsgIsShown, setMsgIsShown] = useState(false);
    const showCartHandler = () => {
        setMsgIsShown(true);
    };
    const hideMsgHandler = () => {
        setMsgIsShown(false);
    };
    useEffect(() => {

        const interval = setInterval(() => {
            MealService.getAllMeals().then((response) => {
                setMeals(response.data)
                // console.log(response.data)
            }).catch(error => {
                console.log(error);
            })
    
          }, 1000);
      
          return () => clearInterval(interval);
        
    }, [])

    const deleteMeal = (mealId) => {
        MealService.deleteMeal(mealId).then((response) => {
            console.log(response.data)
            setMsgIsShown(false);
            // navigate("/admin/" + id)

           
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <Fragment>
            
            <br></br><br></br>
                <div className={classes.cont}>
                    <h3 className="text-center">List Of Meals</h3>
                    <Link to="/add-meal" id={classes.addbtn} className="addbtn btn btn-primary mb-3">Add New Meal</Link>
                    <table id ={classes.table} className="table rounded shadow">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Meal Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                meals.map(
                                    meals =>
                                        <tr key={meals.meal_id}>
                                            <td data-label="ID">{meals.meal_id}</td>
                                            <td data-label="Meal Name">{meals.mealName}</td>
                                            <td data-label="Category">{meals.category}</td>
                                            <td data-label="price">{meals.price}</td>
                                            <td data-label="description">{meals.description}</td>
                        
                                            <td data-label="Actions">
                                                <div>
                                                    <Link to={`/edit-meal/${meals.meal_id}`}><img src={editIcon} className={classes.editIcon} alt='edit' /></Link>
                                                    <Link onClick={showCartHandler}><img src={deleteIcon} className={classes.editIcon}  alt='edit' /></Link>
                                                    {MsgIsShown && <LogoutModal onClose={hideMsgHandler}>
                                                            <div className="message">
                                                                <span>Are sure you want to delete meal ?</span>
                                                            </div>
                                                            <div className="close">
                                                                <button className='button--alt' onClick={() => deleteMeal(meals.meal_id)}>
                                                                    Yes
                                                                </button>
                                                                <button className='button' onClick={hideMsgHandler}>No</button>
                                                            </div>
                                                        </LogoutModal>}
                                                </div>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
                <br></br><br></br>
        </Fragment>
    )
}

export default ListMeals;