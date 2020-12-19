"use strict";

let $exercises;
let $reflections;
let $presentation;
let $semesterProject;
let $portal;

$(document).ready(() => {

  $exercises = $("#exercises");
  $reflections = $("#reflections");
  $presentation = $("#presentation");
  $semesterProject = $("#project");
  $portal = $("#portal");

  $exercises.draggable();
  $reflections.draggable();
  $presentation.draggable();
  $semesterProject.draggable();

  $portal.droppable();

});
