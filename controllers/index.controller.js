// Import required node modules
const axios = require('axios');

// Creates controller
const indexController = {};

// Creates controller to get date
indexController.get = async (req, res) => {
	try {
		// Defines date API url
		const url = 'https://get-date-api.herokuapp.com/api/date/get';
		// Request date from API and saves it on date
		let time = await axios.get(url).then((response) => {
			return response.data;
		});
		time = time.date.split('T')[0];
		// Returns date
		return res.render('index', { time });
	} catch (err) {
		// Handles error, send error message
		return err.message;
	}
};

const getData = async (url) => {
	const result = await axios.get(url).then((response) => {
        return response.data;
    });
	return result;
}

indexController.verify = async (req, res) => {
	try {
		// Defines url for id
		const urlId = `https://ecuadorian-id-api.herokuapp.com/api/id/verify/${req.body.id}`;
		// Defines url for age
		const urlAge = `https://overage-api.herokuapp.com/api/age/verify/${req.body.age}`;
		// Promise all requests to APIs
		Promise.all([ await getData(urlId), await getData(urlAge)]).then((response) =>{
			const id = response[0];
			const age = response[1];
			return res.status(200).render('result', { id, age});
		})
	} catch (err) {
		// Handles error, send error message
		return err.message;
	}
};

// Exports controller
module.exports = indexController;
