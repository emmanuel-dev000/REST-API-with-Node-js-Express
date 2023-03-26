const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Hello World");
        res.end();
    }
    
    if (req.url === "/api/courses") {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

const portNumber = 3000;
server.listen(portNumber);

console.log("Listening to " + portNumber);