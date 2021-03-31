const getCaptcha = () => {
	// Math.random().toString(26).substring(5, 10)

	// console.log(status)
	let alphabets = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'

	let first = alphabets[Math.floor(Math.random() * alphabets.length)]
	let second = Math.floor(Math.random() * 10)
	let third = Math.floor(Math.random() * 10)
	let fourth = alphabets[Math.floor(Math.random() * alphabets.length)]
	let fifth = alphabets[Math.floor(Math.random() * alphabets.length)]
	let sixth = Math.floor(Math.random() * 10)
	let captcha =
		first.toString() +
		second.toString() +
		third.toString() +
		fourth.toString() +
		fifth.toString() +
		sixth.toString()

	return captcha
}

export { getCaptcha }
