"use strict";

window.onload = () => {

  let introHello = document.getElementById("hello");
  let introWorlds = document.getElementById("worlds");
  let introLink = document.getElementById("intro-link");
  let blinkingCursor = document.querySelector(".blinking-cursor");
  // let introCursor = document.getElementById("blinking-cursor");
  let worldsText = Array.from("worlds");
  let helloText = Array.from("hello ");
  let charCount = 0;
  let strCount = 0;

  introLink.style.webkitAnimationPlayState = "paused";

  let titleA = () => setTimeout(function(){ introWrite(helloText, introHello, 250, 1000); }, 4000);
  let titleB = () => setTimeout(function(){ introWrite(worldsText, introWorlds, 250, 4000); }, 500);
  let titles = [titleA, titleB];

  titles[strCount]();

  function introWrite(text, el, t1, t2) {

    console.log("el: " + el);
    console.log(el.textContent);
    el.textContent += text[charCount];
    charCount++;

    if (charCount < text.length-1) {
      setTimeout(function(){ introWrite(text, el, t1, t2); }, t1);
      // introCursor.style.color = "var(--intro-title-color)";
    }
    else if (charCount === text.length-1) {
      setTimeout(function(){ introWrite(text, el, t1, t2); }, t2);
      if (strCount === titles.length-1) {
        setTimeout(styleIntroLink, t2);
      }
    }
    else if (charCount === text.length) {
      charCount = 0;
      strCount++;
      if (strCount < titles.length) {
        titles[strCount]();
      }
      else {
        //setTimeout(styleIntroLink, 1000);
      }
    }
  }

  function styleIntroLink() {
    introLink.classList.add("pseudo");
    blinkingCursor.style.opacity = 0;
    introLink.style.webkitAnimationPlayState = "running";
  }

}
