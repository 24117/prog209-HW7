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


groceryItemArray.push(new GroceryItemObject("egg", 1, "dairy", "cage-free brown organic egg"));
groceryItemArray.push(new GroceryItemObject("apple", 15, "produce", "organic honey crispy"));
groceryItemArray.push(new GroceryItemObject("dishwashing detergent", 1, "household", "cascade brand"));
groceryItemArray.push(new GroceryItemObject("toilet paper", 1, "household", ""));
groceryItemArray.push(new GroceryItemObject("sourdough bread", 3, "bakery", "with black olives"));




let selectedQuantity = "1";
let selectedCategory = "household";


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


    createList();

// add button events ************************************************************************
    
    document.getElementById("buttonAdd").addEventListener("click", function () {
        groceryItemArray.push(new GroceryItemObject(document.getElementById("name").value, 
            selectedQuantity, selectedCategory, document.getElementById("note").value));
        document.location.href = "index.html#ListAll";
    });
    
    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("name").value = "";
        document.getElementById("quantity").selectedIndex = "0";
        document.getElementById("category").selectedIndex = "0";
        document.getElementById("note").value = "";
    });

    $(document).bind("change", "#quantity", function (event, ui) {
        selectedQuantity = $('#quantity').val();
    });

    $(document).bind("change", "#category", function (event, ui) {
        selectedCategory = $('#category').val();
    });

    document.getElementById("buttonDelete").addEventListener("click", function () {
        deleteGroceryItem(document.getElementById("IDparmHere").innerHTML);
        createList();  // recreate li list after removing one
        document.location.href = "index.html#ListAll";  // go back to movie list 
    });

// 2 sort button event methods
    document.getElementById("buttonSortCategory").addEventListener("click", function () {
        groceryItemArray.sort(dynamicSort("Category"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    document.getElementById("buttonSortName").addEventListener("click", function () {
        groceryItemArray.sort(dynamicSort("Name"));
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
        // console.log("localID: " + localID);
        let arrayPointer = GetArrayPointer(localID);
        // console.log("arrayPointer: " + arrayPointer);
        // console.log("groceryItemArray[arrayPointer]: " + groceryItemArray[arrayPointer]);
        // console.log("oneName: " + document.getElementById("oneName"));
        document.getElementById("oneName").value = groceryItemArray[arrayPointer].Name;
        document.getElementById("oneQuantity").value = groceryItemArray[arrayPointer].Quantity;
        document.getElementById("oneCategory").value = groceryItemArray[arrayPointer].Category;
        document.getElementById("oneNote").value = groceryItemArray[arrayPointer].Note;
    });
 
// end of page before show code *************************************************************************
});  
// end of wait until document has loaded event  *************************************************************************

function createList() {
    // clear prior data
    var divGroceryList = document.getElementById("divGroceryList");
    while (divGroceryList.firstChild) {    // remove any old data so don't get duplicates
    divGroceryList.removeChild(divGroceryList.firstChild);
    };

    var ul = document.createElement('ul');

    groceryItemArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        li.classList.add('oneGroceryItem'); 
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        li.setAttribute("data-parm", element.ID);
        li.innerHTML = element.Name;
        ul.appendChild(li);
    });
    divGroceryList.appendChild(ul)

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liArray = document.getElementsByClassName("oneGroceryItem");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
        // get that data-parm we added for THIS particular li as we loop thru them
        var parm = this.getAttribute("data-parm");  // passing in the record.Id
        console.log("id: " + parm);
        // get our hidden <p> and write THIS ID value there
        document.getElementById("IDparmHere").innerHTML = parm;
        // now jump to our page that will use that one item
        document.location.href = "index.html#ViewDetail";
        });
    });

};


function deleteGroceryItem(which) {
    console.log(which);
    let arrayPointer = GetArrayPointer(which);
    groceryItemArray.splice(arrayPointer, 1);  // remove 1 element at index 
}

// cycles thru the array to find the array element with a matching ID
function GetArrayPointer(localID) {
    for (let i = 0; i < groceryItemArray.length; i++) {
        if (localID === groceryItemArray[i].ID) {
            return i;
        }
    }
}


/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}


    
    
