export const checkNumberKey = event => {
	const validNumber = new RegExp(/^\d*\.?\d*$/)
	const keyCode = event.keyCode || event.which
	if (
		keyCode === 37 ||
		keyCode === 38 ||
		keyCode === 39 ||
		keyCode === 40 ||
		keyCode === 8 ||
		keyCode === 46
	) {
		// Left / Up / Right / Down Arrow, Backspace, Delete keys
		return
	}
	const isValid = !validNumber.test(event.key)

	isValid && event.preventDefault()
}
