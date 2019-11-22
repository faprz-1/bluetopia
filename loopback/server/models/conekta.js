'use strict';

const assert = require('assert')
// const nock = require('nock')
const fs = require('fs')

const conekta = require('conekta')
const base64 = require('conekta/lib/base64')
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

module.exports = function(Conekta) {

    /**
     *
     * @param {object} data
     * @param {Function(Error, object)} callback
     */

    Conekta.createOrder = function(data, callback) {
      var userI = data.userI;
      var productsItems = data.productsItems;
      var tokenId = data.tokenId;

      let orderBody = {
        currency: "MXN",
        customer_info: userI,
        line_items: productsItems,
        charges: [{
          payment_method: {
            type: 'card',
            token_id: tokenId
          }
        }]
      }

        conekta.Order.create(orderBody, (err, order) => {
            if(err) return callback(err);
            
            var orderObj = order.toObject();

            console.log(orderObj);
            return callback(null,orderObj)
        });
    };

    /**
     *
     * @param {object} data
     * @param {Function(Error, object)} callback
     */

    Conekta.createCharge = function(data, callback) {
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

    /**
   *
   * @param {object} data
   * @param {Function(Error, object)} callback
   */

  Conekta.asignedConekta = function(data, callback) {
    var info = data.info;
    var userId = data.userId;
    var userModel = Conekta.app.models.Usuario;
    
    conekta.Customer.create(info, (err, newCus) => {
      if(err) return null;

      var Customer = newCus.toObject();

      userModel.findById(userId, [], (err, user) => {
        if(err) return callback(err);

        user.updateAttribute('customerId', Customer.id, (err, updateUser) => {
          if(err) return callback(err);

          return callback(null,updateUser);
        });
      })
    })
  };

  /**
   *
   * @param {object} data
   * @param {Function(Error, object)} callback
   */

  Conekta.addCardToUser = function(data, callback) {
    var cardToken = data.cardToken;
    var customerId = data.customerId;

    conekta.Customer.find(customerId, function(err, customer) {
      if(err) return callback(err);

      let infoCard = {
        type: "card",
        token_id: cardToken
      }

      customer.createPaymentSource(infoCard, function(err, res) {
        if(err) return callback(err);

        console.log(res);
        return callback(null, res);
      });
    });
  };

  /**
   *
   * @param {object} data
   * @param {Function(Error, object)} callback
   */

  Conekta.orderFromCustomer = function(data, callback) {
    var cutomerId = data.cutomerId;
    var productsItems = data.productsItems;
    var cardId = data.cardId;

    let orderBody = {
      currency: "MXN",
      customer_info: {
        customer_id: cutomerId
      },
      line_items: productsItems,
      charges: [{
        payment_method: null
      }]
    }

    if(cardId == null) {
      orderBody.charges[0].payment_method = {
        "type": "default"
      }
    } else {
      orderBody.charges[0].payment_method = {
        type: "card",
        payment_source_id: cardId
      }
    }

    conekta.Order.create(orderBody, function(err, order) {
      if(err) return callback(err);

        console.log(order);
      return callback(null,order);
    })
  };

  /**
   *
   * @param {object} data
   * @param {Function(Error, object)} callback
   */

  Conekta.getCards = function(data, callback) {
    var cutomerId = data.cutomerId;

    conekta.Customer.find(cutomerId, function(err, customer) {
      if(err) return callback(err);

      let c = customer.toObject();
      console.log(c);
      
      let cards = c.payment_sources.data;

      return callback(null,cards);
    });
  };

};
