const net = require('net');
let express = require('express');
let app = express();
const cors = require('cors');

let http = require('http').createServer(app);
let io = require('socket.io')(http, { cookie : false, path: '/wsocket/socket.io'} );
const port = 8000;
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:jyoti123@localhost:5432/node_test',
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })


//const server = require('http').createServer(app);
//const io = require('socket.io')(server);

let sensors = sequelize.define('sensors', {
   sensorid: Sequelize.INTEGER,
   type: Sequelize.INTEGER,
   blockchainid: Sequelize.STRING
});

let sensor_data = sequelize.define('sensor_data', {
    time: Sequelize.DATE,
    value: Sequelize.DOUBLE,
    sensorID: Sequelize.STRING,
    linkKey: Sequelize.STRING
});

app.use(express.json());
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully');
  }).catch(err => {
   console.error('Unable to connect to the database:', err);
  });


app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.get('/data', (req, res) => res.sendFile(__dirname + '/data.txt'));

app.get('/sendMessage', (req, res) => {
  io.emit('message', { someProperty: 'some value', otherProperty: 'other value' });
  res.send('Done');
});

app.use(cors());

var datain = "";
// Create a server object
const server = net.createServer(async function(socket) {
  socket.on('data', async function(data) {
      var res = datain.concat(data.toString());
      datain = res;
      if(datain.indexOf("}")>=0)
      {
          console.log(datain); //datain={tempC:28.7, tempF:72.5}
          var myObj = JSON.parse(datain);
          io.emit('message', myObj);

          console.log("tempC from JSON:", myObj.tempC);
          datain="";
	  await sensor_data.create({
            time: tm, 
            value: myObj.tempC, 
            sensorID: myObj.sensorID, 
            linkKey: keylink
          });
          console.log('Inserted!');
      }
  });
  console.log('closed connection');
}).on('error', (err) => {
  console.error(err);
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// Open server on port 3000
server.listen(3000, () => {
  console.log('opened server on', server.address().port);
});

http.listen(port, function(){
  console.log(`Example app listening on port ${port}!`);
});
