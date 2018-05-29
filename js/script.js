//function to generate styled list items
var htmlToDoGenerator = function(listItem,dueDate){
    return "<div class='item'> <h4>" + listItem+ "<br> due by: " + dueDate+ "</h4><button type='button' class='done'>Done</button><div>";
}

// function to append list item to body of page
var addToDo = function(e) {
    e.preventDefault();
    // get data in useable format
    var toDoData = $('form').serializeArray();

    // set up vars for easier handling
    var listItem = toDoData[0].value;
    var formDate = toDoData[1].value.split('-');
    var dueDate = formDate[1] + "/" + formDate[2]+"/"+formDate[0];
    
    var divToAppend = htmlToDoGenerator(listItem, dueDate)
    // set
    $('.list').append( divToAppend);

    // clear out input fields
    for (let i = 0; i < $('input').length; i++ ){
        $('input')[i].value = "";
    }

    // wire up event handler to delete item
    $('div.item').on("click", "button.done", markDone);

    //focus back on 'Thing to do'
    $('input')[0].focus();
}

var markDone = function() {
    $(this).parent().remove();
}

$(document).ready(function () {
    $('input')[0].focus();
    $('form').submit(addToDo);
})