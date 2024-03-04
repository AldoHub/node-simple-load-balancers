const httpProxy = require('http-proxy');

//round-robin balancer jumps to the next available server
const proxy = httpProxy.createProxyServer({});
let current = 0; //start from the first server

const roundRobin = (serversList, req, res) => {
    const targetServer = serversList[current];
    console.log(targetServer);

    current = (current + 1) % serversList.length; //make sure is not set to a number higher than the servers count
    
    //route the request to the selected server
    proxy.web(req, res, {target: `http://${targetServer.host}:${targetServer.port}`});

}

module.exports = roundRobin;