const PASSCODE = "1234";

document.addEventListener("DOMContentLoaded", function () {

// login
let userInputedPasscode = "";
while(userInputedPasscode.trim() != PASSCODE || userInputePasscode == "") {
    userInputedPasscode = prompt("Please enter your passcode");
} 

var slideIndex =1;
carousel();


function carousel(){
    var i;
    var x = document.getElementsByClassName("Home_Slides");
    for(i = 0; i < x.length; i++)
    {
        x[i].style.display = "none";

    }
    slideIndex++;
    if(slideIndex > x.length) {slideIndex =1}
    x[slideIndex -1].style.display = "block";
    setTimeout(carousel, 3000);
}

})
