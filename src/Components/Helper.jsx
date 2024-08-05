import { createContext, useState } from "react"
import DrBooking from "./DrBooking";
import Timed from "./Timed";
const DateContext=createContext();
export default function Helper({children}){
    
    const    [currentDate,setCurrentDate]=useState(new Date());
    const [CurrentTime, setCurrentTime] = useState(null);

    console.log(currentDate);
    console.log(CurrentTime);
    return(
        <DateContext.Provider value={{currentDate,setCurrentDate, CurrentTime, setCurrentTime}}>
        {children}
        </DateContext.Provider>
    )
}

 export {DateContext}