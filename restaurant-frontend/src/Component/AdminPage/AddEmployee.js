import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../Services/EmplyeeService';


export const AddEmployee = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [job_role, setJobRole] = useState('')
    const [address, setAddress] = useState('')
    const [phone_no, setPhoneNo] = useState('')
    const navigate = useNavigate();
    const { id } = useParams();

    // perform both save and update employee details
    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        const employee = { firstName, lastName, email, password, job_role, address, phone_no }

        // if id contains value make update employee REST API
        if (id) {
            EmployeeService.updateEmployee(id, employee).then((response) => {
                navigate('/admin')
            }).catch(error => {
                console.log(error)
            })
        }

        else {
            
            EmployeeService.createEmployee(employee).then((response) => {
                console.log(response.data)
                navigate('/admin');

            }).catch(error => {
                console.log(error)
            })

        }

    }
    //useEffect used to display info in interface
    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((response) => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setPassword(response.data.password);
            setJobRole(response.data.job_role);
            setAddress(response.data.address);
            setPhoneNo(response.data.phone_no);
        }).catch(error => {
            console.log(error)
        })
    }, [id])

    const buttonSubmitOrUpdate = () => {
        if (id) {
            return <button className="btn btn-success" onClick={(e) => saveOrUpdateEmployee(e)} >Update </button>
        }
        else {
            return <button className="btn btn-success" onClick={(e) => saveOrUpdateEmployee(e)} >Submit </button>
        }
    }

    const title = () => {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        }
        else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }
    return (
        <div>
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-8 offset-md-2 offset-md-2">
                        {
                            title()
                        }

                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label"> First Name :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Last Name :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Email :</label>
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Password :</label>
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        name="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Job Role :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter job role"
                                        name="jon_role"
                                        className="form-control"
                                        value={job_role}
                                        onChange={(e) => setJobRole(e.target.value)}
                                        required
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Address :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Address"
                                        name="address"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Phone No :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter phone number"
                                        name="phoneNo"
                                        className="form-control"
                                        value={phone_no}
                                        onChange={(e) => setPhoneNo(e.target.value)}

                                    >
                                    </input>
                                </div>

                                {
                                    buttonSubmitOrUpdate()
                                }
                                <Link to="/admin" className="canclebtn btn btn-danger mx-3"> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AddEmployee;
