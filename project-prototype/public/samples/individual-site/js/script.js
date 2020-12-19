"use strict";

/*
  Hello World(s) typing animation for landing page
*/

window.onload = () => {

  introPage();

}

function introPage() {
  let introHello = document.getElementById("hello");
  let introWorlds = document.getElementById("worlds");
  let introLink = document.getElementById("intro-link");
  let blinkingCursor = document.querySelector(".blinking-cursor");

  // Convert to arrays
  let worldsText = Array.from("worlds");
  let helloText = Array.from("hello ");
  // Keep track of how many characters and strings we've iterated through
  let charCount = 0;
  let strCount = 0;

  // Store function callbackswith parameters specific to each word
  let titleA = () => setTimeout(function(){ introWrite(helloText, introHello, 250, 1000); }, 4000);
  let titleB = () => setTimeout(function(){ introWrite(worldsText, introWorlds, 250, 4000); }, 500);
  let titles = [titleA, titleB];

  titles[strCount]();

  // introWrite
  //
  // Simulate typing effect
  function introWrite(text, el, t1, t2) {

    el.textContent += text[charCount];
    charCount++;

    // Inject characters into html one at a time, calling function recursively
    if (charCount < text.length-1) {
      setTimeout(function(){ introWrite(text, el, t1, t2); }, t1);
      // introCursor.style.color = "var(--intro-title-color)";
    }
    // The final character in each word is typed on a delay
    else if (charCount === text.length-1) {
      setTimeout(function(){ introWrite(text, el, t1, t2); }, t2);
      if (strCount === titles.length-1) {
        setTimeout(styleIntroLink, t2);
      }
    }
    // When the word is complete,
    // reset character count and increase string count
    else if (charCount === text.length) {
      charCount = 0;
      strCount++;
      // If this is not the last string
      // call the function again with parameters for the next string
      if (strCount < titles.length) {
        titles[strCount]();
      }
    }
  }

  // Remove blinking cursor, underline animation effect on
  // "words" to reveal link
  function styleIntroLink() {
    // "pseudo" class added to relevant elements to control certain
    // transitions/animations since pseudo-elements can't be accessed
    introLink.classList.add("pseudo");
    blinkingCursor.style.opacity = 0;
    introLink.style.webkitAnimationPlayState = "running";
  }
}
