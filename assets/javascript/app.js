console.log("See this to try if this works")

// jquery for game playing

$(document).ready (function (){
  var correct: 0;
  var incorrect: 0;
  var unanswered: 0;
  var timer: 30;
  var timerOn: false;
  var timerId: '',

  function startGame() {
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
  }

  function nextQuestion (){
    trivia.timer =30;
    $('#timer').removeClass('last-seconds');
  $('#timer').text(trivia.timer);
  }

  function guessChecker (){
    var resultId;
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    if () {

    }
    else {
      
    }
  }

  function timerRunning (){
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.qustions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
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
})

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