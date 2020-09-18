"use strict";

window.onload = () => {

  let introTitle = document.getElementById("intro-title");
  let introTitleText = Array.from("Hello Worlds");
  let counter = 0;

  let introWrite = () => {

    console.log("called");
    introTitle.textContent += introTitleText[counter];
    counter++;

    if (counter < introTitleText.length-1) {
      setTimeout(introWrite, 166);
    }
    else if (counter === introTitleText.length-1) {
      setTimeout(introWrite, 3000);
    }

  }

  introWrite();

}
