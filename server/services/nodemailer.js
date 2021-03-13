const nodemailer = require('nodemailer')

const sendApproveEmails = ({
	emailList,
	title,
	request,
	campaingAddress,
	amount,
	recipient,
}) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.outlook.com',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: `${process.env.NODEMAILER_EMAIL}`,
			pass: `${process.env.NODEMAILER_PASSWORD}`,
		},
	})

	const options = {
		from: `"Dfund - Approve Spending Request Request" <${process.env.NODEMAILER_EMAIL}>`,
		to: emailList,
		subject: 'Approve Speding Request - Dfund',
		text:
			'Please approve the spending request of campaign you have funded on.',
		html: `
            <div>
                <p><strong>Dfund Campaign Title:</strong> <a href="${process.env.CLIENT_URL}/campaign/${campaingAddress}">${title}</a></p>
                <p><strong>Request:</strong> ${request}</p>
                <p><strong>Amount:</strong> ${amount} ETH</p>
                <p><strong>Recipient:</strong> ${recipient}</p>
                <a href="${process.env.CLIENT_URL}/campaign/${campaingAddress}">View Campaign</a>
            </div>`,
	}

	transporter.sendMail(options, function (err, info) {
		if (err) {
			console.log(err)
			return
		}
		// console.log('Email sent success', info.response)
		console.log('Approve Emails sent successfully!')
	})
}

module.exports = sendApproveEmails
