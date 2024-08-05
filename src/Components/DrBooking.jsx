import { useContext  } from "react";
import prev from "../Images/back.png"
import next from "../Images/next.png"
import { DateContext } from "./Helper";
export default function DrBooking(){
   
    const {currentDate,setCurrentDate}=useContext(DateContext);
    const presentDate=new Date();

    const formatDate=(date)=>{
         
        console.log(date);
        return date.toISOString().split('T')[0];
    }


    const getWeekday=(date)=>{
        const options={weekday:'short'};
        return date.toLocaleDateString('en-US',options);
    }

 
 
const getFiveDays=()=>{
    const dates=[];
    for(let i=-2;i<2;i++){
        
        const date = new Date(currentDate);
         date.setDate(date.getDate()+i);
         dates.push({
            date:formatDate(date),
           weekday:getWeekday(date), 
         });
        


    }
    return dates;
}

function changeDate(days){
    const newdate=new Date(currentDate);
    setCurrentDate(newdate.setDate(newdate.getDate()+days));
}

function handleClick(e){
    console.log(e.target.value);
}
    return(
         <div className="dhoni">
          
<div>
                {presentDate<currentDate?  <img src={prev} className="changebut" onClick={()=>changeDate(-1)} />:<div></div>}
                </div>
            <div  className="datess"  >
     {
        getFiveDays().map((day,index)=>
            <div key={index} className={`jr ${formatDate(new Date(currentDate)) === day.date ? 'selected' : ''}`} onClick={()=>setCurrentDate(new Date(day.date))}  onSelect={handleClick} >

                 
                <div>{day.weekday}</div>
                <div>{day.date.split('-')[2]}</div>
                </div>
        )
     }
            </div>
           <div>
            <img src={next} className="changebut" onClick={()=>changeDate(1)}/>
            </div>
         </div>
    )
}