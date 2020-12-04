"use strict";

let maxNotes = 8;

$(document).ready( function() {

  console.log("instrument config ready!");
  let nSlider = $('#notes-slider');

  $(function() {
    nSlider.slider({
      value: 1,
      min: 1,
      max: maxNotes,
      step: 1,
      slide: function(event, ui) {
        $('#num-notes').val(ui.value);
      }
    });
    $('#num-notes').val( $(nSlider).slider('value') );
  });

});
