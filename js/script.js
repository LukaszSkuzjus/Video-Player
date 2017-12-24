$(document).ready(function(){ 

  var vid = document.getElementById('vid');
  var vidJQ = $("#vid");
  var intervalRewind;
  document.getElementById("rateValueBtn").addEventListener("click",setVideoInNewRate);
  document.getElementsByClassName("range-slider__range")[0].value = 0;

  function setVideoInNewRate(){ 
    var rate = document.getElementsByClassName("range-slider__range")[0].value; // nie do konca number
    var n = Number(rate);
    var stringNumber = n.toFixed(1); // metoda obiektu number a nie Math
    var number = Number(stringNumber);
    rate = number;
        //rum = Number(mum);
      //rateValueBtn.value=range[0].value;
      //vid.playbackRate = 1.0;
    clearInterval(intervalRewind);
        if(rate >0){
          vid.playbackRate = rate;
        }
        else if(rate <0){
          intervalRewind = setInterval(function(){
            vid.playbackRate = 1.0;
            if(vid.currentTime == 0){
               clearInterval(intervalRewind);
               vid.pause();
            }
            else {
          //rum = Number(mum);
              vid.currentTime += rate /30 ;
              console.log(rate);
            }
          },30);
        }
        else{
          vid.pause();
        }
        
        //console.log(r);
        //v.load();
  }

  var rangeSlider = function(){
    var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');
      
    slider.each(function(){
      value.each(function(){
        var value = $(this).prev().attr('value');
        
        $(this).html(value);
      });

      range.on('input', function(){
        $(this).next(value).html(this.value);
        rateValueInput.value=range[0].value;
        
      });
      
    });

  };

  rangeSlider();

//rateValueBtn.value = document.getElementsByClassName("range-slider__range")[0].value;
/*
$(vid).on('play',function(){
    vid.playbackRate = 1.0;
    clearInterval(intervalRewind);
});
*/
  $(vid).on('pause',function(){
    vid.playbackRate = 1.0;
    clearInterval(intervalRewind);
  });

  $("#speed").click(function() { // button function for 4x fast speed forward
    vid.playbackRate = 4.0;
  });


  $("#goBack").click(function() { // button function for rewind
    vid.currentTime -= 5 ;
  });

  function applyVisualEffects(referenceToApplyTo){
    var blur = $("#blur").val();
    var saturate = $("#saturate").val();
    var hue = $("#hue").val();
    var brightness = $("#brightness").val();
    var contrast = $("#contrast").val();
    var invert = $("#invert").val();
    var sepia = $("#sepia").val();
    
    var filters = "blur(" + blur + "px) saturate(" + saturate + ") hue-rotate(" + hue + "deg) brightness(" + brightness + ") contrast(" + contrast + ") invert(" + invert + ") sepia(" + sepia + ")";
    
    referenceToApplyTo.css('-webkit-filter', filters);
    
    $("#blur-val").text(blur);
    $("#saturate-val").text(saturate);
    $("#hue-val").text(hue);
    $("#brightness-val").text(brightness);
    $("#contrast-val").text(contrast);
    $("#invert-val").text(invert);
    $("#sepia-val").text(sepia);
  }
  
  function resetVisualEffects(){
    var blur = $("#blur").val(0);
    var saturate = $("#saturate").val(1);
    var hue = $("#hue").val(0);
    var brightness = $("#brightness").val(0.9);
    var contrast = $("#contrast").val(1);
    var invert = $("#invert").val(0);
    var sepia = $("#sepia").val(0);
    blur = 0;
    saturate =1;
    hue = 0;
    brightness = 0.9;
    contrast = 1;
    invert = 0;
    sepia = 0;
    
    var filters = "blur(" + blur + "px) saturate(" + saturate + ") hue-rotate(" + hue + "deg) brightness(" + brightness + ") contrast(" + contrast + ") invert(" + invert + ") sepia(" + sepia + ")";
    
    $("#vid").css('-webkit-filter', filters);
    
    $("#blur-val").text(blur);
    $("#saturate-val").text(saturate);
    $("#hue-val").text(hue);
    $("#brightness-val").text(brightness);
    $("#contrast-val").text(contrast);
    $("#invert-val").text(invert);
    $("#sepia-val").text(sepia);
  }

  window.onload = resetVisualEffects;// because browser remembers values from before refreshing the page
  
  $("aside input").on('change',function() {applyVisualEffects(vidJQ);} );// jednak mozna wstawic referencjwe a nie uzywac tylko jednej wlasnosci obiektu 

  var canvas = document.getElementById('canvas');
  //var canvasJQ = $("canvas");
  //var currentScreenShot = new Image(w,h);
    // Get a handle on the 2d context of the canvas element
  var context = canvas.getContext('2d');
    // Define some vars required later
  var w, h, ratio;
    
    // Add a listener to wait for the 'loadedmetadata' state so the video's dimensions can be read
  vid.addEventListener('loadedmetadata', function() {
    // Calculate the ratio of the video's width to height
    ratio = vid.videoWidth / vid.videoHeight;
    // Define the required width as 100 pixels smaller than the actual video's width
    w = vid.videoWidth - 100;
    // Calculate the height based on the video's width and the ratio
    h = parseInt(w / ratio, 10);
    // Set the canvas width and height to the values just calculated
    canvas.width = w;
    canvas.height = h;      
  }, false);
    
    
    // Define the size of the rectangle that will be filled (basically the entire element)
  // Takes a snapshot of the video
  function snap() {
    context.fillRect(0, 0, w, h);
    // Grab the image from the video
    context.drawImage(vid, 0, 0, w, h);
    canvas = $(canvas);
    applyVisualEffects(canvas);
    
  }


  var snapBtn = document.getElementById('snapBtn');
  var saveBtn = document.getElementById('saveBtn');
  snapBtn.addEventListener('click',snap);
  saveBtn.addEventListener('click',saveOnThePage);

  function saveOnThePage() {
    
    var saveDiv = $("#saveDiv");
    var newCanvas = $("<canvas></canvas>").attr({width:w , height:h});
    var tempCanvas = canvas[0];//just to hold canvas[0] - canvas DOM Node
    var newCanvasDOMNode = newCanvas[0];
    var ctx = newCanvasDOMNode.getContext('2d');
    // Define the size of the rectangle that will be filled (basically the entire element)
    ctx.fillRect(0, 0, w, h);
    //newCanvasDOMNode = canvas[0];
    ctx.drawImage(tempCanvas, 0, 0, w, h);
    // Grab the image from the video
    applyVisualEffects(newCanvas);
    var DivWithScreenShot = $("<div></div>").css("padding","10px").append(newCanvas);// do apend nie musze miec jq colexton ?!
    saveDiv.append(DivWithScreenShot);

  }
     
});


// nie robie zapisu samemu na serwer czy na disk bo to w sumie nie potzrzebne - jak zapisze 
// jako zdjecie to przegladarka ma wpdowana opcje zapisu
//po za tym to jest trudne
// trzeba mieci video na tym samym serwezrze uzyc localhost na gruncie
// xampie albi github 
// nie wiem czy to wszystko zadzila i jak to zrobic 
// stranie mal materialow jak jak to zrobic trzeba samemu duzo pomyslec
// kiedy to wroce i to zrobie jako ciekawe zadania
//And the file needs to come from a web server, which is the same one the web page itself is on 


//document.getElementsByClassName("range-slider__range")[0].value