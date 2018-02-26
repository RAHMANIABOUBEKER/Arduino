//Chargement du module serialport
var SerialPort = require('serialport');
//var request = require('request');
//variable pour écouter le port série
var Delimiter = SerialPort.parsers.Delimiter; 
var serialport = new SerialPort("/dev/ttyACM0", {
  baudRate: 9600,
  //dataBits: 8,
  //parity: 'none',
  //stopBits: 1,
  //flowControl: false,
  parser: require('stream').Readable
});

var socket = null;
var parsersdata = serialport.pipe(new Delimiter({delimiter : '\n'}));
parsersdata.on('data', function(data) {
        	console.log(data.toString('utf-8'));
        		if( socket != null ) {
        			//if(data.toString() ){

			            socket.emit('mesdonnees', data.toString());
            
            		//}
        		
            }
    });

//Chargement du module http
var http = require('http');
//Chargement du module fs
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement du module socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on récupère les données du port série et on l'envoie sur le navigateur
io.sockets.on('connection', function (socketP) {
	socket = socketP

});

//on écoute le port 8080
server.listen(3000);