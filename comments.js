// Create a Web server that can listen to requests for /comments.json and serve up 
// our JavaScript object. Remember to set the Content-Type header to application/json.
var http = require('http');
var fs = require('fs');
var port = 8080;

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    fs.readFile('./comments.json', 'utf8', function (err, data) {
        if (err) throw err;
        res.end(data);
    });
});

server.listen(port, function () {
    console.log('Server listening on http://localhost:%s', port);
});