import React, { useEffect, useState } from "react"
import './App.css';

const App = () => {
  const [deck, setDeck] = useState([])
  let deckId = '';
  let url = '';
  let cardList = '';



  useEffect(() => {
    const fetchDeckData = () => {
      deckId = 3028414;
      url = `https://arkhamdb.com/api/public/deck/${deckId}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          cardList = {};
          Object.keys(data.slots).forEach((key) => {
            fetch(`https://arkhamdb.com/api/public/card/${key}`)
              .then(response => response.json())
              .then(data => {
                cardList[data.name] = data.slots[key]
              })
          });
          return "data";
        })
        .then(data => {
          setDeck(data)
        })
    }

    fetchDeckData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {deck}
          {/* {JSON.string?ify(deck)} */}
        </p>
      </header>
    </div>
  );
}

export default App;
