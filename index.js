const express = require('express');
const app = express();
const port = 5000;
const dbContractor= require('./contractor')
// const cors = require('cors')
const dotenv= require('dotenv')
const authRoutes = require('../server-side/routes')
const cors = require('cors')
// const { Pool } = require('pg');


dotenv.config()

// //middleware
// const corsOptions ={
//     orirgin:"http://:localhost:3000",
//     optionSuccessStatus:200
// }

app.get('/', (req,res) =>{
    res.send('working ')
})

app.use(express.json());// access to req.body

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// app.use('/api',cors(corsOptions),authRoutes);    //telling we need to use /api for accesing routes names


app.get('/Getcontractors', dbContractor.getContractors);

app.get('/Getcontractor/:id', dbContractor.getSingleContractor);

app.post('/Addcontractors', dbContractor.createContractor);


app.put('/Editcontractors/:id',dbContractor.updateContractor );

app.delete('/Removecontractors/:id',dbContractor.deleteContractor );