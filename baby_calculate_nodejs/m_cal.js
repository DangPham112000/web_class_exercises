exports.html = (x, y, opt, rs) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
        integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
</head>

<body>

    <div class="container">
        <div class="row py-4">
            <div class="card mx-auto">
                <div class="card-header">
                    Calculator
                </div>
                <div class="card-body">
                    <form action="/cal" method="post">
                        <div class="form-group">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">X</span>
                                </div>
                                <input name="x" type="number" class="form-control" placeholder="X" value="${x}">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Y</span>
                                </div>
                                <input name="y" type="number" class="form-control" placeholder="Y" value="${y}">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group mb-3">
                                <select name="opt" class="custom-select" id="opt">
                                    <option value="+" ${(opt === '+') ? 'selected' : ''}>+</option>
                                    <option value="-" ${(opt === '-') ? 'selected' : ''}>-</option>
                                    <option value="*" ${(opt === '*') ? 'selected' : ''}>*</option>
                                    <option value="/" ${(opt === '/') ? 'selected' : ''}>/</option>
                                </select>
                                <div class="input-group-append">
                                    <label class="input-group-text" for="inputGroupSelect02">Options</label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group text-right">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                        <div class="form-group text-center">
                            <span class="badge badge-pill badge-primary"><h1>${rs}</h1></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF"
        crossorigin="anonymous"></script>
</body>

</html>
`;