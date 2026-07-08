let captchaAnswer = "";


let mouseEvents = [];



const canvas =
document.getElementById("captcha");


const ctx =
canvas.getContext("2d");



function randomChar(){

    const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    return chars[
        Math.floor(
            Math.random()*chars.length
        )
    ];

}



function generateText(){

    let text="";

    for(let i=0;i<5;i++){

        text += randomChar();

    }

    return text;

}



function drawCaptcha(){


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.font="50px Arial";


    for(let i=0;i<captchaAnswer.length;i++){

        ctx.save();


        ctx.translate(
            40+i*45,
            60
        );


        ctx.rotate(
            (Math.random()-0.5)*0.5
        );


        ctx.fillText(
            captchaAnswer[i],
            0,
            0
        );


        ctx.restore();

    }



    // noise lines

    for(let i=0;i<8;i++){

        ctx.beginPath();

        ctx.moveTo(
            Math.random()*300,
            Math.random()*100
        );


        ctx.lineTo(
            Math.random()*300,
            Math.random()*100
        );


        ctx.stroke();

    }



}



function newCaptcha(){

    captchaAnswer =
    generateText();


    drawCaptcha();


    document
    .getElementById("answer")
    .value="";


    mouseEvents=[];

}



function checkCaptcha(){

    const guess =
    document
    .getElementById("answer")
    .value
    .toUpperCase();


    if(
        guess === captchaAnswer
    ){

        document
        .getElementById("result")
        .innerHTML =
        "Correct";

    }

    else{

        document
        .getElementById("result")
        .innerHTML =
        "Wrong. Answer was "
        + captchaAnswer;

    }



    document
    .getElementById("mouseData")
    .innerHTML =
    JSON.stringify(
        mouseEvents
    );


}



canvas.addEventListener(
"mousemove",
function(e){


    mouseEvents.push({

        x:e.offsetX,

        y:e.offsetY,

        t:Date.now()

    });


});



newCaptcha();
