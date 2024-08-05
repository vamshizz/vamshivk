import { useEffect, useState } from "react";
import { useParams} from "react-router-dom"
import MaleDoc from "../Images/mdoc.png";
import FemaleDoc from "../Images/femaledoc1.png";
import { useNavigate } from "react-router-dom";
export default function DocList(){
    const[doctors,setDoctors]=useState();
   const {departmentID}=useParams();
 console.log(departmentID)
const navigate=useNavigate();
 useEffect(()=>{
    fetch(`http://localhost:4000/empdetails/${departmentID}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setDoctors(data.empdet);
    })
    .catch(error => {
      console.error("Error fetching doctor list:", error);
    });
}, [departmentID]);
 console.log(doctors)
 if (!doctors) {
  return <div>Loading...</div>;
}
return(
    <div>

         <div className="docgrid">
         
{doctors.map(d=>(
  
  <div key={d._id} className="doclist">
    <div className="docimage">
    {d.gender==='Male'?<img  src={MaleDoc}/>:<img src={FemaleDoc}/>}
    <h3>{d.empname}</h3>
    </div>
   
   <div>
   
   <p>{d.empdegree.join(', ')}</p>
    <p>{d.emplanguage.join(', ')}</p>
    <p>{d. experience} years experience overall</p>
    <p>{d.emplocation}</p>
    <hr className="separator" />
    <button className="bookButton" onClick={()=>navigate(`/appoitment/${d._id}`)} >Book Appointment</button>

   </div>
   </div>
  
))}
         </div>
    </div>
)
}