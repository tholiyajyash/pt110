prediction_1 = ""

Webcam.set({
width:350 , 
height:300 ,
image_format : 'png',
png_quality:95
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot()
{
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
});
}

console.log('ml5 version:' , ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ZAUV1yAmL/model.json" , modelLoaded);
function modelLoaded()
{
console.log("Model Loaded!");
}

function speak()
{
var synth  = window.speechSynthesis;
speak_data_1 = "The grand prediction is " + prediction_1;
var utterThis = new SpeechSynthesisUtterance(speak_data_1);
synth.speak(utterThis);
}

function check()
{
img = document.getElementById('captured_image');
classifier.classify(img , gotResult);
}

function gotResult(error , results)
{
if(error) {
console.error(error);
}
else{
console.log(results);
document.getElementById("result_emotion_name").innerHTML = results[0].label;
prediction_1 = results[0].label;
speak();

if(results[0].label == "Like")
{
    document.getElementById("update_emoji1").innerHTML = "&#128077;";
}


if(results[0].label == "Dislike")
{
    document.getElementById("update_emoji1").innerHTML = "&#128078;";
}


if(results[0].label == "Cheezy Fingers")
{
    document.getElementById("update_emoji1").innerHTML = "&#9996;";
}

if(results[0].label == "Up")
{
    document.getElementById("update_emoji1").innerHTML = "&#9757;";
}
}
}