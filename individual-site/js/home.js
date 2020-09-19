"use strict";
/*
let $exercises;
let $reflections;
let $presentation;
let $project;
let $about;
let $portal;

$(document).ready(() => {

  $exercises = $("#exercises");
  $reflections = $("#reflections");
  $presentation = $("#presentation");
  $project = $("#project");
  $about = $("#about");
  $portal = $("#portal");

//  $exercises.click();


});


$exercises.draggable();
$reflections.draggable();
$presentation.draggable();
$project.draggable();
$about.draggable();

$portal.droppable();
*/

window.onload = () => {

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

  let handleClick = (event) => {

  }

  let handlemouseOver = (event) => {
    console.log(event.target.id);
    clearOverlays();
    switch (event.target.id) {
      case "exercises":
        exercisesOverlay.style.display = "inline-block";
        exercisesOverlay.style.opacity = 1;
        console.log("exercises!");
        break;
      case "reflections":
        reflectionsOverlay.style.display = "inline-block";
        reflectionsOverlay.style.opacity = 1;
        break;
      case "presentation":
        presentationOverlay.style.display = "inline-block";
        presentationOverlay.style.opacity = 1;
        break;
      case "project":
        projectOverlay.style.display = "inline-block";
        projectOverlay.style.opacity = 1;
        break;
      case "about":
        aboutOverlay.style.display = "inline-block";
        aboutOverlay.style.opacity = 1;
        break;
      default:
        defaultOverlay.style.display = "inline-block";
        defaultOverlay.style.opacity = 1;
        break;
    }
  }

  let handlemouseOut = (event) => {
    clearOverlays();
    defaultOverlay.style.display = "inline-block";
    defaultOverlay.style.opacity = 1;
  }

  let categories = document.getElementsByClassName("category-icon");
   for (let i = 0; i < categories.length; i++) {
     categories[i].addEventListener('click', handleClick);
     categories[i].addEventListener('mouseover', handlemouseOver);
     categories[i].addEventListener('mouseout', handlemouseOut);
   }

   let overlays = document.getElementsByClassName("overlay");
   function clearOverlays() {
     for (let i = 0; i < overlays.length; i++) {
       overlays[i].style.opacity = 0;
     }
   }


}
