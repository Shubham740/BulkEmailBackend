const jwt = require('jsonwebtoken');
const { STRINGS } = require('../../utils/Strings');
const { getErrorModel, getTokenKey } = require('../../utils/Utils');

const auth = async (req, res, next) => {
    console.log(req.headers)
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ) {
        let errorModel = getErrorModel();
        errorModel.message = STRINGS.PLEASE_SEND_TOKEN
        res.send(errorModel)
    } else {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decodedToken = jwt.verify(token, getTokenKey());
            console.log("decoded data")
            next();

        }
        catch (exception) {
            let errorModel = getErrorModel();
            errorModel.message = STRINGS.PLEASE_SEND_VALID_TOKEN;
            res.send(errorModel)
        }
    }



}
exports.auth = auth;
