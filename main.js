img = "";
status = "";
objects = [];

function setup(){
canvas = createCanvas(380,380);
canvas.center();
video = createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector = ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML = "status: dectecting objects";

}

function draw(){
image(video,0,0,380,380);
if (status != ""){
   r = random(255);
   g = random(255);
   b = random(255);

    objectDetector.detect(video, gotResult);
    for(i = 0;i<objects.length;i++){
    document.getElementById("status").innerHTML = "status-object-detected";
    document.getElementById("object_count").innerHTML = "no-of-object-detected-are "+objects.length;
    fill(r,g,b);
    percentage = floor(objects[i].confidence*100);
    text(objects[i].label+" "+ percentage + "%" , objects[i].x +20, objects[i].y + 20);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
    }
}
  
}

function preload(){
img = loadImage("dog_cat.jpg");

}

function modelLoaded()
{
    console.log("model Loaded!");
    status = true;
}

function gotResult(error,results){
    
    if (error){
        console.error(error);
    }
    objects = results;

    console.log(results);

}
