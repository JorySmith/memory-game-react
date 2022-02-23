import './SingleCard.css'

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

    // Don't set and track choice state here, do it in App.js 
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
        
    }    

    return (    
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img 
                    className="front" 
                    src={card.src} 
                    alt="card front" />
                <img 
                    className="back" 
                    src='./img/cover.png' 
                    onClick={handleClick} 
                    alt="card back" />
            </div>            
        </div>    
    )
}

export default SingleCard