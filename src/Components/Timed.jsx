import React, { useContext, useEffect, useState } from 'react';
import { DateContext } from './Helper'; // Adjust this import based on your file structure
 import { AuthContext } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Timed = () => {
   console.log(DateContext);
   const [information,setInformation]=useState([]);
  const { CurrentTime, setCurrentTime, currentDate, setCurrentDate } = useContext(DateContext);
  const { DoctorId} = useParams();
 const {authState}=useContext(AuthContext);
  
 const patientId=authState.user._id;
 console.log(patientId);
  const navigate = useNavigate();

  useEffect(() => {
    setBookedSlots([]);
    setCurrentTime(new Date());
  }, [currentDate]);

  const startTime = new Date();
  startTime.setHours(10, 0, 0, 0);

  const endTime = new Date();
  endTime.setHours(18, 30, 0, 0);

  const [bookedSlots, setBookedSlots] = useState([]);

  const interval = 15;
  const timeSlots = generateTimeSlots(startTime, endTime, interval);

  const morning = [];
  const afternoon = [];

  timeSlots.forEach(slot => {
    const [hours, period] = slot.split(/[: ]/);
    if (parseInt(hours, 10) < 12 && period === 'AM') {
      morning.push(slot);
    } else {
      afternoon.push(slot);
    }
  });
   
  const handleBooking = async (e) => {
    if (!authState.token) {
      navigate('/login');
    } else {
      console.log("hello booking")
       const res=await fetch('http://localhost:4000/booking',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body: JSON.stringify({
          DoctorId,
          patientId,  
          currentDate,
          CurrentTime
        })

       })

       if (res.ok) {
        const json = await res.json();
        console.log(json);
      } else {
        console.error('Booking failed:', res.statusText);
      }
    }
  };

  useEffect(()=>{
    const fetchBookedSlots = async () => {
      const res = await fetch(`http://localhost:4000/bookedSlots/${DoctorId} `);
      const data = await res.json();
      console.log(data.slots)
      setInformation(data.slots);
      console.log(information)
    }

    if (DoctorId && currentDate) {
      fetchBookedSlots();
    }
  },[DoctorId,currentDate] )

 
useEffect(()=>{
  const filteredSlots = information.filter(slot => new Date(slot.Date).toISOString().split('T')[0] === new Date(currentDate).toISOString().split('T')[0]);
    
  console.log(filteredSlots)
  
  setBookedSlots(filteredSlots.map(f => {
    console.log('Slot Time:', f.Time);  
    return f.Time;
  }));
},[currentDate,information])
  
  return (
    <div>
      <div className='slots'>
        <h3>Time Slots</h3>
        <h3>Morning:</h3>
        <div className='grid1'>
          {morning.map((slot, index) => (
            <div
              key={index}
              className={`timeslot ${CurrentTime === slot ? 'selected' : ''}${bookedSlots.includes(slot) ? ' disabled' : ''}`}
              onClick={() => setCurrentTime(slot)}
            >
              {slot}
            </div>
          ))}
        </div>
        <h3>Afternoon:</h3>
        <div className='grid1'>
          {afternoon.map((slot, index) => (
            <div
              key={index}
              className={`timeslot ${CurrentTime === slot ? 'selected' : ''}${bookedSlots.includes(slot) ? ' disabled' : ''}`}
              onClick={() => setCurrentTime(slot)}
            >
              {slot}
            </div>
          ))}
        </div>
      </div>
      <button className="aptbtn" onClick={handleBooking} >Appointment Booking</button>
    </div>
  );
};

const generateTimeSlots = (startTime, endTime, interval) => {
  const slots = [];
  let current = new Date(startTime);

  while (current <= endTime) {
    slots.push(current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    current = new Date(current.getTime() + interval * 60000);
  }

  return slots;
};

export default Timed;
