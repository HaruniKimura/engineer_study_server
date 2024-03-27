const express = require('express');
const app = express();

app.get('/', (req, res) => {
        res.send('Hello World\n');
});

app.get('/a', (req, res) => {
	res.send('good evening\n');
});

app.get('/b', (req, res) => {
	res.send('good morning\n');
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
