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
        console.log(e);
        this.isDown = true;
    };

    obj.onmouseup = function() {
        this.isDown = false;
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

const circle = document.querySelector('.circle');

setupDragDrop(circle);