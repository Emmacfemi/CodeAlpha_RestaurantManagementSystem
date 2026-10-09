const logRequest = (req, res, next) => {
    const timeStamp = new Date().toISOString();

    console.log(`${timeStamp} - ${rea.method} ${req.url} from ${req.ip}`);

    next();

}

module.exports = logRequest;