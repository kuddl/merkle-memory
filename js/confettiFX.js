/* CONFETTI */
/*
 * Description
 * 
 * This script creates small confetti like sqaures of different sizes and colors and renders them to the canvas.
 * These particles rotate and fall with variable speeds and velocity.
*/

//Get Canvas by ID
let canvas = document.getElementById('confetti');
//Set Canvas dimensions
canvas.width = 1920;
canvas.height = 1080;
//Get the Canvas 2d context
let ctx = canvas.getContext('2d');
//Create an array for the number of confetti particles
let particles = [];
//Set the number of confetti particles
let numberOfParticles = 50;
//Get the current time
let lastUpdateTime = Date.now();


function setRandomColor(){
    //Set some nice colors for the confetti particles
    let colors = ['#f00','#0f0','#00f', '#0ff', '#f0f', '#ff0'];
    //Return a random color (Math.random() = float between 0 and 1 * the length of the colors array = )
    return colors[Math.floor(Math.random() * colors.length)];
}

//Update Funktion
function update () {
    //Set current time
    let now = Date.now();
    //Get time difference to last frame
     dt = now - lastUpdateTime;
    //Loop all confetti particles and splice out the ones that go over the canvas height
    for (let i = particles.length -1; i >= 0; i--) {
        let t = particles[i];
        if(t.y > canvas.height) {
            particles.splice(i, 1);
            continue;
        }
        t.y += t.gravity * dt;
        t.rotation += t.rotationSpeed;
    };
    //If there are less particles than the total number then create new particles
    while(particles.length < numberOfParticles) {
        particles.push(new Confetti(Math.random() * canvas.width, -20));
    };
    //Set last update time
    lastUpdateTime = now;
    //Create loop with 1 frame intervall
    setTimeout(update, 1);
}


//Zeichne confetti auf dem bild

function draw (){
    //Clear the canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);
    //Draw each particle to the canvas and set rotation
    particles.forEach(function (p){
        drawSqaure(p);
        drawCircle(p);
    });

      
    //Animation frame loop
    requestAnimationFrame(draw);
}

function drawSqaure(p){
    ctx.save();
    ctx.fillStyle = p.color;
    ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
    ctx.rotate(p.rotation);
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore(); 
}

function drawCircle(p){
    ctx.beginPath();
    ctx.arc(p.x+ 100, p.y+100, p.size, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.fill();
}
//Function for creating a confetti particle with all predefined and randomized properties
function Confetti(x,y) {
this.x = x;
this.y = y;
this.size = (Math.random() * 0.5 + 0.75) * 10;
this.gravity = (Math.random() * 0.5 + 0.75) * 0.1;
this.rotation = (Math.PI * 2) * Math.random();
this.rotationSpeed = (Math.PI * 2) * Math.random() * 0.001;
this.color = setRandomColor();
}

//Create the first batch of 500 particles
while(particles.length < numberOfParticles) {
    particles.push(new Confetti(Math.random() * canvas.width, Math.random() * canvas.height));
}

//Call upadte and draw to initiate the animation
update();
draw();

/*TO BE IMPLEMENTED:*/

/* Draw Star function 

function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    ctx.strokeSyle = "#000";
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath();
    ctx.lineWidth=5;
    ctx.strokeStyle='blue';
    ctx.stroke();
    ctx.fillStyle='skyblue';
    ctx.fill();

}

drawStar(75, 100, 5, 30, 15);
drawStar(175, 100, 12, 30, 10);
drawStar(75, 200, 6, 30, 15);
drawStar(175, 200, 20, 30, 25);

*/