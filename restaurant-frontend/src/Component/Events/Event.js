import React, { Fragment } from 'react'
import { Nav } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import "../Events/Events.css";
// import Footer from '../Footer/Footer';
import NavbarComp from '../Navbar/NavbarComp';
import mealsImg from '../Images/EventsImages/event1.png';
import mealsImg2 from '../Images/EventsImages/event2.jpg';
import mealsImg3 from '../Images/EventsImages/event3.jpg';
import mealsImg4 from '../Images/EventsImages/event4.jpg';
import mealsImg5 from '../Images/EventsImages/event5.jpg';
import EventCard from './EventCard';
import Notification from '../Navbar/Notification';


export default function Event() {
  const loc_storage_order_ID =localStorage.getItem("macfood_order_ID");
  return (
    <Fragment>
      <NavbarComp
        link1="Home"
        link3="Events"
        link4="Login"
        statusButton = {loc_storage_order_ID ?  (<Nav.Link className='bg-brown' as={Link} to="/orderdetails"><Notification/></Nav.Link>): null}/>
      <div className='withoutNavbar'>
      <div className="containerr text-center pb-4">
        <div className="slide">
          <div className="card-box">
            <EventCard eventName='Food Fiesta' venue='At Dehivala' date='20th march' eventImage={mealsImg}/>
            <EventCard eventName='Food Fiesta' venue='At Kadana' date='16th april' eventImage={mealsImg4}/>
            <EventCard eventName='Food Fiesta' venue='At Colombo' date='30th June' eventImage={mealsImg2}/>
            <EventCard eventName='Food Fiesta' venue='At Camble park' date='1st July' eventImage={mealsImg3}/>
            <EventCard eventName='Food Fiesta' venue='At Dehivala' date='21th September' eventImage={mealsImg5}/>
          </div>
        </div>
      </div>
      </div>
 
    </Fragment>
  )
}
