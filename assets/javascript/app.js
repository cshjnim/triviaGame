console.log("See this to try if this works")

// jquery for game playing

$(document).ready(function() {
    var trivia

    var userTotal = 0;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;

    //  Interval Demonstration
    var number = 30;

    //  the "run" function
    var intervalId;
   
    function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
     }


    //  The decrement function.
    function decrement() {
    number--;}
  
    //  Show the number in the #show-number tag.
    $("#show-number").html("<h2>" + number + "</h2>");

    //  Once number hits zero...
    if (number === 0) {
        stop();
        }

    //  The stop function
    function stop() {
    clearInterval(intervalId);
    }
    run();
    
    // function for reset
    function reset() {

    }
    //?? this better or should do in other way...? Q & A?...
    function won() {
        correct++;
        $("#numberWins").text(wins);
        reset();
    }

    function loss () {
        incorrect++;
        $("#numberLosses").text(losses);
        reset();
    }

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

});