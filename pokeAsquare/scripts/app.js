console.log('test code for merge')
//When the user clicks begin the timer should start,
//and the squares should populate with a random color
$('button').on('click', () => {
  console.log('button works')
  // invoke our function to initialize our squares
  game.setUpRound();
  game.setTimer();
});

// using event delegation
$('.squares').on('click', (e) => {
  game.checkValidPoke(e.target)
})





const game = {
  score: 0,
  round: 1,
  time: 0,
  squares: [],
  setUpRound(){
    // empty the children so we get fresh squares
    $('.squares').empty();
    // updating the round on the dom using jquery
    const $round = $('#round');
    $round.text(`round: ${this.round}`);
    // depending on the round number, 4 rounds
    // we createSquares with increasing number
    // we decrease the time allowed
    if(this.round === 1){
      this.createSquares(50);
      this.time = 30;
    } else if(this.round === 2){
      this.createSquares(100);
      this.time = 20;
    } else if(this.round === 3){
      this.createSquares(150);
      this.time = 10;
    } else {
      this.createSquares(200);
      this.time = 10;
    }

  },
  setTimer(){
    // grabbing the timer span from html
    const $timer = $('#timer');

    const interval = setInterval(() =>{

        if(this.time === 0){

          clearInterval(interval); // stops the interval
          this.round++
        } else {
          this.time--
        }

        // update the time on the dom
        $timer.text(`timer: ${this.time}s`)

    }, 1000)
    // create a setInterval that countdowns down to zero
    // and updates the DOM for each second representing the
    // time,

    // when reach zero we want to clear the interval
    // and increase the round number!
  },
  createSquares(numberOfSquares){
    // squares should populate
    for (let i = 0; i < numberOfSquares; i++){
      // create the div
      // give it a class of .square so that we can tell if it's a 
      // square in checkValidPoke
      const $square = $('<div class="square"></div>');

      this.applyRandomColor($square);

      $('.squares').append($square);

      // how might we make this more OO
      // const s = new Square()
      // this.squares.push(s)
      // this.printSquares()

    }
  },
  // OOP
  printSquares() { 
    // loop over this.squares
      // getHtml()
      // square.print() or $('.squares').append(sq.getHtml())
  },
  applyRandomColor($square){
    // and apply a random 'red', 'blue', or 'green'
    // as a background color
    const randNum = Math.floor(Math.random() *3);
    // 0, 1, 2
    if(randNum === 0){
      $square.css('backgroundColor', 'red');
    } else if(randNum === 1){
      $square.css('backgroundColor', 'blue');
    } else {
      $square.css('backgroundColor', 'green')
    }
  },

  checkValidPoke(clicked) {
    console.log(clicked);
    const $clickedElement = $(clicked) // convert it back to jQ
    // was this a square that has not already been clicked
    if($clickedElement.hasClass('square') && $clickedElement.css('opacity') != 0) {
      // is it blue?
      const color = $clickedElement.css('background-color')      
      if(color === 'rgb(0, 0, 255)'){
        this.score += 1;
      } else {
        this.score -= 1;
      }
      // update scoreboard
      this.updateScore()

      $clickedElement.css({
        opacity: '0'        
      })
    }
  },

  updateScore() {
    $('h1').text(`scoreboard: ${this.score}`);    
  }    

}
