"use strict";

$(document).ready(function(){

  console.log("ready");

  /***------- BUILD HTML PAGE ---------***/

  // Header and search bar
  let header = $("<header>");
  $(header).appendTo(document.body);
  let h1 = $("<h1>");
  h1.text("Daily Dinner Recipes");
  $(h1).appendTo(header);
  let h2 = $("<h2>");
  h2.text("you can eat what I eat ! ( ˘▽˘)っ♨");
  $(h2).appendTo(header);

  let main = $("<main>");
  $(main).appendTo(document.body);
  let pContainer = $("<p>");
  $(pContainer).appendTo(header);

  let label = $("<label>");
  label.text("Search by ingredient: ");
  let searchText = $("<input type='text' id='searchText' value='search item' />");
  let searchButton = $("<input type='button' value='Search' id='searchButton' />");
  $(label).appendTo(header);
  $(searchText).appendTo(header);
  $(searchButton).appendTo(header);
  let hint = $("<p>");
  hint.text("Hint: Try searching 'tomatoes'. Try searching 'cheese'. Try searching 'eggplant'. Click on any image to reveal a recipe.")
  $(hint).appendTo(header).addClass("hint");

  // Display if there are no matching results
  let noResults = $("<h4>");
  noResults.text("	<(_ _)> sorry! I haven't eaten that recently.");
  noResults.appendTo(main).addClass("failure");
  noResults.hide();

  // Divs to display results
  let recipeThumbnails = $("<div>").attr("id", "recipe-thumbnails");
  $(recipeThumbnails).appendTo(main).addClass("flex-container");

  let recipeIngredients = $("<div>").attr("id", "recipe-ingredients");
  $(recipeIngredients).appendTo(main).addClass("flex-container");
  $(recipeIngredients).addClass("flex-vertical");

  let recipeInstructions = $("<div>").attr("id", "recipe-instructions");
  $(recipeInstructions).appendTo(main).addClass("flex-container");
  $(recipeInstructions).addClass("flex-vertical");

  /***-----------END------------***/

  // Variables to track search matches
  let match = false;
  let numMatches = 0;

  // Bind CLICK EVENT HANDLER to search button
  $("#searchButton").click(getData);

  // getData()
  //
  // GET JSON DATA, LOOK FOR SEARCH MATCH, DISPLAY RESULTS
  function getData() {

    // Clear any previous search results
    $(recipeThumbnails).empty();
    $(recipeIngredients).empty();
    $(recipeInstructions).empty();
    $(noResults).hide();
    numMatches = 0;

    let searchItem = $("#searchText").val();
    console.log(searchItem);
    let myData = "data.json";


    // getJSON()
    //
    // GET THE JSON DATA
    $.getJSON(myData, function (results){ // SUCCESS FUNCTION
      console.log(results);
      // ITERATE THROUGH RESULTS
      for (let i = 0; i < results.length; i++) {
        let item = results[i];
        match = false;

        // ITERATE THROUGH INGREDIENTS
        for (let j = 0; j < item.ingredients.length; j++) {
          console.log(item.ingredients[j]);

          // CHECK FOR SEARCH MATCH
          // Check if any ingredients include the search item
          // Only continue checking if no matches have been found yet
          if (!match) {
            if (item.ingredients[j].includes(searchItem)) {
              match = true;
              displayMatchingResults(item);
            }
            else {
              // If we've gone through all the JSON objects and there are no no matches
              // show No Results message
              if (numMatches === 0 && j === item.ingredients.length-1 && i === results.length-1) {
                $(noResults).show();
              }
            }

          }
          else {
            // If a match is found, display the recipe from that day
            // Track matches and only display once (after first match)
            numMatches++;
            if (numMatches === 1) {
              console.log("match set");
            }
          }
        }
      }

      // displayMatchingResults()
      //
      // DISPLAY RESULTS MATCHING SEARCH ITEM
      function displayMatchingResults(item) {

        // Populate thumbnails div with recipe title and image
        let id = item.day; // custom ID
        $("<div>").attr("id", id).appendTo(recipeThumbnails); // add custom ID and append to div
        $("#"+id).addClass("flex-child"); // add class
        $("<img>").attr("src","imgs/"+item.image).appendTo("#"+id).addClass("recipe-image"); // add image

        // Populate ingredients div
        $("<div>").attr("id", id+"-ingredients").appendTo(recipeIngredients).addClass("toggleDisplay"); // add custom ID and append to div
        $("<h3>").text(item.title).appendTo("#"+id+"-ingredients").addClass("recipe-title"); // add title
        let ingredientsList = toList(item.ingredients, false); // array of ingredients to html list
        $(ingredientsList).appendTo("#"+id+"-ingredients");
        $("#"+id+"-ingredients").hide();

        // Populate instructions div
        $("<div>").attr("id", id+"-instructions").appendTo(recipeIngredients).addClass("toggleDisplay"); // add custom ID and append to div
        let instructionsList = toList(item.instructions, true); // array of instructions to html list
        $(instructionsList).appendTo("#"+id+"-instructions");
        $("#"+id+"-instructions").hide();


        // Bind CLICK EVENT HANDLER to image
        // reveals related recipe
        $("#"+id).click(function() {
          // Hide previously displayed recipe
          $(".toggleDisplay").hide();
          // Show current recipe
          $("#"+id+"-ingredients").show();
          $("#"+id+"-instructions").show();
        });

      }


      // toList()
      //
      // ARRAY TO HTML LIST ELEMENT
      function toList(array, ordered) {
        let list;
        // Create correct list element (ordered or unordered)
        if (ordered) {
          list = $("<ol>");
        }
        else {
          list = $("<ul>");
        }
        // Append each item in array as list item
        for (let i = 0; i < array.length; i ++) {
          $("<li>").text(array[i]).appendTo(list);
        }
        // Return the completed list
        return(list);

      }

    }) // end SUCCESS FUNCTION

    // FAIL FUNCTION
    .fail(function() {
      console.log( "error" );
    });


  } // end getJSON


});
