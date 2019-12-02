'use strict';

const conekta = require('conekta')
const LOCALE = 'es'
const PRIVATE_KEY = 'key_zWSg5irfMiBhZ2omH7Kw2w'
const API_VERSION = '2.0.0'

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
      var meses = data.meses;

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
      if(meses.requerido == 0) {
        orderBody.charges[0].monthly_installments = meses.cantidad
      }

        conekta.Order.create(orderBody, (err, order) => {
            if(err) return callback(err);
            
            var orderObj = order.toObject();

            return callback(null,orderObj)
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
    var mesesCantidad = data.mesesCantidad;

    let orderBody = {
      currency: "MXN",
      customer_info: {
        customer_id: cutomerId
      },
      line_items: productsItems,
      charges: [{
        payment_method: {
          type: "card",
          payment_source_id: cardId
        }
      }]
    }    

    if(mesesCantidad != 1) {
      orderBody.charges[0].payment_method.monthly_installments = mesesCantidad
    }

    conekta.Order.create(orderBody, function(err, order) {
      if(err) return callback(err);

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
      
      let cards = c.payment_sources.data;

      return callback(null,cards);
    });
  };

};
