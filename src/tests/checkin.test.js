import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import server from '../index.js';
import request from 'supertest';
import express, { response } from 'express';
import Employee from '../models/employee.model.js';

const app = express();

chai.should();
chai.use(chaiHttp);


let employee = null;

describe('Employee Check in ', () => {
  before( (done) => {
    mongoose.connect("mongodb://localhost:27017/MyDb?retryWrites=true&w=majority")
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
    mongoose.connect("mongodb://localhost:27017/MyDb?retryWrites=true&w=majority")
    .then(() => {
      //console.log("db is closed");
      done();
    })
    .catch(() => {
        //console.log("can t connect to db");
        done();
    })
  });


  // employee invaid test if employee not exist with employee id
  it('Check in, Employee not found', (done) => {
    request(server).post('/api/pointage/checkin')
      .send({
        "employee_id": "63283e21f62077e2ad9b2456", // appropriate id need to test
        "checkIn": "2022-09-19",
        "checkOut": null,
        "comment": "cemmentor",
        "duration" : null
    })
      .then((res) => {
        expect(res.error.status).to.equal(404);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });


  // employee hasnt checked out yet or unknown error (invalid test)
  it("Check in, Employee hasn't checked out yet", (done) => {

    request(server).post('/api/pointage/checkin')
      .send({
        "employee_id": "6328b72e81b3e48037e06fd0", // appropriate id need to test
        "checkIn": "2022-09-20",
        "checkOut": null,
        "comment": "cemmentor",
        "duration" : null
    })
      .then((res) => {
        //console.log(res.body);
        expect(res.error.status).to.equal(500);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });


  // Employee successfully check in (valid test)
  it("Check in, Employee successfully check in", (done) => {

    request(server).post('/api/pointage/checkin')
      .send({
        "employee_id": "63283e21f62077e2ad9b27e6", // appropriate id need to test
        "checkIn": "2022-09-21", 
        "checkOut": null,
        "comment": "cemmentor",
        "duration" : null
    })
      .then((res) => {
        console.log(res.body);
        expect(res.body.success).to.equal(true);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });


});
