const inputColors = $(".input-color");

function changeColor() {
    $(document.body).css(
        'background',
        `linear-gradient(
            90deg,
            ${$(".input-color:first-child").val()},
            ${$(".input-color:last-child").val()}
        )`
    );
}

$(".input-color").on('input',changeColor);

changeColor();