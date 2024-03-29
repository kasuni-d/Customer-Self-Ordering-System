import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import OrderService from "../Services/OrderService";
import EmployeeService from "../Services/EmplyeeService";
import classes from "./CookPage.module.css";
import Card1 from "./Card1";
import UserCard from "../EmployeeLog/UserCard";

const ListPendingMeals = () => {
  const [logEmployee, setLogEmployee] = useState('');
  const { id } = useParams();
  // const mockPendingMeals = [
  //   {
  //     meal: "MacFoods Special",
  //     time: "8.30 PM",
  //     orderId: "EM-2345",
  //     table: "5",
  //   },
  //   {
  //     meal: "Cheese & Chiken Kottu",
  //     time: "8.25 PM",
  //     orderId: "EM-2745",
  //     table: "5",
  //   },
  //   {
  //     meal: "Fried Rice",
  //     time: "8.20 PM",
  //     orderId: "EM-2895",
  //     table: "5",
  //   },
  //   {
  //     meal: "Veg Burger",
  //     time: "8.15 PM",
  //     orderId: "EM-2520",
  //     table: "5",
  //   },
  // ];
  // const mockAcceptedMeals = [
  //   {
  //     meal: "MacFoods Special",
  //     time: "8.10 PM",
  //     orderId: "EM-2185",
  //     table: "5",
  //   },
  // ];
  const [pendingMeals, setPendingMeals] = useState([]);
  const [acceptedMeals, setAcceptedMeals] = useState([]);
  const [readyMeals, setReadyMeals] = useState([]);


  useEffect(() => {

    if (id) {
      EmployeeService.getEmployeeById(id).then((response) => {
        setLogEmployee(response.data)

        // console.log(response.data)
      }).catch(error => {
        console.log(error);
      })
    }
    const interval = setInterval(() => {
      OrderService.getAllPendingOrders()
        .then((response) => {
          setPendingMeals(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      OrderService.getAllAcceptedOrders(id)
        .then((response) => {
          setAcceptedMeals(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }, 1000);

    return () => clearInterval(interval);


    // database access to get pending meals and accepted meals for a specific cook
    // using the response "pendingMeals" and accepted meals should be update
    // setPendingMeals(mockPendingMeals);
    // setAcceptedMeals(mockAcceptedMeals);
  }, [id]);

  const onAccept = (e, orderId) => {
    e.preventDefault();



    OrderService.changeOrderStatus(orderId, { status: "accepted" }, id).then((response) => {
      console.log(response.data)
    }).catch(error => {
      console.log(error.response.data)
    });



  };

  const onDone = (e, orderId) => {
    e.preventDefault();

    const readyMeal = acceptedMeals.filter((meal) => {
      return meal.order_id === orderId;
    });
    /*This should be changed from the database access only for demo*/
    const newAcceptedMeals = acceptedMeals.filter((meal) => {
      return meal.orderId !== orderId;
    }); // return a array of meals which haven't order id of orderId

    OrderService.changeOrderStatus(orderId, { status: "ready" }, id).then((response) => {
      console.log(response.data)
    }).catch(error => {
      console.log(error.response.data)
    });
    const newReadyMeals = [...readyMeals, readyMeal[0]]; // add accepted meals to existing accepted meal list

    setAcceptedMeals(newAcceptedMeals);
    setReadyMeals(newReadyMeals);

  };

  return (
    <Fragment>

      <div className={classes.cardbodycont}>
        <br></br>
        <UserCard
          Id={logEmployee.employee_id}
          fName={logEmployee.firstName}
          lName={logEmployee.lastName}
          Role={logEmployee.roleName}

        />
        <div className={classes.cardbody}>
          <br></br>
          <div className={classes.cardinner}>
            <h2 style={{ paddingBottom: "5px" }}>Pending Orders</h2>
            <div className={classes.doubleinner}>
              {pendingMeals.length === 0 ? (
                <div
                  className="card-details"
                  style={{ textAlign: "center", marginTop: "165px" }}
                >
                  <h2
                    style={{
                      fontFamily: "'Kaushan Script', cursive",
                      color: "#8a2b06",
                    }}
                  >
                    No Pending Orders
                  </h2>
                </div>
              ) : (
                pendingMeals.map((meal) => (
                  <Card1
                    mealDetails={meal}
                    buttonName={"Accept"}
                    onClickFunction={onAccept}
                    key={meal.order_id}
                  />
                ))
              )}
            </div>
          </div>
          <div className={classes.cardinner}>
            <h2 style={{ paddingBottom: "5px" }}>Accepted Orders</h2>
            <div className={classes.doubleinner}>
              {acceptedMeals.length === 0 ? (
                <div
                  className="card-details"
                  style={{ textAlign: "center", marginTop: "165px" }}
                >
                  <h2
                    style={{
                      fontFamily: "'Kaushan Script', cursive",
                      color: "#8a2b06",
                    }}
                  >
                    No Accepted Orders
                  </h2>
                </div>
              ) : (acceptedMeals.map((meal) => (
                <Card1
                  mealDetails={meal}
                  buttonName={"Done"}
                  onClickFunction={onDone}
                  key={meal.order_id}
                />
              ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListPendingMeals;
