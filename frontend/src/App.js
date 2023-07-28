import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

let sessionId = uuidv4();

const App = () => {
  const [deck, setDeck] = useState({});
  const [chatInput, setChatInput] = useState("");
  const [deckInput, setDeckInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleChatInputChange = (event) => {
    setChatInput(event.target.value);
  };

  const handleChatEntry = async () => {
    // Send the chatInput to the backend server
    try {
      const response = await axios.post("http://localhost:3001/chat", {
        prompt: chatInput,
        sessionId,
        deck,
      });
      const aiReply = response.data;

      // Update your chat history here. You might have to modify this part based on how you manage chat history
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { from: "user", text: chatInput },
        { from: "bot", text: aiReply },
      ]);

      // After confirming and getting a response, clear the input box
      setChatInput("");
    } catch (error) {
      console.error("Error while sending message to the server: ", error);
    }
  };

  const handleDeckInputChange = (event) => {
    setDeckInput(event.target.value);
  };

  const handleDeckEntry = () => {
    const fetchDeck = async (deckId) => {
      try {
        let url = `https://arkhamdb.com/api/public/deck/${deckId}`;
        const deckResponse = await fetch(url);
        const deckData = await deckResponse.json();
        const deckCards = Object.entries(deckData.slots);
        const investigator = deckData.investigator_name;

        const cardPromises = deckCards.map(async ([cardId, quantity]) => {
          const cardResponse = await fetch(
            `https://arkhamdb.com/api/public/card/${cardId}`
          );
          const cardData = await cardResponse.json();
          return {
            name: cardData.name,
            type: cardData.type_name,
            quantity: quantity,
            level: cardData.xp,
          };
        });

        const cards = await Promise.all(cardPromises);
        setDeck({ investigator, cards });
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeck(deckInput);

    setDeckInput("");
  };

  return (
    <div className="App">
      <div className="deck-section">
        <div className="deck-input">
          <input
            type="text"
            placeholder="Enter Deck ID"
            value={deckInput} // Set the value to the chatInput state
            onChange={handleDeckInputChange} // Set onChange to handleInputChange
          />
          <button onClick={handleDeckEntry}>Confirm</button>
        </div>
        <div className="deck-info">
          <h2>Deck Information</h2>
          {/* Display deck info here. If deck is an array of objects, you may need to map over the array */}
          <p>{JSON.stringify(deck, null, 2)}</p>
        </div>
      </div>

      {/* Chat section */}
      <div className="chat-section">
        {/* Chat history */}
        <div className="chat-history">
          <h2>Chat History</h2>
          {/* Display chat history here. If chatHistory is an array of objects, you may need to map over the array */}
          {chatHistory.map((chat, index) => (
            <p key={index}>{JSON.stringify(chat)}</p>
          ))}
          {/* {chatHistory} */}
        </div>

        {/* Chat input */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your question..."
            value={chatInput} // Set the value to the chatInput state
            onChange={handleChatInputChange} // Set onChange to handleInputChange
          />
          <button onClick={handleChatEntry}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default App;
