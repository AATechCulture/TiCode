import React from 'react';
import Sidebar from '../components/sidebar';

//css
import '../css/dashboard.css'
import '../css/variables.css'

//images
import dbbg from '../images/sky.png'
import Soar from '../images/Soart.png'
import $ from "jquery";
import SmallNav from '../components/smallnavigation'

const Dashboard = () => {
        //const button = document.getElementById('SoarButton')
        let listening = false
        var playSoar  = $("#circleSoar")

        const stop = () => {
            //button.textContent = "Start listening";
            var player = document.getElementById('music')
            player.classList.toggle('paused')
            $('.rotating-border').css('animation-play-state', 'paused');

          }
           
          const start = () => {
            //main.classList.add("speaking");
            var player = document.getElementById('music')
            player.classList.toggle('paused')
            $('.rotating-border').css('animation-play-state', 'running');

          }
          const clickList = () =>{
            listening ? stop() : start()
            listening = !listening
          }
    
    return (
        <div>
            {/* <SmallNav/> */}

            <Sidebar />
            <div className="dashboard_container">
                <img id='dbbackground' src={dbbg} alt="bg" />
                <div id='SoarButton' className="soar">
                    <div onClick={clickList} id='circleSoar' class="circle-container">
                        <img id='soarName' src={Soar} alt="soar" />
                        <div class="rotating-border">
                            <div class="circling-circle"></div>
                            <div id="plane"></div>
                        </div>
                    </div>
                </div>
                <div className="soar_text">
                    <div className="listen">
                            <div class="now playing" id="music">
                                <span class="bar n1">A</span>
                                <span class="bar n2">B</span>
                                <span class="bar n3">c</span>
                                <span class="bar n4">D</span>
                                <span class="bar n5">E</span>
                                <span class="bar n6">F</span>
                                <span class="bar n7">G</span>
                                <span class="bar n8">H</span>
                            </div>
                            <button id="remieClick" class="listening_button"/>
                    </div>
                    <div className="line_sec"></div>
                    <div className="speech_text"></div>
                    <div className="line_sec"></div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;
