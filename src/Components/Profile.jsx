import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MaleDoc from "../Images/mdoc.png";
import FemaleDoc from "../Images/femaledoc1.png";
import Timed from './Timed';

export default function Profile() {
  const { DoctorId } = useParams();
  const [emp, setEmp] = useState(null); // Start with null

 

  useEffect(() => {
  

    fetch(`http://localhost:4000/empfetch/${DoctorId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data && data.doctor) {
          setEmp(data.doctor);
        } else {
          console.error("No doctor data found:", data);
          setEmp([]);
        }
      })
      .catch(error => {
        console.error("Error fetching doctor list:", error);
        setEmp([]);
      });
  }, [DoctorId]);

  if (emp === null) {
    return <div className="card">Loading...</div>;
  }

  return (
    <div>
      {emp.map(e => (
        <div key={e._id} className="card">
          <div className="docimage">
            {e.gender === 'Male' ? <img src={MaleDoc} alt="Male Doctor" /> : <img src={FemaleDoc} alt="Female Doctor" />}
            <h3>{e.empname}</h3>
          </div>
          <div>
            <p>{e.empdegree.join(', ')}</p>
            <p>{e.emplanguage.join(', ')}</p>
            <p>{e.experience} years experience overall</p>
            <p>{e.emplocation}</p>
          </div>
        </div>
      ))}
      
    </div>
  );
}
