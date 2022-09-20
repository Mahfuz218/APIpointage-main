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

describe('Employee Check out ', () => {
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
  it('Check out, Employee not found', (done) => {
    request(server).post('/api/pointage/checkout')
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


  // employee hasnt checked in yet or unknown error (invalid test)
  it("Check out, Employee hasn't checked in yet", (done) => {

    request(server).post('/api/pointage/checkout')
      .send({
        "employee_id": "6328b7636dd66d29952d404c", // appropriate id need to test
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


  // Employee successfully check out (valid test)
  it("Check out, Employee successfully check out", (done) => {

    request(server).post('/api/pointage/checkout')
      .send({
        "employee_id": "6328ab68fecb8d2782cd39d5", // appropriate id need to test
        "checkIn": null,
        "checkOut": '2022-09-20T10:00:00.000+00:00',
        "comment": "cemmentor",
        "duration" : null
    })
      .then((res) => {
        expect(res.body.success).to.equal(true);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });


});
