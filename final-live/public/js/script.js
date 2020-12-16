"use strict";

let myInstrument; // user's custom insrument
let activeCat; // which category is selected by user
let activeInst;
let notes = [];
let my = {
  sketch: null,
  tInst: null // Tone instrument instance
};
let arrayOfSamplers = [];
let activeIndex;

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
  };
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
      instrumentSelect();
      break;
    case "landing_page":
      landingPage();
      break;
    default:
      break;
  };


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
    // get glossary.JSON file and parse out the first layer of keys (=categories)
    // for each category, create a corresponding menu item with the same title
    $.getJSON( "data/glossary.json", function( data ) {
      let outerDiv = $(".categories");
      // iterate through upper level object (categories)
      for (let i = 0; i < data.length; i++) {
        // create a category-select div and append to DOM
        let innerDiv;
        (() => {
          innerDiv = $("<div/>", {
            'class' : 'category-select',
            'data-key' : data[i].class, // this will help us know which category the user selects
            'data-location' : "instrument-config.html"
          });
          innerDiv.appendTo(outerDiv);
          let h2 = $("<h2/>", {
            'class' : 'category-title',
            text : data[i].class,
          }); // end H2
          h2.appendTo(innerDiv);
        })();

        // click event listener for category div
        $(innerDiv).click(function(e) {
          e.preventDefault();
          activeCat = $(this).data('key'); // set active category to this category
          // save activeCat to session storage so it persists across page loads
          sessionStorage.setItem('activeCat', activeCat);
          // navigate to instrument-config page if category is drums or keys
          // other categories are disabled while under development
          if ($(this).data('key') === 'drums' || $(this).data('key') === 'keys') {
            window.location = $(innerDiv).data('location');
          }
        }); // END click event handler
      } // END for loop
    })
    .done(function() {
      console.log( "done" );
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
    let octaveVal = min;

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

    // reset display div for new notes selection
    function notesToSelect() {
      console.log("call notesToSelect");
      $('#notes-selected').empty();
      notes = []; // clear global notes array
      for (let i = 0; i < totalNotes; i++) {
        $('<span class="sel-note">').appendTo('#notes-selected');
      }
    }

    // add selected note to display div
    // push note to global notes array
    function addNote() {
      $( '.sel-note' ).each(function(index) {
        if (index === currentNoteIndex) {
          let txt = currentNote + octaveVal;
          $(this).text(txt);
          notes.push[txt];
        }
      });
    }

    // Piano Note selector (key click events)
    $('.key').click(function(e) {
      e.preventDefault();
      currentNote = $(this).attr('data-key');
      console.log('currentNote = ' + currentNote + octaveVal);

      console.log('loaded');
      console.log(arrayOfSamplers[activeIndex].loaded);
      let n = currentNote + octaveVal;
      console.log(typeof(n));
      arrayOfSamplers[activeIndex].triggerAttackRelease(n, 0.5);
      if (currentNoteIndex < totalNotes) {
        addNote();
        currentNoteIndex++;
      }
    });

    // CLEAR button click event handler
    $('#clear-notes').click(function(e) {
      e.preventDefault();
      $( '.sel-note' ).each(function(index) {
        $(this).empty();
      });
      currentNoteIndex = 0;
      notes = []; // clear global notes array
    });

    //  Octave Spinner
    $( function() {
      $('#octave-spinner').spinner({
        spin: function(event, ui) {
          octaveVal = ui.value;
          if (ui.value > max) {
            $(this).spinner( "value", min );
            return false;
          }
          else if ( ui.value < 1 ) {
            $(this).spinner( "value", max );
            return false;
          }
        }
      }).val(octaveVal);
    });

  };

  function instrumentSelect() {
    let min = " ";
    let max = " ";
    // get glossary.JSON file and parse out the instrument titles that are part of
    // the active category, then create a titled div for each instrument so user can select their choice
    $.getJSON( "data/glossary.json", function( data ) {

      // retrieve active category from session storage
      activeCat = sessionStorage.getItem('activeCat');
      // create an array hold all the instrument Samplers
      // the first value is the category class
      let outerDiv = $(".preselect");
      // iterate through upper level objects (categories)
      for (let i = 0; i < data.length; i++) {
        // if this category is the one the user selected
        // let's customize the config page and setup the related instruments
        if (data[i].class === activeCat) {
          let offset = 0;
          // iterate through instrument objects
          for (let j = 0; j < data[i].inst.length; j++) {
            let cat = data[i];
            let inst = cat.inst[j];

            // create an instrument-select div and append to DOM
            let innerDiv;
            (() => {
              // if instrument has an octave range
              // include as data attribute
               if (inst.octaveRange) {
                 min = inst.octaveRange[0];
                 max = inst.octaveRange[1];
               }
              innerDiv = $("<div/>", {
                'class' : 'instrument-select',
                'data-key' : inst.id, // so we know which instrument the user selects
                'data-octave-min' : min,
                'data-octave-max' : max
              });
              innerDiv.appendTo(outerDiv);
              // add title to div
              let h2 = $("<h2/>", {
                'class' : 'instrument-title',
                text : inst.id,
              });
              h2.appendTo(innerDiv);

            })();

            // init a Tone.Sampler according to instrument object properties
            arrayOfSamplers[j + offset] = inst.id;
            offset++;
            arrayOfSamplers[j + offset] = new Tone.Sampler({
                      urls: inst.urls,
                      baseUrl: cat.baseUrl,
                      debug: true,
                      release: 1
                    }).toDestination();
            console.log(arrayOfSamplers);

              // }

            // click event listener for instrument div
            $(innerDiv).click(function(e) {
              e.preventDefault();
              // create 'active' object with instrument properties
              // and save to session storage
              activeInst = {
                name: inst.id,
                urls: inst.urls,
                baseUrl: cat.baseUrl,
                debug: true
              };
              sessionStorage.setItem('activeInst', JSON.stringify(activeInst));


              // toggle div styles according to active selection
              (() => {
                $(this).toggleClass( 'inst-active' );
                $('.instrument-select').each(function() {
                  if ($(this).data('key') != activeInst.name) {
                    $(this).removeClass('inst-active');
                  }
                });
              })();

              activeIndex = findSampler();
              console.log(activeIndex);
              console.log(arrayOfSamplers[activeIndex].get());

            });

            instrumentConfig(min, max);

          } // END inner for loop
        }
      } // END outer for loop
    });
  }


  /***********************************
    HELPER FUNCTIONS
  ************************************/

  function findSampler() {
    activeInst = JSON.parse(sessionStorage.getItem('activeInst'));
    for (let i = 0; i < arrayOfSamplers.length; i++) {
      if (arrayOfSamplers[i] === activeInst.name) {
        return i+1;
      }
    }
  }

}); // END