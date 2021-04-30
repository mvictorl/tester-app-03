class CustomError extends Error {
	constructor(status, message) {
		super()
		this.status = status
		this.message = message
	}

	static badRequest(message) {
		return new CustomError(404, message)
	}

	static internal(message) {
		return new CustomError(500, message)
	}

	static forbidden(message) {
		return new CustomError(403, message)
	}
}

module.exports = CustomError
