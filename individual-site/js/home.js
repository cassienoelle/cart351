"use strict";

/*
  Animate a portal/vortex on homepage
  Symbols "control" the portal, to navigate to other "destinations" (pages)
  When the mouse hovers over or clicks on one of the symbols (icons), the portal changes color

  Colour changes are achieved through layered images or "overlays" that fade in and out
*/

document.addEventListener("DOMContentLoaded", () => {

  let exercises = document.getElementById("exercises");
  let reflections = document.getElementById("reflections");
  let presentation = document.getElementById("presentation");
  let project = document.getElementById("project");
  let about = document.getElementById("about");
  let portal = document.getElementById("vortex");
  let exercisesOverlay = document.getElementById("exercises-overlay");
  let reflectionsOverlay = document.getElementById("reflections-overlay");
  let presentationOverlay = document.getElementById("presentation-overlay");
  let projectOverlay = document.getElementById("project-overlay");
  let aboutOverlay = document.getElementById("about-overlay");
  let defaultOverlay = document.getElementById("default-overlay");
  let destination = document.getElementById("destination");


  // Click events for navigation icons
  // Portal colour changes and linked page title is displayed as "destination"
  let handleClick = (event) => {
    destination.style.opacity = 1;
    switch (event.target.id) {
      case "exercises":
        exercisesOverlay.style.display = "inline-block";
        exercisesOverlay.style.opacity = 1;
        destination.textContent = "exercises";
        console.log("exercises!");
        break;
      case "reflections":
        reflectionsOverlay.style.display = "inline-block";
        reflectionsOverlay.style.opacity = 1;
        destination.textContent = "reflections";
        break;
      case "presentation":
        presentationOverlay.style.display = "inline-block";
        presentationOverlay.style.opacity = 1;
        destination.textContent = "presentations";
        break;
      case "project":
        projectOverlay.style.display = "inline-block";
        projectOverlay.style.opacity = 1;
        destination.textContent = "projects";
        break;
      case "about":
        aboutOverlay.style.display = "inline-block";
        aboutOverlay.style.opacity = 1;
        destination.textContent = "about";
        break;
      default:
        break;
      }
  }

  // Mouseover events for navigation icons
  // Portal colour changes and linked page title is displayed as "destination"
  let handlemouseOver = (event) => {
    console.log(event.target.id);
    clearOverlays();
    destination.style.opacity = 1;
    switch (event.target.id) {
      case "exercises":
        exercisesOverlay.style.display = "inline-block";
        exercisesOverlay.style.opacity = 1;
        destination.textContent = "exercises";
        console.log("exercises!");
        break;
      case "reflections":
        reflectionsOverlay.style.display = "inline-block";
        reflectionsOverlay.style.opacity = 1;
        destination.textContent = "reflections";
        break;
      case "presentation":
        presentationOverlay.style.display = "inline-block";
        presentationOverlay.style.opacity = 1;
        destination.textContent = "presentations";
        break;
      case "project":
        projectOverlay.style.display = "inline-block";
        projectOverlay.style.opacity = 1;
        destination.textContent = "projects";
        break;
      case "about":
        aboutOverlay.style.display = "inline-block";
        aboutOverlay.style.opacity = 1;
        destination.textContent = "about";
        break;
      default:
        defaultOverlay.style.display = "inline-block";
        defaultOverlay.style.opacity = 1;
        setTimeout(function(){ destination.textContent = "unknown"; }, 300);
        break;
    }
  }

  // Reset on mouse out
  let handlemouseOut = (event) => {
    clearOverlays();
    defaultOverlay.style.display = "inline-block";
    defaultOverlay.style.opacity = 1;
    destination.style.opacity = 0;
  }

  // Add event listeners to all the homepage icons (symbols)
  let categories = document.getElementsByClassName("category-icon");
   for (let i = 0; i < categories.length; i++) {
     categories[i].addEventListener('click', handleClick);
     categories[i].addEventListener('mouseover', handlemouseOver);
     categories[i].addEventListener('mouseout', handlemouseOut);
   }

   // Clear coloured overlays and revert portal to white
   // when the mouse isn't over an icon
   let overlays = document.getElementsByClassName("overlay");
   function clearOverlays() {
     for (let i = 0; i < overlays.length; i++) {
       overlays[i].style.opacity = 0;
     }
   }


});
