var sys = require("sys"), http = require("http");

http.createServer(function (req, res) {
	var client = http.createClient(80, "www.google.com");
	var request = client.request("GET", "/ig/api?weather=16066", { "host" : "www.google.com"});
	var buffer = "";
	request.addListener("response", function(response) {
		response.setEncoding("utf8");
		response.addListener("data", function(chunk) {
			buffer += chunk;
		});	
		response.addListener("end", function() {
			res.writeHead(200, { "content-type": "text/xml"});
			res.end(buffer);
		});
	});
	request.end();
}).listen(8123);
sys.puts("Weather server listening @localhost:8123");
