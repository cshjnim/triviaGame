$(document).ready(function() {

  $("#remaining-time").hide();
  $("#start").on("click", trivia.startGame);
  $(document).on("click", '.option', trivia.guessChecker);
  

})

var trivia = {
  // trivia properties
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 30,
  timerOn: false,
  timerId : '',

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

startGame: function() {
  
  trivia.currentSet = 0;
  trivia.correct = 0;
  trivia.incorrect = 0;
  trivia.unanswered = 0;
  clearInterval(trivia.timerId);
  
  $('#game').show();
  $('#results').html('');
  $('#timer').text(trivia.timer);
  $('#start').hide();
  $('#remaining-time').show();
  
  trivia.nextQuestion();
},


// how to run next questions
nextQuestion: function() {
  
  trivia.timer = 30;
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
// when timer runs out
timerRunning: function(){
  if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
    $('#timer').text(trivia.timer);
    trivia.timer--;
      if(trivia.timer === 4){
        $('#timer').addClass('last-seconds');
      }
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
      .html('<h3>Thank you for playing!</h3>'+
      '<p>Correct: '+ trivia.correct +'</p>'+
      '<p>Incorrect: '+ trivia.incorrect +'</p>'+
      '<p>Unaswered: '+ trivia.unanswered +'</p>'+
      '<p>Please play again!</p>');
    
    $('#game').hide();
    $('#start').show();
  }
  
},
// method to evaluate the option clicked
guessChecker : function() {
  
  var resultId;
  var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
  
  // if correct
  if($(this).text() === currentAnswer){
    $(this).addClass('btn-success').removeClass('btn-info');
    
    trivia.correct++;
    clearInterval(trivia.timerId);
    resultId = setTimeout(trivia.guessResult, 1000);
    $('#results').html('<h3>Correct!</h3>');
  }
  // if wrong,
  else{
    $(this).addClass('btn-danger').removeClass('btn-info');
    
    trivia.incorrect++;
    clearInterval(trivia.timerId);
    resultId = setTimeout(trivia.guessResult, 1000);
    $('#results').html('<h3>Wrong! Answer is: '+ currentAnswer +'</h3>');
  }
  
},
// method to remove previous question results and options
guessResult : function(){
  
  trivia.currentSet++;
  
  $('.option').remove();
  $('#results h3').remove();

  trivia.nextQuestion();
   
}
}
