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

// start by creating data so we don't have to type it in each time
let groceryArray = [];

// define a constructor to create movie objects
let GroceryItem = function (pName, pQuantity, pCategory, pNote) {
    this.Name = pName;
    this.Quantity = pQuantity;
    this.Category = pCategory;  // action  comedy  drama  horrow scifi  musical  western
    this.Note = pNote;
}

let selectedQuantity = "1";
let selectedCategory = "household";

document.addEventListener("DOMContentLoaded", function () {

    createList();

// add button events ************************************************************************
    
    document.getElementById("buttonAdd").addEventListener("click", function () {
        groceryArray.push(new GroceryItem(document.getElementById("name").value, 
            selectedQuantity, selectedCategory, document.getElementById("note").value));
        document.location.href = "index.html#ListAll";
        // also add the URL value
    });
    
    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("name").value = "";
    });

    $(document).bind("change", "#category", function (event, ui) {
        selectedCategory = $('#category').val();
    });

    $(document).bind("change", "#quantity", function (event, ui) {
        selectedQuantity= $('#quantity').val();
    });

    document.getElementById("delete").addEventListener("click", function () {
        deleteItem(document.getElementById("IDparmHere").innerHTML);
        createList();  // recreate li list after removing one
        document.location.href = "index.html#ListAll";  // go back to movie list 
    });

// 2 sort button event methods
    document.getElementById("buttonSortCategory").addEventListener("click", function () {
        groceryArray.sort(dynamicSort("Category"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    document.getElementById("buttonSortItem").addEventListener("click", function () {
        groceryArray.sort(dynamicSort("Item"));
        createList();
        document.location.href = "index.html#ListAll";
    });

// end of add button events ************************************************************************

  
  
// page before show code *************************************************************************
    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
        createList();
    });

    

    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#ViewDetail", function (event) {   // have to use jQuery 
        let localID = document.getElementById("IDparmHere").innerHTML;
        let arrayPointer = GetArrayPointer(localID);
        document.getElementById("name").innerHTML =  groceryArray[arrayPointer].Name;
        document.getElementById("quantity").innerHTML = groceryArray[arrayPointer].Quantity;
        document.getElementById("category").innerHTML =  groceryArray[arrayPointer].Category;
        document.getElementById("note").innerHTML =  + groceryArray[arrayPointer].Note;
    });
 
// end of page before show code *************************************************************************

});  
// end of wait until document has loaded event  *************************************************************************

// next 2 functions could be combined into 1 with a little work
// such as I could pass in a variable which said which divMovieList div it should draw
// to, and if no value is passed in to subset too, I could just include all.

function createList() {
    // clear prior data
    var divGroceryList = document.getElementById("divGroceryList");
    while (divGroceryList.firstChild) {    // remove any old data so don't get duplicates
        divGroceryList.removeChild(divGroceryList.firstChild);
    };

    var ul = document.createElement('ul');

    groceryArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        li.classList.add('oneItem'); 
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        li.setAttribute("data-parm", element.Name);
        li.innerHTML = element.Name + ":  " + element.Category + "  " + element.Quantity + "" +element.Note;
        ul.appendChild(li);
    });
    divGroceryList.appendChild(ul)

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liArray = document.getElementsByClassName("oneItem");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
        // get that data-parm we added for THIS particular li as we loop thru them
        var parm = this.getAttribute("data-parm");  // passing in the record.Id
        // get our hidden <p> and write THIS ID value there
        document.getElementById("IDparmHere").innerHTML = parm;
        // now jump to our page that will use that one item
        document.location.href = "index.html#ViewDetail";
        });
    });

};

    
    
