const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    fs.readFile('message.txt', { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        console.log(err);
        } else {
        res.write('<html>');
        res.write('<head><title>FirstApp</title></head>');
        res.write(`<body>${data}</body>`);
        res.write('<body><form action="/message" method ="POST" ><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        res.end();
      }
    });
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];

      fs.writeFile('message.txt', message, err => {
        
          res.statusCode = 302; 
          res.setHeader('Location', '/');
          res.end();
        })
      
    });
  }
};

exports.handler = requestHandler;
exports.someText="somehard Coded text";
