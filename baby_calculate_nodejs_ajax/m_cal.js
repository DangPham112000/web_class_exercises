exports.calculate = (x, y, opt) => {
    switch (opt) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            return x / y;
    }
    return 'Cant calculate'
}