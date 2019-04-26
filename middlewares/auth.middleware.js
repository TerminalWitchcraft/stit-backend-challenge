const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let token = req.get('token')
  if(!token || token == undefined)
    return res.status(403).json({err: "Unauthorized request. This incident will be reported"})
  jwt.verify(token, "this is secret", (err, decoded) => {
    if(err){
      return res.status(403).json({err: "Unauthorized request. Invalid token"})
    }
    else {
      req.user = decoded
    }
    next()
  })
}
