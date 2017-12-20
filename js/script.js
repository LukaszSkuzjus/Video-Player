$(document).ready(function(){ 

    var vid = document.getElementById('vid');
    var intervalRewind;
    document.getElementById("stopBtn").addEventListener("click", function(){
        vid.pause();
    });

    var rateValueInput = document.getElementById("rateValue");
    rateValueInput.value=0;

    document.getElementById("rateValueBtn").addEventListener("click",playVideoInNewRate);
       


    function playVideoInNewRate(){
        var rate = document.getElementsByClassName("range-slider__range")[0].value; // nie do konca number
        var n = Number(rate);
        var stringNumber = n.toFixed(1); // metoda obiektu number a nie Math
        var number = Number(stringNumber);
        rate = number;
        //rum = Number(mum);


         var slider = document.getElementsByClassName('range-slider');
      var range = document.getElementsByClassName('range-slider__range');
      var value = document.getElementsByClassName('range-slider__value');
    
 

      range[0].value= rateValueInput.value;
      value[0].innerHTML =rateValueInput.value;
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

    rateValueInput.addEventListener('input',function(){
       var slider = document.getElementsByClassName('range-slider');
      var range = document.getElementsByClassName('range-slider__range');
      var value = document.getElementsByClassName('range-slider__value');
      if(rateValueInput.value.toString() === ""){
        range[0].value= 0;
        value[0].innerHTML =0;
      } 
      else if(rateValueInput.value >2){
        range[0].value= 2;
        value[0].innerHTML =2;
      }
      else if(rateValueInput.value <-2){
        range[0].value= -2;
        value[0].innerHTML =-2;
      }

      else{
        range[0].value= rateValueInput.value;
        value[0].innerHTML =rateValueInput.value;
      }
    });

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
$(vid).on('pause',function(){
    vid.playbackRate = 1.0;
    clearInterval(intervalRewind);
});
*/
$("#speed").click(function() { // button function for 4x fast speed forward
    vid.playbackRate = 4.0;
});
$("#negative").click(function() { // button function for rewind
   intervalRewind = setInterval(function(){
       vid.playbackRate = 1.0;
       if(vid.currentTime == 0){
           clearInterval(intervalRewind);
           vid.pause();
       }
       else{

          var rate = document.getElementsByClassName("range-slider__range")[0].value;
        var n = Number(rate);
        var stringNumber = n.toFixed(1);
        var number = Number(stringNumber);
        rate = number;
        //rum = Number(mum);
           vid.currentTime += rate /30 ;
           console.log(rate);
       }
                },30);
});

$("#goBack").click(function() { // button function for rewind
   vid.currentTime -= 5 ;
});

$("input").on('change',function () {
  var blur = $("#blur").val();
  var saturate = $("#saturate").val();
  var hue = $("#hue").val();
  var brightness = $("#brightness").val();
  var contrast = $("#contrast").val();
  var invert = $("#invert").val();
  var sepia = $("#sepia").val();
  
  var filters = "blur(" + blur + "px) saturate(" + saturate + ") hue-rotate(" + hue + "deg) brightness(" + brightness + ") contrast(" + contrast + ") invert(" + invert + ") sepia(" + sepia + ")";
  
  $("#vid").css('-webkit-filter', filters);
  
  $("#blur-val").text(blur);
  $("#saturate-val").text(saturate);
  $("#hue-val").text(hue);
  $("#brightness-val").text(brightness);
  $("#contrast-val").text(contrast);
  $("#invert-val").text(invert);
  $("#sepia-val").text(sepia);
});

// Get handles on the video and canvas elements
    





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