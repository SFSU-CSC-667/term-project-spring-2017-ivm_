#! /usr/bin/env node
'use strict'

const pg = require('pg');

var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/config.json')[env];

const pool = new pg.Pool(config);

var query = function(sql){
    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        client.query(sql, function(err, result) {
            done(err);

            if(err) {
                return console.error('error running query', err);
            }
        });
    });
};

var query = function(sql, data){

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        if(typeof data !== 'function'){
          client.query(sql, data, function(err, result) {
              done(err);

              if(err) {
                  return console.error('error running query', err);
              }
          });
        // if data argument is a callback function, use that function for the query.
        } else {
          client.query(sql, data);
        }
    });
}

pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack)
});

exports.query = query;
exports.query = query;