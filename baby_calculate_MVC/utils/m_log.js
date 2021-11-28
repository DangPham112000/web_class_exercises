module.exports = {
    log: (req, res, next) => {
        console.log('Middle: ', "logger");
        res.propNew = "new prop";
        next();
    }
}