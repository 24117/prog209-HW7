const PASSCODE = "1234";

let groceryItemArray = [];

// define a constructor to create groceryItem objects
let GroceryItemObject = function (pName, pQuantity, pCategory, pNote) {
    this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    this.Name = pName;
    this.Quantity = pQuantity;
    this.Category = pCategory;  // household  produce  frozenFood  Beverage dairy  bakery  meat DryCannedFood snack
    this.Note = pNote;
}


document.addEventListener("DOMContentLoaded", function () {

// login
let userInputedPasscode = "";
while(userInputedPasscode.trim() != PASSCODE) {
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
