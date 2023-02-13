function contentType (req, res, next) {
  res.type('json')
  next()
}

module.exports = {
  contentType
}
