const Card = ({ value, isRevealed }) => {
  const cardValues = ['J', '9', 'A', '10', 'K', 'Q', '8', '7'];
  
  if (!cardValues.includes(value)) {
    return null; // If the card is not part of the game, render nothing
  }

  return (
    <div className={`card ${isRevealed ? 'revealed' : ''}`}>
      {isRevealed ? (
        <img src={`assets/cards/${value}.jpg`} alt={value} />
      ) : (
        'Card Back'
      )}
    </div>
  );
};
