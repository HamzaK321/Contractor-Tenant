const express = require('express');

const dbContractor= require('./contractor');
const router = express.Router();


router.get('/Getcontractors', dbContractor.getContractors);

router.get('/Getcontractor/:id', dbContractor.getSingleContractor);

router.post('/Addcontractors', dbContractor.createContractor);

router.put('/Editcontractors/:id',dbContractor.updateContractor );

router.delete('/Removecontractors/:id',dbContractor.deleteContractor );

module.exports= router