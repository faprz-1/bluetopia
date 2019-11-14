'use strict';

const assert = require('assert')
// const nock = require('nock')
const fs = require('fs')

const conekta = require('./../../node_modules/conekta/lib/conekta.js')
const base64 = require('./../../node_modules/conekta/lib/base64.js')
const LOCALE = 'es'
const PUBLIC_KEY = 'key_MjbjZMy9XbTrWK4pCWBFjHg'
const PRIVATE_KEY = 'key_zWSg5irfMiBhZ2omH7Kw2w'
const API_VERSION = '2.0.0'
const PRODUCTION_KEY = '9YxqfRnx4sMQDnRsqdYn'
const TIMEOUT = 30000

var moment = require('moment');

conekta.api_key = PRIVATE_KEY;
conekta.api_version  = API_VERSION;
conekta.locale  = LOCALE;

module.exports = function(Pays) {

    const orderBody = {
        currency: 'MXN',
        customer_info: {
          name: 'Jul Ceballos',
          phone: '+5215555555555',
          email: 'jul@conekta.io'
        },
        line_items: [{
            name: 'Item1',
            description: 'Imported From Mex.',
            unit_price: 35000,
            quantity: 1,
            tags: ['food', 'mexican food']
        },
        {
            name: 'Item2',
            description: 'Imported From Mex.',
            unit_price: 100000,
            quantity: 1,
            tags: ['food', 'mexican food']
        },
        {
            name: 'Item3',
            description: 'Imported From Mex.',
            unit_price: 50000,
            quantity: 5,
            tags: ['food', 'mexican food']
        }]
      }

      var dataCard = {
        "card": {
          "number": "4242424242424242",
          "name": "Javier Pedreiro",
          "exp_year": "2018",
          "exp_month": "12",
          "cvc": "123"
        }
      };

    /**
     *
     * @param {object} data
     * @param {Function(Error, object)} callback
     */

    Pays.createOrder = function(data, callback) {

        // conekta.setPublicKey(PUBLIC_KEY);
        // conekta.setLanguage(LOCALE);

        // conekta.Order.create(orderBody, (err, order) => {
        //     if(err) return console.log(err);
            
        //     var orderObj = order.toObject();

        //     console.log(orderObj);
        //     callback(null,orderObj)
        // });

        
        // callback(null, newDAta);
    };

    /**
     *
     * @param {object} data
     * @param {Function(Error, object)} callback
     */

    Pays.createCharge = function(data, callback) {
        conekta.Order.find("ord_2mfSdoXykjusvNjJJ", function(err, order) {
            if(err) return console.log(err);

            order.createCharge({
            "payment_method": {
              "type": "oxxo_cash",
              "expires_at": 1479167175
            }
          }, function(err, charge) {
                console.log(charge);
                callback(null, charge);
            });
        });
    };
};
