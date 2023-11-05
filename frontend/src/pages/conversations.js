import React from 'react';
import Sidebar from '../components/sidebar';

//css
import '../css/convo.css'
import '../css/variables.css'

//images
import dbbg from '../images/plane.jpeg'
import ifEmpty from '../images/ask.png'
const Conversations = () => {
    return (
        <div>
            <Sidebar />
            
            <div className="convo_container">
                <img id='cvbackground' src={dbbg} alt="bg" />

                <div class="convo_card">
                    <div class="you_ask">
                        <p class="y_text">YOU:</p>
                        <p class="y_text_output">TBA</p>
                    </div>
                    <div class="response_soar">
                        <p class="r_text">SOAR:</p>
                        <p class="r_text_output">TBA</p>
                    </div>
                </div>
            </div>
            <img id='ifEmpty' src={ifEmpty} alt="notice" />

        </div>
    );
}

export default Conversations;
