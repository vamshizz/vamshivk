import Calnder from "./Calnder";
import DrBooking from "./DrBooking";
import Profile from "./Profile";
import { useParams} from "react-router-dom"
import Timed from "./Timed";
export default function Details(){
    return(
        <div className="kindha">
            <Profile/>
             <Calnder/>
            
        </div>
    )
}