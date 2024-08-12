const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');



const {saveHealth, getAll}= require('./data-store-proxy');
const broadcastAll = require('./websocket-service');

const app = express();
const port = 4001;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  };
 
app.use(cors(corsOptions));

app.use(bodyParser.json());


app.post('/api/health',(req,res) => {
   try {

    const data = req.body;

    if(!data || !data.patient_id) {
        throw new Error('Missing required data')
    }

    //console.log('received data:%s',data)

    saveHealth(data);

    res.status(200).json({message : 'Data received successfully', receivedDate: data});

    broadcast();

    } catch(error) {
        res.status(400).json({message: error.message})
    }
});

async function broadcast() {
    console.log('in broadcast method inside domain-service');
    getAll(((err,rows) => {
                    if(!err) {
                        console.log('in broadcast method before broadcase');
                        broadcastAll(JSON.stringify(rows));
                    }
    }));
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(getAll(((err,rows) => {
    //             if(!err) {
    //                 this.broadcastAll(JSON.stringify(rows));
    //             }
    //         })));
    //     }, 2000);
    // });
}


app.get('/api/health/all',(req,res) => {  
     getAll((err,rows) => {
     if(err) {
        res.status(500).json({error: 'failed to retrieve data'});
     }  else {
        console.log(rows);
        res.status(200).json(rows);
     }  
    }); 
});

app.listen(port, () => {
    console.log('server is running on port %d', port)
});

