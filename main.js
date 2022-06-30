status_ = "";
value = "";
objects = [];

function setup()
{
    video = createCapture(VIDEO);
    video.size(480, 350);
    video.hide();
    canvas = createCanvas(480, 350);
    canvas.center();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    value = document.getElementById("text_box").value;
}

function draw()
{
    image(video, 0, 0, 480, 350);
    if(status_ != "")
    {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Detecting Objects";

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 10);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == value)
            {
                video.stop();
                document.getElementById("object_found").innerHTML = value + " found";
                objectDetector.detect(gotResult);
            }
            else
            {
                document.getElementById("object_found").innerHTML = "Object Not Found";
            }
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded");
    status_ = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}