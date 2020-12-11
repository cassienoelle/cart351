"use strict";

$(document).ready( function() {

  console.log("instrument config ready!");
  let maxNotes = 8;
  let nSlider = $('#notes-slider');
  let totalNotes = 1;
  let currentNote;
  let currentNoteIndex = 0;
  let octaveVal = 3;
  let minOctave = 1;
  let maxOctave = 7;

  // Num Notes Slider
  $(function() {
    nSlider.slider({
      value: 1,
      min: 1,
      max: maxNotes,
      step: 1,
      slide: function(event, ui) {
        $('#num-notes').val(ui.value);
        totalNotes = ui.value;
        console.log('total notes: ' + totalNotes);
        notesToSelect();
        currentNoteIndex = 0;
      }
    });
    $('#num-notes').val( $(nSlider).slider('value') );
  });

  function notesToSelect() {
    console.log("call notesToSelect");
    $('#notes-selected').empty();
    for (let i = 0; i < totalNotes; i++) {
      $('<span class="sel-note">').appendTo('#notes-selected');
    }
  }

  function addNote() {
    $( '.sel-note' ).each(function(index) {
      if (index === currentNoteIndex) {
        let txt = currentNote + octaveVal;
        $(this).text(txt);
      }
    });
  }

  $('.key').click(function(e) {
    e.preventDefault();
    currentNote = $(this).attr('data-key');
    console.log('currentNote = ' + currentNote + octaveVal);

    if (currentNoteIndex < totalNotes) {
      addNote();
      currentNoteIndex++;
    }
  });

  $('#clear-notes').click(function(e) {
    e.preventDefault();
    $( '.sel-note' ).each(function(index) {
      $(this).empty();
    });
    currentNoteIndex = 0;
  });

  //  Octave Spinner
  $( function() {
    $('#octave-spinner').spinner({
      spin: function(event, ui) {
        octaveVal = ui.value;
        if (ui.value > maxOctave) {
          $(this).spinner( "value", minOctave );
          return false;
        }
        else if ( ui.value < 1 ) {
          $(this).spinner( "value", maxOctave );
          return false;
        }
      }
    }).val(octaveVal);
  });



});
