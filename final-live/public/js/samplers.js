


/*

samplers.keys.piano = new Tone.Sampler({
  urls: {
    C4: "piano.mp3"
  },
  baseUrl: ""
});
*/

/*
samplers.keys.piano = new Tone.Sampler({
        urls: {
        C4: "snare.mp3"
        },
        baseUrl: "https://tonejs.github.io/audio/drum-samples/acoustic-kit/",
      }).toDestination();
*/

/*
    //        console.log('name: ' + inst.id + '\n url: ' + inst.url + '\n baseUrl: ' + cat.baseUrl);

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
        // get glossary.JSON file and parse out the instrument titles that are part of
        // the active category, then create a titled div for each instrument so user can select their choice
        $.getJSON( "data/glossary.json", function( data ) {
          // retrieve active category from session storage
          activeCat = sessionStorage.getItem('activeCat');


          // bind click event listener so user can select instrument

          let outerDiv = $(".preselect");
          // iterate through upper level objects (categories)
          for (let i = 0; i < data.length; i++) {
            // if this category is the one the user selected
            // let's customize the config page and setup the related instruments
            if (data[i].class === activeCat) {
              // create an array hold all the instrument Samplers
              // the first value is the category class
              let c = [activeCat];
              // iterate through instrument objects
              for (let j = 0; j < data[i].inst.length; j++) {
                let cat = data[i];
                let inst = cat.inst[j];

                // create an instrument-select div and append to DOM
                let innerDiv;
                (() => {
                  // if instrument has an octave range
                  // include as data attribute
                  let min = "undefined";
                  let max = "undefined"
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
                (() => {
                  let s = new Tone.Sampler({
                    name: inst.id,
                    urls: {
                      C4: inst.url
                    },
                    baseUrl: cat.baseUrl
                  }).toDestination();
                  // push to category Sampler array
                  c.push(s);
                })();

                // click event listener for instrument div
                $(innerDiv).click(function(e) {
                  e.preventDefault();
                  activeInst = $(this).data('key'); // set active according to selection
                  sessionStorage.setItem('activeInst', activeInst); // save selection to session storage
                  $(this).toggleClass( 'inst-active' ); // toggle div styles


                });
              } // END inner for loop
            }
          } // END outer for loop

*/
