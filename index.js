const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");
const IORedis = require("ioredis");
// Replace the uri string with your connection string.
const uri =
	"mongodb://matsushita:matsushita-test@matsushita-test.cluster-cgi2dhciwlbr.ap-southeast-2.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=haruni-enginear.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";
const client = new MongoClient(uri);

async function run() {
	try {
		const database = client.db('sample_mflix');
		const movies = database.collection('movies');
		// Query for a movie that has the title 'Back to the Future'
		const query = { title: 'Back to the Future' };
		const movie = await movies.findOne(query);
		return movie;
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

app.get('/', (req, res) => {
    res.send('Hello World\n');
});

app.get('/a', (req, res) => {
	res.send('good evening\n');
});

app.get('/b', (req, res) => {
	res.send('good morning\n');
});

app.get('/get', async (req, res) => {
	const result = await run();
	res.send(result);
});

app.get('/redis', async (req, res) => {
	const redis = new IORedis({
		"host": "motoshima-test.gpddhc.clustercfg.apse2.cache.amazonaws.com",
		"port": 6379,
		"family": 4,
		"password": null,
		"db": 0
	});
	let count = Number(await redis.get('count'));
	count++;
	await redis.set('count', count);
	await redis.quit();
	res.send(count);
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});