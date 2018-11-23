class NotImplementedError extends Error {
  constructor(args) {
    super(args)
    this.message = 'You have to implement this'
  }
}

module.exports = NotImplementedError
