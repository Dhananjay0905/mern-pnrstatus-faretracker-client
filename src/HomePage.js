import React from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return(
        <div className='home'>
            <Link to="/fare"><button id="btn1" className='homebtn'>Check fare for<br></br>any train</button></Link>
            <Link to="/pnr"><button id="btn2" className='homebtn'>Check PNR status</button></Link>
        </div>
    )
}

export default HomePage;