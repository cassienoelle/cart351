// the JSON string
let bookAsAJSON_String = {"Title": "One Flew Over the Cuckoo's Nest",
    "Author": "Kem Kesey",
    "Genre": "Psychological Fiction",
    "Detail": {
        "Publisher": "Berkley; Reprint edition",
        "Publication_Year": 1963,
        "ISBN": "0451163966",
        "Language": "English",
        "Pages": 272
    },
// a value can also be an array
    "Price": [  {  "type": "Hardcover", "price": 16.65  }, { "type": "Kindle Edition", "price": 7.03  } ]
  }

$(document).ready(function(){
  console.log("ready");

  let pContainer = $(".wrapper")[0];
  // A: the heading
    let h1 = $("<h1>"); // creating an element  ** NOT accessing
     h1.text("** json book ... Test **");
     $(h1).appendTo(pContainer);
     //iterateAndDisplayJSONString_dot(bookAsAJSON_String);
     iterateAndDisplayJSONString_br(bookAsAJSON_String);

     function iterateAndDisplayJSONString_dot(localJSONString){
      //using dot notation
      let h3 = $("<h3>"); // creating an element  ** NOT accessing
      h3.html("USING DOT NOTATION:::<br /> **************************");
      $(h3).appendTo(pContainer);

    //A: Access the first element in the array associated with the key Price ...
      let p = $("<p>");
      //localJSONString.Price[0]
      p.html("<strong> First element in the array labelled as Price:::</strong> "+localJSONString.Price[0]);
      $(p).appendTo(pContainer);

    //B: now get the properties associated
      let p2 = $("<p>");
      // need to use dot notation to access the properties ::
      p2.html("<span style = 'color:rgba(149, 0, 153,0.95);'><strong> Access the properties of the above:::</strong> "+localJSONString.Price[0].type+", "
      +localJSONString.Price[0].price+"</span>");
      $(p2).appendTo(pContainer);

    //C: Access the author
     let p3 = $("<p>");
     p3.html("<span style = 'color:rgba(255, 0, 153,0.95);'><strong> The author property::</strong>"+localJSONString.Author+"</span>");
     $(p3).appendTo(pContainer);

     //D: Access the publisher:
     let p4 = $("<p>");
     p4.html("<span style = 'color:rgba(0, 149, 153, 0.95);'><strong> Access the publisher :::</strong> "+localJSONString.Detail.Publisher+"</span>");
     $(p4).appendTo(pContainer);
    }



    function iterateAndDisplayJSONString_br(localJSONString){
    //E: SAME AS ABOVE (A to F but using bracket notation)
      let h3_A = $("<h3>"); // creating an element  ** NOT accessing
      h3_A .html("USING BRACKET NOTATION:::<br /> **************************");
      $(h3_A ).appendTo(pContainer);

      //AE: Access the first element in the array associated with the key Price ...
      let p_A = $("<p>");
      p_A.html("<strong> First element in the array labelled as Price:::</strong> "+localJSONString['Price'][0]);
      $(p_A).appendTo(pContainer);

      //B: now get the properties associated
      let p2_A = $("<p>");
      p2_A.html("<span style = 'color:rgba(149, 0, 153,0.95);'><strong> Access the properties of the above:::</strong> "+localJSONString['Price'][0]['type']+","
      +localJSONString['Price'][0]['price']+"</span>");
      $(p2_A).appendTo(pContainer);

      //C: Access the author
      let p3_A = $("<p>");
      p3_A.html("<span style = 'color:rgba(255, 0, 153,0.95);'><strong> The author property::</strong>"+localJSONString['Author']+"</span>");
      $(p3_A).appendTo(pContainer);

      //D: Access the publisher:
      let p4_A = $("<p>");
      p4_A.html("<span style = 'color:rgba(0, 149, 153, 0.95);'><strong> Access the publisher :::</strong> "+localJSONString['Detail']['Publisher']+"</span>");
      $(p4_A).appendTo(pContainer);
    }
});
