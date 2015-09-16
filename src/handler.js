function mailer (event) {

}

function handler (event) {
	switch (event.type) {
		case "mail":
			mailer(event);
			break;
		case "put":
			break;
		case "post":
		default:

	}

}

module.exports = handler;
