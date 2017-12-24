$(document).ready(function(){ 

  var vid = document.getElementById('vid');
  var vidJQ = $("#vid");
  var intervalRewind;
  document.getElementById("rateValueBtn").addEventListener("click",setVideoInNewRate);
  document.getElementsByClassName("range-slider__range")[0].value = 0;

  function setVideoInNewRate(){ 
    var rate = document.getElementsByClassName("range-slider__range")[0].value; 
    var n = Number(rate);
    var stringNumber = n.toFixed(1); 
    var number = Number(stringNumber);
    rate = number;
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
              vid.currentTime += rate /30 ;
              console.log(rate);
            }
          },30);
        }
        else{
          vid.pause();
        }

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
        
      });
      
    });

  };
  
  rangeSlider();

  $(vid).on('pause',function(){
    if(document.getElementsByClassName("range-slider__range")[0].value<0){
      vid.playbackRate = 1.0;
      clearInterval(intervalRewind);
  }
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
  
  $("aside input").on('change',function() {applyVisualEffects(vidJQ);} );

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  // Define some vars required later
  var w, h, ratio;
    
  function resize(){
    if(window.innerWidth> 768){
      document.getElementsByClassName("range-slider__range")[0].min = -2;
    }
    if(window.innerWidth<= 768){
      document.getElementsByClassName("range-slider__range")[0].min = 0;
    } 
    if(window.innerWidth>656){
      vid.width= 640;  
      vid.videoWidth=640;
    }
    if(window.innerWidth<=656){
      vid.width= 570;  
      vid.videoWidth=570;
    }
    if(window.innerWidth<=590){
      vid.width= 470;
      vid.videoWidth=470;  
    }
    if(window.innerWidth<=500){
      vid.width= 390;  
      vid.videoWidth=390;
    }
    if(window.innerWidth<=410){
      vid.width= 320;  
      vid.videoWidth=320;
    }

  }
  window.addEventListener("resize",resize);


    // Add a listener to wait for the 'loadedmetadata' state so the video's dimensions can be read
  vid.addEventListener('loadedmetadata', function() {
    resize();
    console.log(canvas.width);
    console.log(canvas.height);
    // Calculate the ratio of the video's width to height
    ratio = vid.videoWidth / vid.videoHeight;
    // Define the required width as 100 pixels smaller than the actual video's width
    w = vid.width - 100;
    // Calculate the height based on the video's width and the ratio
    h = parseInt(w / ratio, 10);
    // Set the canvas width and height to the values just calculated
    canvas.width = w;
    canvas.height = h; 
    console.log(w);
    console.log(h);


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
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(tempCanvas, 0, 0, w, h);
    applyVisualEffects(newCanvas);
    var DivWithScreenShot = $("<div></div>").css("padding","10px").append(newCanvas);
    saveDiv.append(DivWithScreenShot);

  }
     
});
