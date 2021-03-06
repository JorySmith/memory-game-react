import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

// Styles
import './App.css';

// Track if matched, if so, card won't flip back over
const cardImage = [
  { "src": "./img/helmet-1.png", matched: false },
  { "src": "./img/potion-1.png", matched: false },
  { "src": "./img/ring-1.png", matched: false },
  { "src": "./img/scroll-1.png", matched: false },
  { "src": "./img/shield-1.png", matched: false },
  { "src": "./img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  
  // Shuffle cards and assign a unique id to each card
  // Track state of cards and user turns
  const shuffleCards = () => {
    const shuffledCards = [...cardImage, ...cardImage]
      .sort(() => Math.random() - .5)
      .map((card) => ({...card, id: Math.random()})) // add to each card object an uid

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)

  }

  // Handle a card choice
  const handleChoice = (card) => {
    // If choiceOne already picked, update choiceTwo
    // Otherwise, update choiceOne
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) // these updates take time, they're scheduled

    // Don't check state of choiceOne and Two here
    // A check here will run before state has been updated    
  }

  // useEffect to track updates to choiceOne and Two
  // useEffect runs when component mounts, then again if any dependencies change
  useEffect(() => {    
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        // Return matched cards 'matched' property changed to true
        // Update previous card state
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true} // return updated card obj
            } else {
              return card // just return the card ojb as is
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => {
          resetTurn()
        }, 1000)
        
      }            
    }
  }, [choiceOne, choiceTwo])  

  // After choosing 2 cards, reset cards and increment prevTurns value
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // Start a fresh new game on initial page load
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className='App'>
      <h1>Classic Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      {/* When mapping and returning HTML tags, each item needs a unique key */}
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled} />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
