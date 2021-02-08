const express = require('express')
const app = express()
const port = 3000;
const Sequelize = require('sequelize')
const cors = require('cors');
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


const server = require('http').createServer(app);
const io = require('socket.io')(server);

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

app.use(cors());

var datain ="";
io.on('data', (data) => async function(data) {
  var res = datain.concat(data.toString());
  datain = res;
  var myObj = JSON.parse(datain);
  const tm = new Date().getTime();
  var val = myObj.tempC;
  var sensorID = myObj.sensorID;
  var linkKey = "cceceew";

  try{
    await sensor_data.create({
    time: tm, 
    value: val, 
    sensorID: id, 
    linkKey: keylink
  });
  res.send('Inserted!');
  } catch (e) {
    console.log('Error inserting data', e)
  }
  
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

server.listen(8000);

app.get('/', async  (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
