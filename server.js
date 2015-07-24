var express = require('express'),
			bodyParser = require('body-parser'),
			app = express();

var id = 2;
var data = {
	1: { id: 1, firstName: 'John' , lastname: 'George', details: 'Teh best coche evar'},
	2: { id: 2, firstName: 'Joe', lastname: 'Recla', details: 'Teh secund best coche'}
};

app.use(bodyParser.json());
app.use(express.static('./bower_components'));

app.route('/api/coaches')
	.get(function(req, res){
		console.log(Object.keys(data).map(function(key){
			return data[key];
		}));
		res.json(Object.keys(data).map(function(key){
			return data[key];
		}));
	})
	.post(function(req, res){
		var record = req.body;
		record.id = ++id;
		data[record.id] = record;
		res.json(record);
	});

app.route('/api/coaches/:id')
	.get(function(req, res){
		res.json(data[req.params.id]);
	})
	.put(function(req, res){
		data[req.params.id] = req.body;
		res.json(req.body);
	})
	.delete(function(req, res){
		delete data[req.params.id];
		res.json(null);
	});

app.get('*', function(req, res){
	res.sendFile(__dirname + '/bower_components/index.html');
});

app.listen(3000);