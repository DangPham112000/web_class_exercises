const input_1stnumber = document.getElementById('1stnumber');
const input_2ndnumber = document.getElementById('2ndnumber');
const input_result = document.getElementById('result');

const btn_confirm = document.getElementById('confirm');
const annoucement = document.getElementById('annoucement');

// Di chuyển khỏi ô nhập Số thứ nhất hoặc Số thứ hai mà dữ liệu không phải là số thực.
function setupAnoucement(obj) {
    obj.onfocus = function() {
        this.err = false;
    };
    obj.onblur = function() {
        if (isNaN(this.value)) {
            if (obj.id == "1stnumber") {
                annoucement.innerHTML = `Giá trị nhập ở ô <i>Số thứ nhất</i> không phải là số`;
                this.err = true;
            } else {
                annoucement.innerHTML = `Giá trị nhập ở ô <i>Số thứ hai</i> không phải là số`;
                this.err = true;
            }
            this.value = "";
        }
    };
}
setupAnoucement(input_1stnumber);
setupAnoucement(input_2ndnumber);


btn_confirm.onclick = function() {
    if (input_1stnumber.err || input_2ndnumber.err) {
        return;
    }
    
    const whichChecked = document.querySelector('input[name="func"]:checked');
    // Bấm nút Tính mà chưa chọn phép tính.
    if (!whichChecked) {
        annoucement.innerHTML = `Bấm nút <i>Tính</i> mà chưa chọn phép tính`;
        return;
    }

    // Chưa điền đủ hai số hợp lệ để thực hiện phép tính
    if (!input_1stnumber.value) {
        annoucement.innerHTML = `Chưa điền giá trị ở <i>Ô số thứ nhất</i> để thực hiện phép tính`;
        return;
    } else if (!input_2ndnumber.value) {
        annoucement.innerHTML = `Chưa điền giá trị ở <i>Ô số thứ hai</i> để thực hiện phép tính`;
        return;
    }
    
    let result;
    switch (whichChecked.value) {
        case 'increase':
            result = parseFloat(input_1stnumber.value) + parseFloat(input_2ndnumber.value);
            break;
        case 'decrease':
            result = parseFloat(input_1stnumber.value) - parseFloat(input_2ndnumber.value);
            break;
        case 'multiple':
            result = parseFloat(input_1stnumber.value) * parseFloat(input_2ndnumber.value);
            break;
        case 'divide':
            result = parseFloat(input_1stnumber.value) / parseFloat(input_2ndnumber.value);
            break;
    }
    input_result.value = result;
    annoucement.innerHTML = '';
};
