console.log("See this to try if this works")

// jquery for game playing

$(document).ready (function (){
  $("remaining-time").hide();
  $("#start").on ("click", game.startGame);
  $(document).on("click", '.option',game.guessChecker);
})
  
var game = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  timer: 30,
  timerOn: false,
  timerId: '',

  // questions options and answers data
 questions: {
  q1: 'Which actress has won the most Oscars?',
  q2: 'Which chess piece can only move diagonally?',
  q3: 'How many valves does a trumpet have?',
  q4: 'When did the Cold War end?',
  q5: "In the Marvel cinematic universe, what is the name of Thor's home planet?",
  q6: 'What does the "E" stand for in the name of the Chuck E Cheese?',
  q7: "What is the only Major League Baseball team to never make it to the World Series?"
},
options: {
  q1: ['Audley Hepburn', 'Jessica Simpson', 'Meryl Streep', 'Katherine Hepburn'],
  q2: ['Queen', 'Bishop', 'Knight', 'Pawn'],
  q3: ['5', '2', '1', '3'],
  q4: ['1989', '1991', '1985', '1986'],
  q5: ['Darbia','Asgard','Earth','Vormir'],
  q6: ['Edgar','Edward','Entertainment','Energy'],
  q7: ['Seattle Mariners', 'LA Dodgers', 'Washington National','Houston Astros']
},
answers: {
  q1: 'Katherine Hepburn',
  q2: 'Bishop',
  q3: '3',
  q4: '1989',
  q5: 'Asgard',
  q6: 'Entertainment',
  q7: 'Seattle Mariners'
},
  
  startGame : function() {
    //variable
    trivia.currentSet = 0;
    trivia.correct =0;
    trivia.incorrect=0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    //how the page should display
    $('#game').show();
    $('#results').html('');
    $('#timer').text(trivia.timer);
    $('#start').hide();
    $('#remaining-time').show();

    trivia.nextQuestion ();
  },
  
  nextQuestion: function(){
    trivia.timer =30;
    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
  },

  guessChecker: function(){
    var resultId;
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    //if correct
    if ($(this).text() === currentAnswer) {
      $(this).addClass('btn-success').removeClass('btn-info');
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct!</h3>');
    }
    //if wrong
    else {
      $(this).addClass('btn-danger').removeClass('btn-info');
    
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Wrong! Answer is: '+ currentAnswer +'</h3>');
    }
  },

  timerRunning: function (){
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.qustions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
        else if(trivia.timer === -1){
          trivia.unanswered++;
          trivia.result = false;
          clearInterval(trivia.timerId);
          resultId = setTimeout(trivia.guessResult, 1000);
          $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
        }

    else if(trivia.currentSet === Object.keys(trivia.questions).length){
    
      // adds results here
      $('#results')
        .html('<h3>Play again!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>');
      
      $('#game').hide();
      $('#start').show();

  }
}
}}