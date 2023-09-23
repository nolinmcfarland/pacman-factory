var pacMen = []

function imgSrcForState(state) {
    return `images/pacman${state}.png`
}

function newPacMan() {
    let velocity = 1;
    let speed = 25;
    let size = 100
    let state = 1;

    let x = Math.floor(Math.random() * (window.innerWidth - size));
    let y = Math.floor(Math.random() * (window.innerHeight - size));

    let img = document.createElement('img');
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;
    img.style.position = 'absolute';
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.src = imgSrcForState(state);

    return {
        x: x,
        y: y,
        velocity: velocity,
        speed: speed,
        size: size,
        state: state,
        img: img
    };
}
function move(pacMan) {
    checkCollision(pacMan);
    setState(pacMan);
    pacMan.x += (pacMan.speed * pacMan.velocity);
    pacMan.img.style.left = `${pacMan.x}px`;
    console.log(pacMan.x);
}

function checkCollision(pacMan) {
    if (
        pacMan.x + (pacMan.speed*pacMan.velocity) + pacMan.size >= window.innerWidth 
        || pacMan.x + (pacMan.speed*pacMan.velocity) < 0
    ) {
        pacMan.velocity *= -1;
    }
}

function setState(pacMan) {
    if (pacMan.velocity === 1) {
        if (pacMan.state === 1) {
            pacMan.state = 2;
        } else {
            pacMan.state = 1;
        }
    } else {
        if (pacMan.state === 3) {
            pacMan.state = 4;
        } else {
            pacMan.state = 3;
        }
    }
    console.log(pacMan.state);
    pacMan.img.src = imgSrcForState(pacMan.state);
}

function add() {
    let pacMan = newPacMan();
    document.getElementById('pacMen').appendChild(pacMan.img);
    pacMen.push(pacMan);
}

function reset() {
    pacMen = [];
    document.getElementById("pacMen").innerHTML = '';
}

function step() {
    if (pacMen.length === 0) return
    pacMen.forEach(move);
}

setInterval(step, 100);