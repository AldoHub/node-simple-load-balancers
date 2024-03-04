const http = require("http");
const roundRobin = require("./roundRobin");
const leastConnections = require("./leastConnections");
const serversConfig = require("./config.json").servers;


const servers = serversConfig.map(server => ({
    ...server,
    connections: 0
}));

const loadBalancingAlg = 'leastConnections'; //roundRobin


const server = http.createServer((req, res) => {
    if(loadBalancingAlg === 'roundRobin'){
        roundRobin(servers, req, res);
    }
    else if(loadBalancingAlg === 'leastConnections'){
        leastConnections(servers, req, res);
    }
    else{
        res.writeHead(500);
        res.end("Load balancer algorithm is not supported.");
    }
});

server.listen(3000, () => {
    console.log("Load balancer server running on port 3000")
})