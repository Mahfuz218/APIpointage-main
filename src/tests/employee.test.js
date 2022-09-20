import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import server from '../index.js';
import request from 'supertest';
import express, { response } from 'express';
import Employee from '../models/employee.model.js';
import MONGO_CON_URL from './config.js';


const app = express();

chai.should();
chai.use(chaiHttp);


describe('Fetch all employees', () => {
  before( (done) => {
    mongoose.connect(MONGO_CON_URL)
    .then(() => {
      //console.log("connected to db");
      done();
    })
    .catch(() => {
        //console.log("can t connect to db");
        done();
    })
  });




  after( (done) => {
    mongoose.connect(MONGO_CON_URL)
    .then(() => {
      //console.log("db is closed");
      done();
    })
    .catch(() => {
        //console.log("can t connect to db");
        done();
    })
  });


  // it('OK, getting employees has no employee', (done) => {

  //   //const query = req.body.creationDate ? { $eq: moment(req.body.creationDate).format("YYYY-MM-DD") } : { $exists: true }

  //   // try {
  //   //   const mockEmployees = await request(server).get('/api/employee/list');
  //   //   const body = JSON.parse(mockEmployees.text);
    
  //   //     let actual = body.list;
  //   //     //let expected = employees.length;
  //   //     console.log(actual);
  //   //     //console.log(expected);
  //   //     expect(1).to.equal(1);
  //   //     done();
    
  //   //   //console.log({ mockEmployees })
  //   // } catch (error) {
  //   //   console.log({ error })
  //   // }

  //   request(server).get('/api/employee/list')
  //     .then((res) => {
  //       const body = JSON.parse(res.text);
  //       let actual = body.list;
  //       expect(actual.length).to.equal(0);
  //       done();
  //     })
  //     .catch((err) => {
  //       done(err);
  //     });
  // });


  // fetching all employee , if greater than 0 test will sucess
  it('OK, getting employees has more than 1 employee', (done) => {

    request(server).get('/api/employee/list')
      .then((res) => {
        const body = JSON.parse(res.text);
        let actual = body.list;
        expect(actual.length).to.greaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });



  // test for creating a new employee
  it('OK, Creating new Emplpoyee', (done) => {

    request(server).post('/api/employee/create')
      .send({
        name: "Abdur Rahim",
        firstName: "Abdur Rahim",
        dateCreated: "2022-09-19",
        department: "CSE"
      })
      .then((res) => {
        const body = res.body;
        
        expect(body.success).to.equal(true);
        done();
      })
      .catch((err) => {
        //console.log('error --------------------:'+err)
        done(err);
      });
  });


});
