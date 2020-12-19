let bookGlobalVar =
{

    Title: "One Flew Over the Cuckoo's Nest",
    Author: "Kem Kesey",
    Genre: "Psychological Fiction",


Detail: {
        Publisher: "Berkley; Reprint edition",
        Publication_Year: 1963,
        ISBN: "0451163966",
        Language: "English",
        Pages: 272
    },
Edition_Years: [1983, "1998", "2008","2014"] //nums and strings

}

$(document).ready(function(){
console.log("ready");
let pContainer = $(".wrapper")[0];
// A: the heading
let h1 = $("<h1>"); // creating an element  ** NOT accessing
h1.text("** single book object **");
$(h1).appendTo(pContainer);
displaySingle(bookGlobalVar);



function displaySingle(book){
    //B: access ALL top level properties
   //1: get all keys as an array :
   let keys = Object.keys(book); // in-built javascript function that allows you to access keys as an array
   console.log(Object.keys(book));

   //C: iterate through the top level keys
   //D: use each key to access its value from the object
   //E: attempt to display ...
   for(let i = 0; i<keys.length; i++){
     console.log(keys[i]); //the key
     console.log(book[keys[i]]);

     if(keys[i] === 'Detail'){
      let objectDetail = book[keys[i]];
      let keysDetail = Object.keys(objectDetail);

       //F: for loop for the Detail Object
        for(let j = 0; j<keysDetail.length;j++){
          console.log(objectDetail[keysDetail[j]]);
          let bookPropertyPara = $("<p>"); // creating an element  ** NOT accessing
          bookPropertyPara.html("<span style = 'color:rgba(149, 0, 153,0.95);'><strong>the Property:</strong> "+keysDetail[j]+" <strong> & the Value:</strong> "+objectDetail[keysDetail[j]]+"</span>");
          $(bookPropertyPara).appendTo(pContainer);
        }
    }//if detail

    //G:want to iterate through this one as an array ...
    else if(keys[i] === 'Edition_Years'){
          let objectArray = book[keys[i]];
          for(let k =0; k<objectArray.length; k++){
            let bookPropertyPara = $("<p>"); // creating an element  ** NOT accessing
            bookPropertyPara.html("<span style = 'color:rgba(255, 0, 153,0.95);'><strong>the Property of : </strong>"+keys[i]+" at index : "+k+" <strong> & the Value:</strong> "+objectArray[k]+"</span>");
            $(bookPropertyPara).appendTo(pContainer);
          }

        }//if Edition_Years

//rest of for loop

    //A : Replace
    else{
          let bookPropertyPara = $("<p>"); // creating an element  ** NOT accessing
          bookPropertyPara.html("<strong>the Property:</strong> "+keys[i]+" <strong> & the Value:</strong> "+book[keys[i]]);
          $(bookPropertyPara).appendTo(pContainer);

        }

   } //outer for
}

});
