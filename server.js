var fs = require("fs");
var path = require('path');
const helper = require('./lib/helper');

var app = require('http').createServer(function (request, response) {

    var uri = require('url').parse(request.url).pathname;
    filename = path.join(process.cwd(), uri);
  
    if(request.url === "/" || request.url === '')
      filename = helper.pathValidate(filename + "home");
    
    else if(request.url === '/home')
      filename = helper.pathValidate(filename);
  
    //define the broadcaster 
    else if(request.url === '/broadcast')
    filename = helper.pathValidate(filename);
  
    //define the viewers 
    else if(request.url === '/viewer')
      filename = helper.pathValidate(filename);  

  
    //respond client with aproporiate page 
    helper.respondClient(filename,response);
    
});

app = app.listen(process.env.PORT || 8888, process.env.IP || "0.0.0.0", function() {
    var addr = app.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});

require('./lib/WebRTC-Scalable-Broadcast')(app);
