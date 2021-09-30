
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

    obj.onmouseleave = function(e) {
        if (this.isDown) {
            this.isDown = false;
            this.style['z-index'] = 1;
            obj.style.left = "50%";
            obj.style.top = "50%";
        }
    }
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
    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            if (boxes[i][j] === obj.offsetParent) {
                // console.log(i,j);
                // console.log(boxes[i][j]);
                if (boxes[i - stepY][j + stepX]) {
                    if (!canIMove(obj, stepX, stepY, i, j))
                    {
                        stepX = 0;
                        stepY = 0;
                    }
                    // console.log(obj);
                    // console.log(boxes[i - stepY][j + stepX]);
                    boxes[i - stepY][j + stepX].appendChild(obj);
                    obj.style.left = "50%";
                    obj.style.top = "50%";
                    return;
                }
                boxes[i][j].appendChild(obj);
                obj.style.left = "50%";
                obj.style.top = "50%";
                return;
            }
        }
    }    
}

function canIMove(obj, stepX, stepY, i, j) {
    const func = obj.classList[1];
    // they can't eat if same faction
    if ((boxes[i - stepY][j + stepX].children.length === 2) &&
        (boxes[i - stepY][j + stepX].children[1].classList[2] === obj.classList[2])) 
    {
        return false;
    }
    switch (func) {
        case 'pawn':
            // care about they faction
            const faction = obj.classList[2];
            if (Math.abs(stepX) === Math.abs(stepY)) {
                if (faction === 'white' && stepY === -1) {
                    return canIEat(obj, stepX, stepY, i, j);
                } else if (faction === 'black' && stepY === 1) {
                    return canIEat(obj, stepX, stepY, i, j);
                } else {
                    return false;
                }
            }
            if (stepX != 0) {
                return false;
            }
            if (faction === 'white') {
                if (stepY === -1) {
                    if (!doIStuck(obj, stepX, stepY, i, j)) {
                        obj.firstStep = false;
                        return true;
                    } else {
                        return false;
                    }
                }
                if (stepY === -2 && obj.firstStep === true) {
                    if (!doIStuck(obj, stepX, stepY, i, j)) {
                        obj.firstStep = false;
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            } else if (faction === 'black') {                
                if (stepY === 1) {
                    if (!doIStuck(obj, stepX, stepY, i, j)) {
                        obj.firstStep = false;
                        return true;
                    } else {
                        return false;
                    }
                }
                if (stepY === 2 && obj.firstStep === true) {
                    if (!doIStuck(obj, stepX, stepY, i, j)) {
                        obj.firstStep = false;
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            }
            return false;
        
        case 'rook':
            if (stepX === 0 || stepY === 0) {
                if (!doIStuck(obj, stepX, stepY, i, j)) {
                    if (boxes[i - stepY][j + stepX].children.length === 2) {
                        return canIEat(obj, stepX, stepY, i, j);
                    }
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        
        case 'bishop':
            if (Math.abs(stepX) === Math.abs(stepY)) {
                if (!doIStuck(obj, stepX, stepY, i, j)) {
                    if (boxes[i - stepY][j + stepX].children.length === 2) {
                        return canIEat(obj, stepX, stepY, i, j);
                    }
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        
        case 'queen':
            if ((Math.abs(stepX) === Math.abs(stepY)) || ((stepX === 0 || stepY === 0))) {
                if (!doIStuck(obj, stepX, stepY, i, j)) {
                    if (boxes[i - stepY][j + stepX].children.length === 2) {
                        return canIEat(obj, stepX, stepY, i, j);
                    }
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        
        case 'king':
            if (Math.abs(stepX) <= 1 && Math.abs(stepY) <= 1) {
                if (boxes[i - stepY][j + stepX].children.length === 2) {
                    return canIEat(obj, stepX, stepY, i, j);
                }
                return true;
            }
            return false;
        
        case 'knight':
            if ((Math.abs(stepX) === 1 && Math.abs(stepY) === 2) || 
                (Math.abs(stepX) === 2 && Math.abs(stepY) === 1)) 
            {
                if (boxes[i - stepY][j + stepX].children.length === 2) {
                    return canIEat(obj, stepX, stepY, i, j);
                }
            }
            return false;
        
        default:
            return false;
    }
}

function canIEat(obj, stepX, stepY, i, j) {
    if ((boxes[i - stepY][j + stepX].children.length === 2) &&
        (boxes[i - stepY][j + stepX].children[1].classList[2] !== obj.classList[2])) // different faction
    {
        boxes[i - stepY][j + stepX].children[1].remove();
        return true;
    }
    
    return false;
}

function doIStuck(obj, stepX, stepY, i, j) {
    const func = obj.classList[1];
    switch (func) {
        case 'pawn':
            const faction = obj.classList[2];
            if (faction === 'white') {
                if (stepY === -1) {
                    if (boxes[i - stepY][j].children.length === 2) {
                        return true;
                    }
                }
                if (stepY === -2) {
                    if ((boxes[i - stepY][j].children.length === 2) ||
                        (boxes[i + 1][j].children.length === 2)) 
                    {
                        return true;
                    }
                }
                return false;
            } else if (faction === 'black') {                
                if (stepY === 1) {
                    if (boxes[i - stepY][j].children.length === 2) {
                        return true;
                    }
                }
                if (stepY === 2) {
                    if ((boxes[i - stepY][j].children.length === 2) ||
                        (boxes[i - 1][j].children.length === 2)) 
                    {
                        return true;
                    }
                }
                return false;
            }
            return false;
        
        case 'rook':
            if (stepX < 0) {
                for (let i2=stepX+1; i2<0; i2++) {
                    if (boxes[i - stepY][j + i2].children.length === 2) {
                        return true;
                    }
                }
            }
            if (stepX > 0) {
                for (let i2=1; i2<stepX; i2++) {
                    if (boxes[i - stepY][j + i2].children.length === 2) {
                        return true;
                    }
                }
            }
            if (stepY < 0) {
                for (let i2=stepY+1; i2<0; i2++) {
                    if (boxes[i - i2][j + stepX].children.length === 2) {
                        return true;
                    }
                }
            }
            if (stepY > 0) {
                for (let i2=1; i2<stepY; i2++) {
                    if (boxes[i - i2][j + stepX].children.length === 2) {
                        return true;
                    }
                }
            }
            
            return false;
        
        case 'bishop':
            if (stepX === stepY & stepX < 0) {
                for (let i2=1; i2<-stepX; i2++) {
                    if (boxes[i + i2][j - i2].children.length === 2) {
                        return true;
                    }
                }
            }
            if (stepX === stepY & stepX > 0) {
                for (let i2=1; i2<stepX; i2++) {
                    if (boxes[i - i2][j + i2].children.length === 2) {
                        return true;
                    }
                }
            }
            if (stepX !== stepY & stepX > 0) {
                for (let i2=1; i2<stepX; i2++) {
                    if (boxes[i + i2][j + i2].children.length === 2) {
                        return true;
                    }
                }
            }
            if (stepX !== stepY & stepX < 0) {
                for (let i2=1; i2<-stepX; i2++) {
                    if (boxes[i - i2][j - i2].children.length === 2) {
                        return true;
                    }
                }
            }
            return false;
        
        case 'queen':
            if (stepX === 0 || stepY === 0) {
                if (stepX < 0) {
                    for (let i2=stepX+1; i2<0; i2++) {
                        if (boxes[i - stepY][j + i2].children.length === 2) {
                            return true;
                        }
                    }
                }
                if (stepX > 0) {
                    for (let i2=1; i2<stepX; i2++) {
                        if (boxes[i - stepY][j + i2].children.length === 2) {
                            return true;
                        }
                    }
                }
                if (stepY < 0) {
                    for (let i2=stepY+1; i2<0; i2++) {
                        if (boxes[i - i2][j + stepX].children.length === 2) {
                            return true;
                        }
                    }
                }
                if (stepY > 0) {
                    for (let i2=1; i2<stepY; i2++) {
                        if (boxes[i - i2][j + stepX].children.length === 2) {
                            return true;
                        }
                    }
                }
            }
            if (Math.abs(stepX) === Math.abs(stepY)) {
                if (stepX === stepY & stepX < 0) {
                    for (let i2=1; i2<-stepX; i2++) {
                        if (boxes[i + i2][j - i2].children.length === 2) {
                            return true;
                        }
                    }
                }
                if (stepX === stepY & stepX > 0) {
                    for (let i2=1; i2<stepX; i2++) {
                        if (boxes[i - i2][j + i2].children.length === 2) {
                            return true;
                        }
                    }
                }
                if (stepX !== stepY & stepX > 0) {
                    for (let i2=1; i2<stepX; i2++) {
                        if (boxes[i + i2][j + i2].children.length === 2) {
                            return true;
                        }
                    }
                }
                if (stepX !== stepY & stepX < 0) {
                    for (let i2=1; i2<-stepX; i2++) {
                        if (boxes[i - i2][j - i2].children.length === 2) {
                            return true;
                        }
                    }
                }
            }
            return false;
        
        case 'king':
            
            return false;
        
        case 'knight':
            
            return false;
        
        default:
            return false;
    }
}