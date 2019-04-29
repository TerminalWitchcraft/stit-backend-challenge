const jwt = require('jsonwebtoken')
const moment = require("moment")

module.exports = (req, res, next) => {
  let token = req.get('Authorization')
  if(!token || token == undefined)
    return res.status(403).json({err: "Unauthorized request. This incident will be reported"})
  jwt.verify(token, "stit", (err, decoded) => {
    if(err){
      return res.status(403).json({err: "Unauthorized request. Invalid token"})
    }
    else {
      let timenow = moment().unix()
      if(decoded.expiry < timenow) {
        return res.status(403).json({err: "Token expired. Invalid token"})
      }
      req.user = decoded
    }
    next()
  })
}
