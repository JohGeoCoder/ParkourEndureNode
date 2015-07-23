var express = require('express'),
			bodyParser = require('body-parser'),
			app = express();

app.use(bodyParser.json());
app.use(express.static('./bower_components'));

app.get('*', function(req, res){
	res.sendFile(__dirname + '/bower_components/index.html');
});

app.listen(3000);