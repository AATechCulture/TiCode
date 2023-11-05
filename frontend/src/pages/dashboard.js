import React from 'react';
import { useState, useEffect } from 'react';
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
    const [messages, setMessages] = useState([]);
    const [conversationLog, setConversationLog] = useState([]);
    const [listening, setListening] = useState(false); // Initialize listening to false
    let recognitionTimer = null;


    useEffect(() => {
        if (listening) {
            startRecognition();
            //main.classList.add("speaking");
            var player = document.getElementById('music')
            player.classList.toggle('paused')
            $('.rotating-border').css('animation-play-state', 'running');

        } 
        if(!listening) {
            var player = document.getElementById('music')
            player.classList.toggle('paused')
            $('.rotating-border').css('animation-play-state', 'paused');
            clearTimeout(recognitionTimer); // Clear the timer when listening stops


        }
    }, [listening])

    function startRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onstart = () => {
            const utterance = new SpeechSynthesisUtterance('Yes?');
            speechSynthesis.speak(utterance);
        }

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;

            // Check for keywords and provide responses
            let response = '';

            if (transcript.toLowerCase().includes('checked in')) {
                response = "You can check-in online or from the app starting 24 hours before and up to 45 minutes before departure. To check-in and check bags at the airport, you must be there a certain amount of time before the scheduled departure. If it's within the U.S., it's 45 minutes, and outside the U.S. is 60 minutes.";
            } else if (transcript.toLowerCase().includes('check in online')) {
                response = "To check in for your flight online, make sure to visit your airline's website as soon as 24 hours prior to the departure of your first flight. Use the confirmation number in your online account to check in. You will also be able to view your seats and, if permitted by the airlines, confirm your seating preferences.";
            } else if (transcript.toLowerCase().includes('boarding pass')) {
                response = "A boarding pass is a document provided by an airline during check-in, giving a passenger permission to board the airplane for a particular flight. At a minimum, it identifies the passenger, the flight number, and the date and scheduled time for departure. Boarding Passes are always required to board a flight.";
            } else if (transcript.toLowerCase().includes('thank you')) {
                response = 'You\'re welcome!';
            } else if (transcript.toLowerCase().includes('baggage') || transcript.toLowerCase().includes('bags allowed')) {
                response = "American Airlines passengers are allowed 1 personal item and 1 carry-on bag with no weight limit, as well as checked bags based on fare class - the standard allowance is 2 checked bags at 50 lbs for the first and 70 lbs for the second before oversize and overweight fees apply. There are exceptions to baggage allowances for loyalty program members, military personnel, and credit card holders; Visit American Airlines website for more information on baggage guides and fee charts plus contacts for customer service to answer specific baggage questions.";
            } else if (transcript.toLowerCase().includes('status') || transcript.toLowerCase().includes('upcoming flight')) {
                response = "American Airlines provides real-time flight status information through their website and mobile app. Customers can enter their flight details to pull up the most up-to-date information on their upcoming trip. Status indicators will show if the flight is on schedule or if changes have occurred. Details like new departure times, gates, and delay length will be provided.";
            } else if (transcript.toLowerCase().includes('canceled') || transcript.toLowerCase().includes('rescheduled') || transcript.toLowerCase().includes('late')) {
                response = "We know your time is valuable, and we’ll do our best to get you back on track as soon as possible. If your flight is canceled or a delay causes you to miss your connection, we’ll rebook you on the next flight with available seats. We will reroute your bags automatically when you check in for your new flights. To view your new trip or to choose a different flight download and open the American app, search aa.com, or use a kiosk in the airport.";
            } else {
                response = `I heard you say ${transcript}.`;
            }

            const utterance = new SpeechSynthesisUtterance(response);
            speechSynthesis.speak(utterance);

            setMessages(prev => [...prev, transcript]);
            setConversationLog(prevLog => [
                `You: ${transcript}`,
                `Soar: ${response}`,
                ...prevLog, // Prepend the new conversation to the top
            ]);
        }

        recognition.onend = () => {
            if (listening) {
                const utterance = new SpeechSynthesisUtterance('Let me know when you have another question!');
                speechSynthesis.speak(utterance);
            }
        }

        if (listening) {
            recognition.start();
        }
    }

    function handleListen() {
        setListening(!listening); // Toggle listening state
    }

    //SpeechText

    let listeningo = false
    var playSoar = $("#circleSoar")

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
    const clickList = () => {
        listeningo ? stop() : start()
        listeningo = !listeningo
    }

    return (
        <div>
            {/* <SmallNav/> */}

            <Sidebar />
            <div className="dashboard_container">
                <img id='dbbackground' src={dbbg} alt="bg" />
                <div id='SoarButton' className="soar">
                    <div onClick={handleListen} id='circleSoar' class="circle-container">
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
                        <button id="remieClick" class="listening_button" />
                    </div>
                    <div className="line_sec"></div>
                    <div className="speech_text">
                        <div>
                            <ConversationLog log={conversationLog} />
                            {/* <button onClick={handleListen}>Help</button> */}
                        </div>
                    </div>
                    <div className="line_sec"></div>

                </div>
            </div>
        </div>
    );
}
function ConversationLog({ log }) {
    return (
        <div>
            <ul>
                {log.slice(0).reverse().map((message, index) => ( // Reverse the order here
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
}
export default Dashboard;
