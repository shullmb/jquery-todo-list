// calculate days until duedate
var calculateDaysLeft = function(formDate) {
    var today = new Date();
    var dueDate = new Date(formDate);
    var numberOfMsInDay = 1000 * 60 * 60 * 24;
    // find number of days between the two dates
    var numOfDays = Math.round(((dueDate - today) / numberOfMsInDay));

    // handle output message
    if ( numOfDays > 1 || numOfDays === 0) {
        return numOfDays + " days left to do it!";
    } else if ( numOfDays == 1 ) {
        return numOfDays + " day to get it done! hurry up!";
    } else {
        return "<span class='overdue'>OVERDUE! Finish this thing!</span>";
    }
}

//function to generate styled list items
var htmlToDoGenerator = function(listItem, dueDate){
    return "<div class='item'> <h3>" + listItem
           + "</h3><h4>" + dueDate 
           + "</h4><button type='button' class='done'>Done</button><div>";
}

//function to refocus -- should this really be wrapped in a func?
var focusOnStartingInput = function() {
    $('input')[0].focus();
}
// function to remove the completed list item
var markDone = function() {
    $(this).parent().remove();
    // focus back on todo input after a half second of quiet reflection about the task you have completed
    setTimeout(focusOnStartingInput, 500);
}

// function to append list item to body of page
var addToDo = function(e) {
    e.preventDefault();
    // get data in useable format
    var toDoData = $('form').serializeArray();

    // set up vars for easier handling
    var listItem = toDoData[0].value;
    var daysLeftUntilDue = calculateDaysLeft(toDoData[1].value);
    
    // generate html and append to list div
    var divToAppend = htmlToDoGenerator(listItem, daysLeftUntilDue)
    $('.list').append( divToAppend);

    // clear out input fields
    for (let i = 0; i < $('input').length; i++ ){
        $('input')[i].value = "";
    }

    // wire up event handler to delete item
    $('div.item').on("click", "button.done", markDone);

    //focus back on 'Thing to do'
    focusOnStartingInput();
}

$(document).ready(function () {
    focusOnStartingInput();
    $('form').submit(addToDo);
})