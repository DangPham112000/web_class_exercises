const btnEls = document.querySelectorAll('.btn');
const boxCodeEls = document.querySelectorAll('.box-code');
const htmlTextArea = document.querySelector('#HTML .box-content');
const cssTextArea = document.querySelector('#CSS .box-content');
const jsTextArea = document.querySelector('#JavaScript .box-content');
const iframeEl = document.getElementById('iframe');

btnEls.forEach(btnEl => {
    btnEl.addEventListener('click', function(e) {
        e.target.classList.toggle('active');
        
        boxCodeEls.forEach(boxCodeEl => {
            if (e.target.classList.contains(boxCodeEl.id)) {
                boxCodeEl.classList.toggle('hide');
                // console.log(boxCodeEl.id);
            }
        });

        rerender();

    });
});

function rerender() {
    let numCol = 4; 
    boxCodeEls.forEach(boxCodeEl => {
        if (boxCodeEl.classList.contains('hide'))
            numCol -= 1;
    })
    console.log(numCol);

    const containerEl = document.querySelector('.container')

    containerEl.style.gridTemplateColumns = `repeat(${numCol}, 1fr)`;
}


htmlTextArea.onkeyup = function() {
    iframeEl.srcdoc = `${htmlTextArea.value} <style>${cssTextArea.value}</style> <script>${jsTextArea.value}</script>`;
}


cssTextArea.onkeyup = function() {
    iframeEl.srcdoc = `${htmlTextArea.value} <style>${cssTextArea.value}</style> <script>${jsTextArea.value}</script>`;
}

jsTextArea.onkeyup = function() {
    iframeEl.srcdoc = `${htmlTextArea.value} <style>${cssTextArea.value}</style> <script>${jsTextArea.value}</script>`;
}

htmlTextArea.onkeyup();
cssTextArea.onkeyup();
jsTextArea.onkeyup();
