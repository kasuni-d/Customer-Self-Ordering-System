import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EmployeeService from '../Services/EmplyeeService'
import editIcon from '../Images/editIcon.png'
import deleteIcon from '../Images/deleteicon.jpg'
import classes from "./Admin.module.css";
import Nav from '../EmployeeNav/Navpage'
import ListMeals from './ListMeals'
import ListComments from './ListComments';
import LogoutModal from '../EmployeeNav/LogoutModal';
import UserCard from '../EmployeeLog/UserCard'



const ListEmployee = () => {

    const [employees, setEmployees] = useState([]);
    const [MsgIsShown, setMsgIsShown] = useState(false);
    // const [roleName, setRoleName] = useState([]);
    const [logEmployee, setLogEmployee] = useState('');
    const { id } = useParams();

    const showCartHandler = () => {
        setMsgIsShown(true);
    };
    const hideMsgHandler = () => {
        setMsgIsShown(false);
    };
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
            EmployeeService.getAllEmployees().then((response) => {
                setEmployees(response.data)

                // console.log(response.data)
            }).catch(error => {
                console.log(error);
            })

        }, 1000);

        return () => clearInterval(interval);



    }, [id])




    const deleteEmployee = (employeeId) => {
        console.log(employeeId)
        EmployeeService.deleteEmployee(employeeId).then((response) => {
            console.log(response.data)
            setMsgIsShown(false);
            // navigate("/admin/" + id)


        }).catch(error => {
            console.log(error);
        })

    }

    return (
        <Fragment>
            <div className={classes.body}>
                <Nav />

                <div className={classes.adminbody}>
                    <br></br>
                    <UserCard
                        Id={logEmployee.employee_id}
                        fName={logEmployee.firstName}
                        lName={logEmployee.lastName}
                        Role={logEmployee.roleName}

                    />
                    <br></br>
                    <br></br>
                    <div className={classes.cont}>
                        <h3 className="text-center">List Of Emplyees</h3>
                        <Link to="/add-employee" id={classes.addbtn} className="addbtn btn btn-primary mb-3">Add Employee</Link>
                        <table id={classes.table} className="table rounded shadow">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Job Role</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employees.map(
                                        employee =>
                                            <tr key={employee.employee_id}>
                                                <td data-label="ID">{employee.employee_id}</td>
                                                <td data-label="First Name">{employee.firstName}</td>
                                                <td data-label="Last Name">{employee.lastName}</td>
                                                <td data-label="Job Role">{employee.roleName}</td>
                                                <td data-label="Phone Number">{employee.phone_no}</td>
                                                <td data-label="Address">{employee.address}</td>
                                                <td data-label="Actions">
                                                    <div>
                                                        <Link to={`/edit-employee/${employee.employee_id}`}><img src={editIcon} className={classes.editIcon} alt='edit' /></Link>
                                                        <Link onClick={showCartHandler}><img src={deleteIcon} className={classes.editIcon} alt='edit' /></Link>
                                                        {MsgIsShown && <LogoutModal onClose={hideMsgHandler}>
                                                            <div className="message">
                                                                <span>Are sure you want to delete employee ?</span>
                                                            </div>
                                                            <div className="close">
                                                                <button className='button--alt' onClick={() => deleteEmployee(employee.employee_id)}>
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

                    <ListMeals />
                    <ListComments />
                </div>

            </div>
        </Fragment>
    )
}

export default ListEmployee