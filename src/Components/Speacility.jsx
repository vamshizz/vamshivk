import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
 
export default function Speacility() {
    const navigate=useNavigate();
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/depdetails")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setDepartments(data.depdetails);
            })
            .catch(error => {
                console.error("Error fetching department details:", error);
            });
    }, []);
function handClick(deptno){
    navigate(`/doclist/${deptno}`);
}
    console.log(departments);
    return (
        <div>
            <h1>Specality:</h1>
            <div className="specialgrid">
                {departments.map(d => (
                    <div key={d._id} className="doctorspec" onClick={()=>handClick(d._id)} >
                        <Link to={`/doclist/${d.deptno}`}/>
                        <h2>{d.deptname}</h2>
                        {d.imageUrl && <img src={d.imageUrl} alt={d.deptname} />}
                        
                    </div>
                ))}
            </div>
        </div>
    );
}
