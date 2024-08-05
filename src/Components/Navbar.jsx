import logo from "../Images/dr.png"
export default function Navbar(){
    return(
        <div className="navbaar">
            <nav>
                <img src={logo}/>
                <h2>Appoitment Booking</h2>
            </nav>
        </div>
    )
}