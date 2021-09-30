

const whitePawns = document.querySelectorAll('.pawn.white');


// convert 1D matrix to 2D matrix
const tmpBoxes = document.getElementsByClassName('box');
const boxes = [];
for (let i=0; i<8; i++) {
    boxes[i] = [];
    for (let j=0; j<8; j++) {
        boxes[i].push(tmpBoxes[j+i*8]);
    }
}
// console.log(boxes[3][5]);

// console.log(whitePawns);
function whitePawnRules() {
    
}

window.onload = function() {
    let chesses = document.querySelectorAll(".chess");
    for (const chess of chesses) {
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
    // console.log(obj.offsetLeft,obj.offsetTop);
    let stepX = Math.round(superdx/80);
    let stepY = Math.round(superdy/80);
    console.log('MOVEEEEEEEE')
    console.log(Math.round(superdx/80),Math.round(superdy/80));
    console.log(superdx,superdy);
    // obj.offsetParent
    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            if (boxes[i][j] === obj.offsetParent) {
                console.log(i,j);
                console.log(boxes[i][j]);
                if (boxes[i - stepY][j + stepX]) {
                    console.log(obj);
                    console.log(boxes[i - stepY][j + stepX]);
                    
                    boxes[i - stepY][j + stepX].appendChild(obj);
                    obj.style.left = "50%";
                    obj.style.top = "50%";
                    return;
                    // boxes[i][j].removeChild(obj);
                    // console.log(tmpObj);
                }
            }
        }
    }
    
}