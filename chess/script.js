
// convert 1D matrix to 2D matrix
const tmpBoxes = document.getElementsByClassName('box');
const boxes = [];
for (let i=0; i<8; i++) {
    boxes[i] = [];
    for (let j=0; j<8; j++) {
        boxes[i].push(tmpBoxes[j+i*8]);
    }
}

window.onload = function() {
    let chesses = document.querySelectorAll(".chess");
    for (const chess of chesses) {
        if (chess.classList[1] === 'pawn')
        {
            // Fist move of pawn is special
            chess.firstStep = true;
        }
        setupDragDrop(chess);
    }
}

function setupDragDrop(obj) {
    obj.onmousedown = function(e) {
        if (isNaN(parseInt(this.style.left))) {
            this.style.left = this.offsetLeft + "px";
        }
        if (isNaN(parseInt(this.style.top))) {
            this.style.top = this.offsetTop + "px";
        }


        this.oldX = e.clientX;
        this.oldY = e.clientY;
        this.superOldX = e.clientX;
        this.superOldY = e.clientY;
        this.isDown = true;
        this.style['z-index'] = 2;
    };

    obj.onmouseup = function(e) {
        this.superNewX = e.clientX;
        this.superNewY = e.clientY;
        this.isDown = false;
        
        this.style['z-index'] = 1;
        move(obj);
    };

    obj.onmousemove = function(e) {
        if (this.isDown) {
            let dx = e.clientX - this.oldX;
            let dy = e.clientY - this.oldY;

            this.style.left = parseInt(this.style.left) + dx + "px";
            this.style.top = parseInt(this.style.top) + dy + "px";

            this.oldX = e.clientX;
            this.oldY = e.clientY;
        }
    }; 
}

function move(obj) {
    let superdx = obj.superNewX - obj.superOldX;
    let superdy = obj.superNewY - obj.superOldY;
    // console.log(superdx,superdy);
    let stepX = Math.round(superdx/80);
    let stepY = Math.round(superdy/80);
    // console.log('MOVEEEEEEEE')
    console.log(stepX, stepY);
    console.log(obj.classList[1]);
    if (!canIMove(obj, stepX, stepY))
    {
        stepX = 0;
        stepY = 0;
    }
    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            if (boxes[i][j] === obj.offsetParent) {
                // console.log(i,j);
                // console.log(boxes[i][j]);
                if (boxes[i - stepY][j + stepX]) {
                    // console.log(obj);
                    // console.log(boxes[i - stepY][j + stepX]);
                    
                    boxes[i - stepY][j + stepX].appendChild(obj);
                    obj.style.left = "50%";
                    obj.style.top = "50%";
                    return;
                }
            }
        }
    }
    
}

function canIMove(obj, stepX, stepY) {
    const func = obj.classList[1];
    switch (func) {
        case 'pawn':
            // care about they faction
            const faction = obj.classList[2];
            if (stepX === -1 || stepX === 1) {
                return canIEat();
            }
            if (stepX != 0) {
                return false;
            }
            if (faction === 'white') {
                if (stepY === -1 || (stepY === -2 && obj.firstStep === true)) {
                    obj.firstStep = false;
                        if (!IsStuck()) {
                        return true;
                    }
                }
            } else if (faction === 'black') {
                if (stepY === 1 || (stepY === 2 && obj.firstStep === true)) { 
                    obj.firstStep = false;
                        if (!IsStuck()) {
                        return true;
                    }
                }
            }
            return false;
        
        case 'rook':
            if (stepX === 0 || stepY === 0) {
                if (!IsStuck()) {
                    return true;
                }
            }
            return false;
        
        case 'bishop':
            if (Math.abs(stepX) === Math.abs(stepY)) {
                if (!IsStuck()) {
                    return true;
                }
            }
            return false;
        
        case 'queen':
            if ((Math.abs(stepX) === Math.abs(stepY)) || ((stepX === 0 || stepY === 0))) {
                if (!IsStuck()) {
                    return true;
                }
            }
            return false;
        
        case 'king':
            if (Math.abs(stepX) <= 1 && Math.abs(stepY) <= 1) {
                if (!IsStuck()) {
                    return true;
                }
            }
            return false;
        
        case 'knight':
            if ((Math.abs(stepX) === 1 && Math.abs(stepY) === 2) || (Math.abs(stepX) === 2 && Math.abs(stepY) === 1)) {
                if (!IsStuck()) {
                    return true;
                }
            }
            return false;
        
        default:
            return false;
    }
}

function canIEat() {
    return false;
}

function IsStuck() {    
    return false;
}