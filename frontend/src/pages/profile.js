import React from 'react';
import Sidebar from '../components/sidebar';
//css
import '../css/profile.css'
import '../css/variables.css'

//images
import planebg from '../images/plane.jpeg'
import profBg from '../images/profbg.png'

const Profile = () => {
    return (
        <div>
        <Sidebar />
        <div className="profile_container">
                <img id='pbackground' src={planebg} alt="bg" />
                <div className="profile">
                    <img src={profBg} alt="profBG" />
                    <div className="prof_content">
                    <h1 className='profTitle'>Profile</h1>
                    <div className="prof_col">
                    <div className="prOne">
                        <div className="coro">
                        <p className="inq">0</p>
                        <p className="inq_text">SOAR Inquries</p>
                        </div>
                        <div className="cort">
                        <p className="up">0</p>
                        <p className="up_text">UpComing Flights</p>
                        </div>
                    </div>
                    <div className="prTwo">
                    <p className="field_one">AA #</p>
                    <p className="field_two">Name</p>
                    <p className="field_three">Email</p>
                    <button>Log Out</button>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
