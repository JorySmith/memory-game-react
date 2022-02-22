import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

// Styles
import './App.css';

const cardImage = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  
  // Shuffle cards and assign a unique id to each card
  // Track state of cards and user turns
  const shuffleCards = () => {
    const shuffledCards = [...cardImage, ...cardImage]
      .sort(() => Math.random() - .5)
      .map((card) => ({...card, id: Math.random()})) // add to each card object an uid

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
      if (choiceOne.src === choiceTwo.src) {
        console.log("IT'S A MATCH!!!")
        resetTurn()        
      }
      resetTurn()      
    }
  }, [choiceOne, choiceTwo])
  

  // After choosing 2 cards, reset cards and increment turns by using prevTurns values
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns++)
  }

  return (
    <div className='App'>
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      {/* When mapping and returning HTML tags, each item needs a unique key */}
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
}

export default App;
