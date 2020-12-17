"use strict";

let myInstrument; // user's custom insrument
let my = {
  sketch: null,
  stream: null,
  peerId: null,
  sampler: null, // Tone instrument instance
  activeCat: null, // selected instrument category
  activeInst: null, // instrument properties
};
var friend = {
  peerID: null,
  stream: null,
  activeCat: null,
  activeInst: null,
  sampler: null
};
let peer = null;
let conn = null;
let call = null;
let callStartBtn;
let callJoinBtn;
let callEndBtn;

let arrayOfSamplers = [];
let activeIndex;
let calibrated = false;

$(document).ready(function() {

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
    case "main_app":
      mainApp();
      break;
    default:
      break;
  };

  /***********************************
    MAIN APP
  ************************************/


  function mainApp() {
    // get saved instrument data from session storage
    my.activeCat = sessionStorage.getItem('my.activeCat');
    my.activeInst = JSON.parse(sessionStorage.getItem('my.activeInst'));

    // START APP
    // currentState = STATE.init;
    // Re-init sampler with saved data
    my.sampler = new Tone.Sampler({
                    urls: my.activeInst.urls,
                    baseUrl: my.activeInst.baseUrl,
                    debug: true,
                    release: 1
                  }).toDestination();


    let myVideo = document.getElementsByTagName('video')[0];
    let userCanvas;
    let instructions = $('.instructions');
    let calibrateInstructions = $('#calibrate');
    let connectInstructions = $('#connect');
    let waitingToCalibrate = $('#calibrating');

    $(myVideo).hide();
    $(connectInstructions).hide();
    $(waitingToCalibrate).hide();


    /******** Main P5 Sketch ********/

    my.sketch = function(p) {
                  let canvas;
                  let setWidth, setHeight;
                  let video;
                  let stars = [];
                  let poseNet;
                  let poses = [];
                  let amt = 0.4; // lerp amount for smoothing pose tracking
                  let ex = 0;
                  let ey = 0;

                  p.keyPressed = function() {
                    currentState = STATE.init;
                    console.log('pressed');
                  }


                  p.setup = function() {

                    setupCanvas();
                    setupStarsBg();
                    setupVidToCanvas();
                        //currentState = STATE.calibrate;

                  } // END setup()

                  p.draw = function() {
                    p.background(0);
                    displayWebcam();
                    switch (currentState) {
                      case STATE.wait:

                        break;
                      case STATE.init:

                        break;
                      case STATE.calibrate:

                        break;
                      case STATE.run:
                        drawMainInterface();
                        break;
                      default:
                        break;
                      }

                      drawStars();
                  } // END draw()

                  function setupCanvas() {
                    console.log('call setup canvas');
                    setWidth = (p.windowWidth/2) - p.windowWidth*.02;
                    setHeight = (setWidth * 3) / 4;
                    canvas = p.createCanvas(setWidth, setHeight);
                  }

                  function setupStarsBg() {
                    for (let i = 0; i < 200; i++) {
                  		stars[i] = new Star(p, 0.3, 2.6);
                  	}
                  }

                  function setupVidToCanvas() {
                    console.log('call vid to canvas');
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



                  function drawStars() {
                    for (let i = 0; i < stars.length; i++) {
                      stars[i].display(p);
                    }
                  }

                  function displayWebcam() {
                    p.translate(video.width, 0);
                    p.scale(-1, 1);
                    p.image(video, 0, 0, p.width, p.height);
                  }

                  function drawMainInterface() {
                    p.translate(video.width, 0);
                    p.scale(-1, 1);
                    p.background(0);

                    p.noFill();
                    p.stroke(255, 0, 0);
                  //  bezier(instrument.ax1, instrument.ay1, instrument.cx1, instrument.cy1, instrument.cx2, instrument.cy2, instrument.ax2, instrument.ay2);
                  //  rect(instrument.x, instrument.y, instrument.w, instrument.h);

                    // Draw keypoints and skeleton
                    drawKeypoints(p);
                    drawSkeleton(p);

                    // instrument.display();
                  }


                    /****************************
                            POSE TRACKING
                    *****************************/

                    function setupPoseTracking() {
                      console.log('setup pose tracking');
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


                    function calibratePoses() {
                        setTimeout(function(){
                          $(waitingToCalibrate).fadeOut(500, function() {
                            $(waitingToCalibrate).hide();
                            $(connectInstructions).fadeIn(800, function(){});
                          });
                          calibrated = true;
                          setTimeout(function(){
                            $(userCanvas).removeClass('grayscale');
                          }, 500);
                        }, 7000);
                      }

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
                              //console.log("total " + smoothPoseKeypoints[i].i + ": " + smoothPoseKeypoints[i].cal / smoothPoseKeypoints[i].t);
                              if (smoothPoseKeypoints[i].cal / smoothPoseKeypoints[i].t > 0.1) {
                                smoothPoseKeypoints[i].pass = true;
                              } else {
                                smoothPoseKeypoints[i].pass = false;
                              }
                              //console.log("pass: " + smoothPoseKeypoints[i].pass);
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

                    /***********************************
                      MAIN APP HELPER FUNCTIONS
                    ************************************/

                    function drawKeypoints(p) {
                      let r = 10;
                      if (poses.length > 0) {
                        for (let i = 0; i < smoothPoseKeypoints.length; i++) {
                          if (smoothPoseKeypoints[i].pass === true) {
                            let x = smoothPoseKeypoints[i].x;
                            let y = smoothPoseKeypoints[i].y;
                            if (i <= 4) {
                              r = 3;
                            }
                            else {
                              r = 7;
                            }
                            p.fill(255);
                            p.noStroke();
                            p.ellipse(x, y, r, r);
                          }
                        }
                      }
                    }

                    function drawSkeletonPart(p, a, b) {
                      let pointA = a;
                      let pointB = b;

                      p.stroke(255);
                      p.line(pointA.x, pointA.y, pointB.x, pointB.y);
                    }

                    function drawSkeleton(p) {
                      for (let i = 0; i < smoothPoseSkeleton.length; i ++) {
                        let a = smoothPoseSkeleton[i][0];
                        let b = smoothPoseSkeleton[i][1];
                        if (smoothPoseKeypoints[a].pass === true && smoothPoseKeypoints[b].pass === true) {
                          drawSkeletonPart(p, smoothPoseKeypoints[a], smoothPoseKeypoints[b]);
                        }
                      }
                    }

                    let appStart = $('#app-start-btn');
                    $(appStart).one( "click", function() {
                      $(calibrateInstructions).fadeOut(500, function(){
                        $(waitingToCalibrate).fadeIn(800, function(){
                          setupPoseTracking();
                          currentState = STATE.calibrate;
                        });
                      });

                    });

              } // END sketch

              /*
              $(myVideo).hide();
              $(connectInstructions).hide();
              $(waitingToCalibrate).hide();*/

      // APPEND P5 SKETCH TO DOM, CAPTURE STREAM FROM CANVAS
      let userNodeOne = document.getElementById('user-one');
      new p5(my.sketch, userNodeOne);


      setTimeout(()=>{
        userCanvas = document.getElementsByTagName('canvas')[1];
        $(userCanvas).addClass('grayscale');
        my.stream = userCanvas.captureStream();
      }, 500);

      /***********************************
        PEER-TO-PEER
      ************************************/

      callStartBtn = $('#connect-start-btn');
      callJoinBtn = $('#connect-join-btn');

      $(callStartBtn).click(function(e) {
        e.preventDefault();
        start();
      });

      $(callJoinBtn).click(function(e) {
        e.preventDefault();
        join();
      });

      $(callEndBtn).click(function(e) {
        e.preventDefault();
        end();
      });


      function initialize() {
        peer = new Peer(null, {
          debug: 2
        });

        peer.on('open', function(id) {
          my.peerID = id;
        });

        peer.on('error', function(err) {
          alert('' + err);
        });

        peer.on('disconnect', function() {

        });
      }

      function start() {
        initialize();
        peer.on('open', function() {
          alert('Ask your friend to join using your peer ID: ' + my.peerID);
          // $('#status').text(status.waiting);
        });
        peer.on('connection', function(c) {
          if (conn) {
            c.close();
            return;
          }
          conn = c;
          console.log('conn connection');
        });
        peer.on('call', function(c) {
          if (call) {
            c.close();
            return;
          }
          call = c;
          call.answer(my.stream);
          // $('#status').text(status.connected);
          begin();
        });
      }

      function join() {
        initialize();
        peer.on('open', function() {
          var destId = prompt("Friend's peer ID:");
          conn = peer.connect(destId, {
            // options
          });
          conn.on('open', function() {
            console.log('conn open');
          });
          call = peer.call(destId, my.stream, {
            // options
          });
          friend.peerID = destId;
          begin();
        });
      }

      function end() {
       console.log('call end');
       call.close();
       conn.close();
       reset();
     }

      function reset() {
         $('#status').text(status.closed);
         my.peerID = null;
         friend.peerID = null;
         peer = null;
         call = null;
         conn = null;
         $(video).hide();
         document.getElementById('user-two-name').innerHTML = " ";
       }

       function begin() {

        call.on('stream', function(stream) {
          friend.stream = stream;
          // $('#status').text(status.connected);
          $(video).show();
          video.srcObject = friend.stream;
        });

        conn.on('open', function() {
          console.log('conn open');
        });

        conn.on('close', function() {
          peer.destroy();
          reset();
        });

      }


  }// end MAIN APP


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
          my.activeCat = $(this).data('key'); // set active category to this category
          // save my.activeCat to session storage so it persists across page loads
          sessionStorage.setItem('my.activeCat', my.activeCat);
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


  // instrumentSelect()
  //
  // handles instrument config page
  function instrumentSelect() {
    let octaveMin = " ";
    let octaveMax = " ";

    // get glossary.JSON file and parse out the instrument titles that are part of
    // the active category, then create a titled div for each instrument so user can select their choice
    $.getJSON( "data/glossary.json", function( data ) {

      // retrieve active category from session storage
      my.activeCat = sessionStorage.getItem('my.activeCat');
      // create an array hold all the instrument Samplers
      // the first value is the category class
      let outerDiv = $(".preselect");
      // iterate through upper level objects (categories)
      for (let i = 0; i < data.length; i++) {
        // if this category is the one the user selected
        // let's customize the config page and setup the related instruments
        if (data[i].class === my.activeCat) {
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
                 octaveMin = inst.octaveRange[0];
                 octaveMax = inst.octaveRange[1];
               }
              innerDiv = $("<div/>", {
                'class' : 'instrument-select',
                'data-key' : inst.id, // so we know which instrument the user selects
                'data-octave-min' : octaveMin,
                'data-octave-max' : octaveMax
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
            let s = new Tone.Sampler({
                      urls: inst.urls,
                      baseUrl: cat.baseUrl,
                      debug: true,
                      release: 1
                    }).toDestination();
            arrayOfSamplers.push(inst.id);
            arrayOfSamplers.push(s);
            console.log(arrayOfSamplers);


              // }

            // click event listener for instrument div
            $(innerDiv).click(function(e) {
              e.preventDefault();
              // create 'active' object with instrument properties
              // and save to session storage
              my.activeInst = {
                name: inst.id,
                urls: inst.urls,
                baseUrl: cat.baseUrl,
                notes: [],
                min: $(this).data('octave-min'),
                max: $(this).data('octave-max')
              };
              sessionStorage.setItem('my.activeInst', JSON.stringify(my.activeInst));

              // toggle div styles according to active selection
              (() => {
                $(this).toggleClass( 'inst-active' );
                $('.instrument-select').each(function() {
                  if ($(this).data('key') != my.activeInst.name) {
                    $(this).removeClass('inst-active');
                  }
                });
              })();



              activeIndex = findSampler();
            });
          } // END inner for loop

        }

      } // END outer for loop
    });

    instrumentConfig();

    // instrumentConfig()
    //
    // config instrument once selected
    function instrumentConfig() {
      let maxNotes = 8;
      let nSlider = $('#notes-slider');
      let totalNotes = 1;
      let currentNote;
      let currentNoteIndex = 0;
      let octaveVal = 3;

      console.log('octave val: ' + octaveVal);

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

      //  Octave Spinner
      $( function() {
        $('#octave-spinner').spinner({
          spin: function(event, ui) {
            octaveVal = ui.value;
            octaveMin = my.activeInst.min;
            octaveMax = my.activeInst.max;
            console.log('octaveMin:' + octaveMin);
            if (ui.value > octaveMax) {
              $(this).spinner( "value", octaveMin );
              return false;
            }
            else if ( ui.value < octaveMin ) {
              $(this).spinner( "value", octaveMax );
              return false;
            }
          }
        }).val(octaveVal);
      });

      // Piano Note selector (key click events)
      $('.key').click(function(e) {
        console.log('click');
        e.preventDefault();
        currentNote = $(this).attr('data-key');

        console.log(arrayOfSamplers[activeIndex].loaded);
        let n = currentNote + octaveVal;
        console.log('n: ' + n);
        arrayOfSamplers[activeIndex].triggerAttackRelease(n, 0.5);
        if (currentNoteIndex < totalNotes) {
          addNote();
          currentNoteIndex++;
        }
      });

      // reset display div for new notes selection
      function notesToSelect() {
        console.log("call notesToSelect");
        $('#notes-selected').empty();
        my.activeInst.notes = []; // clear global notes array
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
            my.activeInst.notes.push(txt);
          }
        });
      }

      // CLEAR button click event handler
      $('#clear-notes').click(function(e) {
        e.preventDefault();
        $( '.sel-note' ).each(function(index) {
          $(this).empty();
        });
        currentNoteIndex = 0;
        my.activeInst.notes = []; // clear global notes array
      });

      // SAVE button click event handler
      $('#save-notes').click(function(e) {
        e.preventDefault();
        console.dir(my.activeInst);
        sessionStorage.setItem('my.activeInst', JSON.stringify(my.activeInst));
      });

      // GO button click event handler
      $('#go-btn').click(function(e) {

      });

    } // END instrumentConfig

  } // END instrumentSelect


  /***********************************
    HELPER FUNCTIONS
  ************************************/

  function findSampler() {
    my.activeInst = JSON.parse(sessionStorage.getItem('my.activeInst'));
    for (let i = 0; i < arrayOfSamplers.length; i++) {
      if (arrayOfSamplers[i] === my.activeInst.name) {
        return i+1;
      }
    }
  }

}); // END
