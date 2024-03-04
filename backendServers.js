const http = require('http');

//import server config
const serversConfig = require("./config.json").servers;


//create servers function
const createServer = (host, port, timeout) => {
    
    let server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            data: `Hello World! from ${host}:${port}`,
        }, timeout));
    });

    server.listen(port);

}


//loop the config and create the servers 
serversConfig.map(server => {
    createServer(server.host, server.port, server.timeout);
});
