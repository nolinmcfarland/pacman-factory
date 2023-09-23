var pacMen = []

/**
 * Returns the src for a pac-man's image from the provided state.
 * 
 * @param {*} state The pac-man's state.
 * @returns The img src for the provided state.
 */
function imgSrcForState(state) {
    return `images/pacman${state}.png`
}

/** 
 * Creates a new pac-man with a random position within the window's inner bounds.
 * 
 * @returns A pac-man.
 */
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

/**
 * Moves the provided pac-man and udpates its state.
 * 
 * @param {*} pacMan The pac-man for which to move.
 */
function move(pacMan) {
    checkCollision(pacMan);
    setState(pacMan);
    pacMan.x += (pacMan.speed * pacMan.velocity);
    pacMan.img.style.left = `${pacMan.x}px`;
    console.log(pacMan.x);
}

/**
 * Checks if moving the pac-man would cause a collision with the window's inner bounds and,
 * if so, reverses its velocity.
 * 
 * @param {*} pacMan The pac-man for which to check collisions.
 */
function checkCollision(pacMan) {
    if (
        pacMan.x + (pacMan.speed*pacMan.velocity) + pacMan.size >= window.innerWidth 
        || pacMan.x + (pacMan.speed*pacMan.velocity) < 0
    ) {
        pacMan.velocity *= -1;
    }
}

/**
 * Sets the next state for the provided pac-man.
 * 
 * @param {*} pacMan The pac-man for which to set state.
 */
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

/**
 * Adds a new pac-man to the screen.
 */
function add() {
    let pacMan = newPacMan();
    document.getElementById('pacMen').appendChild(pacMan.img);
    pacMen.push(pacMan);
}

/**
 * Reets the screen removing all pac-men.
 */
function reset() {
    pacMen = [];
    document.getElementById("pacMen").innerHTML = '';
}

/**
 * Moves all pac-men.
 */
function step() {
    if (pacMen.length === 0) return
    pacMen.forEach(move);
}

setInterval(step, 100);