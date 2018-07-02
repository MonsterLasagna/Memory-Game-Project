# Matching Game

The Memory Game Project is a browser-based card matching game (similar to Concentration).

## Game Functionality

The players flip over cards to locate pairs of symbols that match.
When cards match they change color and remain flipped on the board, when the cards do not match they change background color to purple for a few miliseconds and then they flip back.
When the player manages to match  all of the pairs the game ends.

## How the game works 

The game board consists of a number of "cards" arranged in a grid.
The deck is made up of a number of different pairs of cards, each with different symbols on one side. 
The cards are arranged randomly on the grid with the symbol face down. 
The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match.
For medium and hard modes I did on purpose not design the grid as a square. 
Depending on the width of the screen the player runs the game on, at those difficulties the grid might be a rectangle. I did this because I thought it was more important that the player is able to see all the cards at once and does not have to scroll up and down during gameplay.     
Now for really small screens (eg. with max width of 200 pixels) he will inevitably have to scroll because If I had made the icons smaller as in to fit the screen he won't be able to see the symbols very well.  

 
 The number of pairs is chosen by the player at the begging of the game.
 Once the game is launched a dialog box appears allowing the player to choose the difficulty as follows:
 - 8 pairs for easy mode;
 - 18 pairs for medium;
 - 32 pairs for hard.
 
### Each turn:

The player flips one card over to reveal its underlying symbol.
The player then turns over a second card, trying to find the corresponding card with the same symbol.
If the cards match, both cards stay flipped over.
If the cards do not match, both cards are flipped face down.
When the player clicks for the first time on a card a timer starts.

The player starts the game with a three stars as a rank.
I considered a complete move to take place  when at least two cards are flipped not when the user clicks on a single card.
A star is removed everytime the player has made a number of moves, the counter starting from the cards' array length depending on the difficulty chosen as follows:

- for easy mode at: 16 moves -- 32 moves -- 48 moves 
- for medium mode at: 36 moves -- 72 moves -- 108 moves
- for hard mode at:  64 moves -- 128 moves -- 192 moves

### Reset functionality

At any given time the player can choose to restart the game, a reset button being available. Once the player clicks the reset button a dialog box pops up. If the player chooses to restart, he must choose the difficulty again and then the board, timer, star ranking are all being reset and the player can start a new game with the new chosen difficulty.

### End game

The game ends when all the pairs on the board are flipped over. A dialog box pops up showing the star ranking, the total number of moves and the total time it took to complete the game. 
A "Play again" button allows the player to start a new game. 
