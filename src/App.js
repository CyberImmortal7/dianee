import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./App.css";

function App() {
  const [isAnswered, setIsAnswered] = useState(false);
  const [response, setResponse] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  // Countdown Timer Logic
  useEffect(() => {
    const valentineDate = new Date("2025-02-14T00:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const difference = valentineDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleYes = () => {
    new Audio("/assets/yes.mp3").play(); // Corrected path
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
    setResponse("Yeboooo! ❤️");
    setIsAnswered(true);
    setIsModalOpen(true); // Open the modal when Yes is clicked
  };

  const handleNo = () => {
    new Audio("/assets/no.mp3").play(); // Corrected path
    confetti({
      particleCount: 80,
      spread: 50,
      origin: { y: 0.6 },
    });
    setResponse("No 😢");
    setIsAnswered(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="valentine-container">
      {/* Floating Hearts */}
      <div className="hearts-container">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="heart"></div>
        ))}
      </div>

      {/* Envelope Animation */}
      <div className={`envelope ${isAnswered ? "opened" : ""}`}>
        <div className="card">
          {/* Image of Diane */}
          <div className="diane-image">
            <img src="/assets/diane2.JPG" alt="Diane" className="rounded-image" />
          </div>

          <h2 className="countdown">Deadline: {timeLeft}</h2>
          <h1 className="title">Hi Diane,</h1>
          <p className="message">Will you be my Valentine? 💖</p>

          {!isAnswered ? (
            <div className="buttons">
              <button className="yes-button" onClick={handleYes}>
                Yes
              </button>
              <button className="no-button" onClick={handleNo}>
                No
              </button>
            </div>
          ) : (
            <>
              <p className="response">{response}</p>
              {/* Love Meter */}
              <div className="love-meter-container">
                <div className="love-meter" style={{ width: isAnswered ? "100%" : "0%" }}></div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Popup Modal for Yes */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>×</span>
            <h2>ACTIVVV 🎉</h2>
            <div className="modal-images">
              <img src="/assets/diane1.jpg" alt="Love Image 1" className="modal-image" />
              <br/>
              <img src="/assets/dianeee.JPG" alt="Love Image 2" className="modal-image" />
              <br/>
              <img src="/assets/diane6.JPG" alt="Love Image 3" className="modal-image" />
              <br/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
