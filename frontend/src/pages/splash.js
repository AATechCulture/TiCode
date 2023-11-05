import React from 'react';
import { useNavigate } from 'react-router-dom';
//css
import '../css/splash.css'
import planeGif from '../images/planegif.gif'
const Splash = () => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        // Use the `navigate` function to redirect to the desired page
        navigate('/Dashboard'); // Replace '/Dashboard' with the path to your target page
      };
    return (
        <div>
            <div className="welc_container">
            <img src={planeGif} alt="" />
                <h1 className="fade-in">Skip Lines And Save Time With SOAR</h1>
                <div className="text-slide">
                    <div>SOAR WILL </div>
                    <div className="text-wrap">
                        <div className="text">
                            <span>Assist</span>
                            <span>Save Time</span>
                            <span>Listen</span>
                        </div>
                    </div>
                </div>
                <a className='bounce'>
                    <button className="welcome_btn" onClick={handleButtonClick}>Get Started</button>
                </a>
            </div>
        </div>
    );
}

export default Splash;
