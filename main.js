premusic = ""
scorePulsoE = 0
scorePulsoD = 0
esquerdopulsoY = 0
direitopulsoX = 0
esquerdopulsoX = 0
direitopulsoY = 0

function setup(){
    canvas = createCanvas(400,400)   
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function preload(){
    premusic = loadSound("music.mp3")
}
function gotPoses(results){
    if(results.length> 0){
        scorePulsoD = results[0].pose.keypoints[10].score
        scorePulsoE = results[0].pose.keypoints[9].score
        esquerdopulsoX = results[0].pose.leftWrist.X
        esquerdopulsoY = results[0].pose.rightWrist.Y
        direitopulsoX = results[0].pose.leftWrist.X
        direitopulsoY = results[0].pose.rightWrist.Y
    }
}
function modelLoaded(){
    console.log("modelo loadado")
}
function draw(){
    image(video, 0,0,400,400)
    canvas.center()
    fill("red")
    if(scorePulsoD>0.00002){
        circle(direitopulsoX, direitopulsoY,50)
        console.log("PULSO DIREITO FUNCIONANDO")
        if(direitopulsoY>0 && direitopulsoY<=100){
            premusic.rate(0.5)
            document.getElementById("veloci").innerHTML = "velocidade: 0.5" 
        }
        else if(direitopulsoY>100 && direitopulsoY<=200){
            premusic.rate(1)
            document.getElementById("veloci").innerHTML = "velocidade: 1"
        }
        else if(direitopulsoY>200 && direitopulsoY<=300){
            premusic.rate(1.5)
            document.getElementById("veloci").innerHTML = "velocidade: 1.5"
        }
        else if(direitopulsoY>300 && direitopulsoY<=400){
            premusic.rate(2)
            document.getElementById("veloci").innerHTML = "velocidade: 2"
        }
        else{
            premusic.rate(2.5)
            document.getElementById("veloci").innerHTML = "velocidade: 2.5"
        }
    }
    if(scorePulsoE>0.00002){
        circle(esquerdopulsoX, esquerdopulsoY, 50)
        console.log("PULSO ESQUERDO FUNCIONANDO")
        numero = Number(esquerdopulsoY)
        numeroarredondado = floor(numero)
        volume = numeroarredondado/500
        premusic.setVolume(volume)
        document.getElementById("volumi").innerHTML = "volume: " + volume 
    }
}
function playsong(){
    premusic.play()
    premusic.setVolume(0.2)
    premusic.rate(1)
}