"use strict";

window.onload = () => {

  let introHello = document.getElementById("hello");
  let introWorlds = document.getElementById("worlds");
  let introLink = document.getElementById("intro-link");
  let introCursor = document.getElementById("blinking-cursor");
  let worldsText = Array.from("worlds");
  let helloText = Array.from("hello ");
  let charCount = 0;
  let strCount = 0;

  introLink.style.webkitAnimationPlayState = "paused";

  let titleA = () => setTimeout(function(){ introWrite(helloText, introHello, 166, 350); }, 4000);
  let titleB = () => setTimeout(function(){ introWrite(worldsText, introWorlds, 166, 4000); }, 500);
  let titles = [titleA, titleB];

  titles[strCount]();

  function introWrite(text, el, t1, t2) {

    console.log("el: " + el);
    console.log(el.textContent);
    el.textContent += text[charCount];
    charCount++;

    if (charCount < text.length-1) {
      setTimeout(function(){ introWrite(text, el, t1, t2); }, t1);
      introCursor.style.color = "var(--intro-title-color)";
      introCursor.style.webkitAnimationPlayState = "paused";
    }
    else if (charCount === text.length-1) {
      setTimeout(function(){ introWrite(text, el, t1, t2); }, t2);
      if (t2 > 300) {
        introCursor.style.webkitAnimationPlayState = "running";
      }
    }
    else if (charCount === text.length) {
      charCount = 0;
      strCount++;
      if (strCount < titles.length) {
        titles[strCount]();
      }
      else {
        setTimeout(styleIntroLink, 3000);
      }
    }
  }

  function styleIntroLink() {
    introCursor.style.opacity = 0;
    introLink.style.webkitAnimationPlayState = "running";
  }

}
