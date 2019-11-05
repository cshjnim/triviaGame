console.log("See this to try if this works")

// jquery for game playing

$(document).ready(function() {
    var 

    var userTotal = 0;
    var wins = 0;
    var losses = 0;

    //  Interval Demonstration
    //  Set our number counter to 100.
    var number = 30;

    //  Variable that will hold our interval ID when we execute
    //  the "run" function
    
    var intervalId;
    //  Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
    function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
     }


    //  The decrement function.
    function decrement() {

    //  Decrease number by one.
    number--;
  
    //  Show the number in the #show-number tag.
    $("#show-number").html("<h2>" + number + "</h2>");

    //  Once number hits zero...
    if (number === 0) {

        //  ...run the stop function.
        stop();

        }
    }

    //  The stop function
    function stop() {

    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
    }

    //  Execute the run function.
    run();

    function reset() {

    }

    function won() {
        wins++;
        $("#numberWins").text(wins);
        reset();
    }

    function loss () {
        losses++;
        $("#numberLosses").text(losses);
        reset();
    }

});