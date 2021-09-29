// khi nhấc con cờ nhớ tăng z-index lên. xong rồi thì hạ xuống

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
        this.isDown = true;
        this.style['z-index'] = 2;
    };

    obj.onmouseup = function() {
        this.isDown = false;
        
        this.style['z-index'] = 1;
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
