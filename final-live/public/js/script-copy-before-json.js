"use strict";

var myInstrument; // user's custom insrument
var activeCat; // which category is selected by user
var activeInst;
var my = {
  sketch: null,
  tInst: null // Tone instrument instance
}
var samplers = {
  keys: {
    piano: null,
    xylophone: null,
    marimba: null,
  },
  drums: {
    snare: null,
    tom: null,
    kick: null,
    hihat: null,
    bass: null
  }
}



$(document).ready(function() {

  /***********************************
    SETUP
  ************************************/

  // setupTone()
  //
  // inits new Tone instrument instance with null properties
  // class set according to user-selected category


  /***********************************
    GLOBAL STATE CONTROL (APP)
  ************************************/

  const STATE = {
    wait: "wait",
    init: "init",
    calibrate: "calibrate",
    run: "run"
  }
  let currentState = STATE.wait;
  let calibrated = false;

  /***********************************
    PAGE CONTROL
    Calls html-page-specific functions,
    prevents unwanted callbacks
  ************************************/
  switch ( $("body").data("title") ) {
    case "instrument_category_select":
      categorySelect();
      break;
    case "instrument_config":
      instrumentConfig(1, 7);
      instrumentSelect();
      break;
    case "landing_page":
      landingPage();
      break;
    default:
      break;
  }

  var dataObj;

  $.getJSON( "data/glossary.json", function( data ) {
    dataObj = JSON.parse(JSON.stringify(data));
  })
  .done(function() {
    setupTone();
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });

  function setupTone() {

  }


  /***********************************
    MAIN P5 SKETCH
  ************************************/
  my.sketch = function(p) {
    let canvas;
    let setWidth, setHeight;
    let video;
    let poseNet;
    let poses = [];
    let amt = 0.4; // lerp amount for smoothing pose tracking
    p.setup = function() {

      switch (currentState) {
        case STATE.wait:
          setupCanvas();
          break;
        case STATE.init:
          setupVidToCanvas();
          setupPoseTracking();
      }

    } // END setup()

    p.draw = function() {


    } // END draw()

    function setupCanvas() {
      setWidth = (p.windowWidth/2) - 10;
      setHeight = (setWidth * 3) / 4;
      canvas = p.createCanvas(setWidth, setHeight);
    }

    function setupVidToCanvas() {
      let constraints = {
        video: {
          width: { ideal: setWidth },
          height: { ideal: setHeight },
          aspectRatio: 4/3
        },
        audio: false
      };
      video = p.createCapture(constraints, function(stream) {
        //console.log(stream);
      });
      video.hide();
    }

    function setupPoseTracking() {
      let options = {
       imageScaleFactor: 0.3,
       outputStride: 16,
       flipHorizontal: true,
       minConfidence: 0.5,
       maxPoseDetections: 5,
       scoreThreshold: 0.5,
       nmsRadius: 20,
       detectionType: 'single',
       multiplier: 0.75,
      }


      poseNet = ml5.poseNet(video, options, modelReady);
      poseNet.on('pose', gotPoses);

      updateSmoothPoseKeypoints();
    }

    /****************************
            POSE TRACKING
    *****************************/

    function gotPoses(results) {
      //console.log("call gotPoses");
      //console.log(results);
      poses = results;
      if (poses.length > 0) {
        let pose = poses[0].pose;

        if (currentState === STATE.calibrate) {
          for (let i = 0; i < pose.keypoints.length; i++) {
            if (!calibrated) {
              smoothPoseKeypoints[i].cal += pose.keypoints[i].score;
              smoothPoseKeypoints[i].t ++;
            }
            else if (calibrated) {
              console.log("total " + smoothPoseKeypoints[i].i + ": " + smoothPoseKeypoints[i].cal / smoothPoseKeypoints[i].t);
              if (smoothPoseKeypoints[i].cal / smoothPoseKeypoints[i].t > 0.1) {
                smoothPoseKeypoints[i].pass = true;
              } else {
                smoothPoseKeypoints[i].pass = false;
              }
              console.log("pass: " + smoothPoseKeypoints[i].pass);
            }
          }
          if (calibrated) {
            currentState = STATE.run;
          }
        }

        if (currentState === STATE.run) {
          for (let i = 0; i < pose.keypoints.length; i++) {
            smoothPoseKeypoints[i].score = pose.keypoints[i].score;
            if (smoothPoseKeypoints[i].score > 0.1) {
                let k = pose.keypoints[i].position;
                smoothPoseKeypoints[i].x = p.lerp(smoothPoseKeypoints[i].x, k.x, amt);
                smoothPoseKeypoints[i].y = p.lerp(smoothPoseKeypoints[i].y, k.y, amt);
            }
          }
        }
      }
      updateSmoothPoseKeypoints();
    }

    function modelReady() {
      console.log('model ready');
      calibratePoses();
    }

    /****************************/

  } // END sketch



  /***********************************
    HTML PAGE SPECIFIC FUNCTIONS
  ************************************/
  // landingPage()
  //
  // handles landing page
  function landingPage() {

    let initAudioContext = async() => {
      await Tone.start(); // generates a promise to start audio context
    	console.log("context started");
    }
    // onclick Jam button
    let jam = $('#jam-btn');
    $(jam).click(function(e) {
      e.preventDefault();
      initAudioContext();
      // navigate to category-select page
      // div wrapped in <a/> but click event callback interferes
      // kept <a/> in html as fallback if javascript disabled
      window.location = "category-select.html";
    });
  }

  // categorySelect()
  //
  // handles the instrument category select page
  function categorySelect() {
    let outerDiv = $(".categories");

    // get glossary.JSON file and parse out the first layer of keys (=categories)
    // for each category, create a corresponding menu item with the same title
    $.getJSON( "data/glossary.json", function( data ) {
      console.log(data);
      $.each( data, function( key ) {
        let innerDiv = $("<div/>", {
          'class' : 'category-select',
          'data-key' : key, // this will help us know which category the user selects
          'data-location' : "instrument-config.html"
        });
        innerDiv.appendTo(outerDiv);
        let h2 = $("<h2/>", {
          'class' : 'category-title',
          text : key,
        });
        h2.appendTo(innerDiv);

        // click event listener for each category div
        $(innerDiv).click(function(e) {
          e.preventDefault();
          activeCat = $(this).data('key'); // set active category to this category
          // save activeCat to session storage so it persists across page loads
          sessionStorage.setItem('activeCat', activeCat);
          console.log('activeCat: ' + activeCat);
          // init Tone instrument instance according to category
          my.tInst = setupTone(activeCat);
          console.log(my.tInst);

          // navigate to instrument-config page if category is drums or keys
          // other categories are disabled while under development
          if ($(this).data('key') === 'drums' || $(this).data('key') === 'keys') {
            window.location = $(innerDiv).data('location');
          }

        });
      });

    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });
  }

  // instrumentConfig()
  //
  // handles instrument config page
  function instrumentConfig(min, max) {

    console.log("instrument config ready!");
    let maxNotes = 8;
    let nSlider = $('#notes-slider');
    let totalNotes = 1;
    let currentNote;
    let currentNoteIndex = 0;
    let octaveVal = 3;
    let minOctave = min;
    let maxOctave = max;

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
  };

  function instrumentSelect() {
    let outerDiv = $(".preselect");

    // get glossary.JSON file and parse out the instrument titles that are part of
    // the active category, then create a titled div for each instrument so user can select their choice
    $.getJSON( "data/glossary.json", function( data ) {
      activeCat = sessionStorage.getItem('activeCat'); // get activeCat value from session storage

      $.each( data, function( key, val ) {

        if (key === activeCat) {
          $.each( val.inst, function( key, val ) {
            $.each( val, function( key, val ) {
              if (key === 'title') {

                // make the divs, add the titles, divs are clickable
                let innerDiv = $("<div/>", {
                  'class' : 'instrument-select',
                  'data-key' : val, // so we know which instrument the user selects
                });
                innerDiv.appendTo(outerDiv);
                let h2 = $("<h2/>", {
                  'class' : 'instrument-title',
                  text : val,
                });
                h2.appendTo(innerDiv);

                // click event listener for each instrument div
                $(innerDiv).click(function(e) {
                  e.preventDefault();
                  activeInst = $(this).data('key'); // set active instrument according to data-key attribute
                  sessionStorage.setItem('activeInst', activeInst); // save selection to session storage
                  $(this).toggleClass( 'inst-active' );
                });
              } // END inner if statement
            });
          });
        } // END outer if statement
      });
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });

  }










}); // END
