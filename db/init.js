#! /usr/bin/env node
'use strict'

var db = require('../server/db.js');
var fs = require('fs');

var sql = fs.readFileSync('db/create.sql').toString();
db.query(sql);

sql = fs.readFileSync('db/insert.sql').toString();
db.query(sql);



