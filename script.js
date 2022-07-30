// import $ from "jquery";

// var script = document.createElement('script');
// script.src = 'jquery/jquery.min.js';
// script.type = "text/javascript";
// document.getElementsByTagName('head')[0].appendChild(script); // Addtional script for import the jquery file

var $keyboardWrapper = $('.virtual-keyboard'); // Whole Keyboard
var $key = $keyboardWrapper.find("input"); // This is for getting the user click input
var $key_delete = $('.delete'); // For delete option
var $key_shift = $('.shift'); // For shift option
var $outputField = $('#output')
var $currVal = $outputField.val(), // Current Value from output filed
actionKeys = $('.delete,.shift')  // The special function action keys
activeShiftClass = "shift-activated"; // To check for shift turned on

function _keystroke(keyCase){
    $key.not(actionKeys).on('click', function(e) { // Not an Action key and onclick
        e.preventDefault();
        if($key_shift.hasClass(activeShiftClass)){ // If Shift activate it
            keyCase = 'upper';
            $key_shift.removeClass(activeShiftClass);
        }
        else{
            keyCase = 'lower';
        }

        if(keyCase == 'upper'){ // Convert to upper
            var keyValue = $(this).val().toUpperCase();
        } 
        else{ // convert to lower
            var keyValue = $(this).val().toLowerCase();
        }
        var output = $('#output').val();
        $outputField.val(output+keyValue); // Updating the output filed
        getCurrentVal();
        focusOutputField(); // To have focus in the output
    });
}

// $key_delete.on('click', function() {alert('Hello')});

$key_delete.on('click', function(e){ // for delete operation
    e.preventDefault();
    $outputField.val($currVal.substr(0, $currVal.length-1)); // remove the last letter
    getCurrentVal();
    focusOutputField();
});

$key_shift.on('click', function(e){ // Shift key to toggle between upper and lower case
    e.preventDefault();
    $(this).toggleClass(activeShiftClass);
});

function getCurrentVal(){
    $currVal = $outputField.val(); // To get the currently typed text
}

function focusOutputField(){
    $outputField.focus(); // To have focus on the output field
}

_keystroke("lower"); // Initially the keystrokes has to lower alphabets