require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	},
});

/** Email sender nodemailer module
 * @param1 req - request made
 * @param2 res - response to send
 * @param3 token - token model object after registration
 */
module.exports.confirmEmailSender = async (req, res, token) => {
	// verify connection configuration
	transporter.verify(function (error, success) {
		if (error) {
			res.send({ error: error });
		} else {
			console.log("Server is ready to send messages");
		}
	});

	console.log(token.token);

	// Message content
	const message = {
		from: "no-reply@scholarr.com.np",
		to: req.body.email,
		subject: "Email Confirmation",
		html: `<html>
        <head>
            <style>
                p.custom {
                    font-family: 'Muli', sans-serif;
                    font-size: 20px;
                    line-height: 1.5;
                }
    
                h1.custom {
                    font-family: "Libre Baskerville", serif;
                    font-size: 2.5em;
                    font-weight: bold;
                    justify-content: center;
                }
    
                div.container {
                    margin: 10vh 5vw;
                    display: flex;
                    justify-content: center;
                }
    
                div.custom {
                    padding: 35px;
                    display: grid;
                    /* justify-content: center; */
                    border-style: solid;
                    border-color: #000000;
                    border-radius: 1em;
                    min-width: 80%;
                }
            </style>
        </head>
        <body>
            <link
                href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Muli:wght@400;700&display=swap"
                rel="stylesheet"
            />
            <div class="container">
                <div class="custom">
                    <h1 class="custom">Confirm your e-mail address</h1>
                    <p class="custom">
                        Dear <strong>${req.body.username}</strong>,<br />
                        Please cofirm <strong>'$(req.body.email)'</strong> as your email by following clicking the
                        following link:<br />
                        <a href="http:\/\/${req.headers.host}\/\/api\/user\/confirmation\/${token.token}">
                            <strong>Click here</strong></a
                        >. <br />
                        Or, copy the following link into your browser:<br />
                        <strong>
                            http:\/\/${req.headers.host}\/api\/user\/confirmation\/${token.token}
                        </strong>
                        <br /><br />
                        Sincerely,
                        <br />
                        <strong>
                            The Scholarr Team
                        </strong>
                    </p>
                </div>
            </div>
        </body>
    </html>
        `,
	};

	// Send Message
	transporter.sendMail(message, function (err) {
		if (err) {
			return console.log({ msg: err.message });
		}
		console.log("The verification email has been sent");
	});
};
