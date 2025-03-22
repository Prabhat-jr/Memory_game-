const cardImages = [
    '🍎', '🍎',
    '🍌', '🍌',
    '🍒', '🍒',
    '🍓', '🍓',
    '🍉', '🍉',
    '🍍', '🍍',
    '🍊', '🍊',
    '🍑', '🍑',
  ];
  
  let flippedCards = [];
  let matchedPairs = 0;
  let cards = [];
  let isGameOver = false;
  
  // Shuffle the cards
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Create and display cards
  function createGameBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear previous cards
  
    shuffle(cardImages);
  
    cardImages.forEach((image, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.image = image;
      card.dataset.index = index;
      card.addEventListener('click', flipCard);
      gameBoard.appendChild(card);
      cards.push(card);
    });
  }
  
  // Flip the card
  function flipCard() {
    if (isGameOver) return;
  
    const card = this;
    if (flippedCards.length === 2 || card.classList.contains('flipped')) return;
  
    card.textContent = card.dataset.image;
    card.classList.add('flipped');
    flippedCards.push(card);
  
    // Check if two cards are flipped
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
  
  // Check if cards match
  function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
  
    if (firstCard.dataset.image === secondCard.dataset.image) {
      matchedPairs++;
      flippedCards = [];
      if (matchedPairs === cardImages.length / 2) {
        isGameOver = true;
        alert('Congratulations! You won!');
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        flippedCards = [];
      }, 1000);
    }
  }
  
  // Restart the game
  function restartGame() {
    flippedCards = [];
    matchedPairs = 0;
    isGameOver = false;
    cards.forEach(card => {
      card.classList.remove('flipped');
      card.textContent = '';
    });
    createGameBoard();
  }
  
  document.getElementById('restart').addEventListener('click', restartGame);
  
  // Initialize the game
  createGameBoard();
  