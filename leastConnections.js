const httpProxy = require('http-proxy');

//least-connections balancer checks for the server that has the least number of connections
const proxy = httpProxy.createProxyServer({});

const leastConnections = (serversList, req, res) => {
    
    console.log("LEAST CONNECTIONS")
    
    //load the servers
    serversList.sort((a, b) => a.connections - b.connections);
  
    const targetServer = serversList[0];
    
    //update the connections for the current server;
    targetServer.connections++;
    
    console.log(targetServer);

    //route the request to the selected server
    proxy.web(req, res, {target: `http://${targetServer.host}:${targetServer.port}`});

    res.on('finish', () => {
       //when the connection ends, remove it from the connections count for the server
        targetServer.connections--;   
    });

   
}

module.exports = leastConnections;