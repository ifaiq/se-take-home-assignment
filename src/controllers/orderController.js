const OrderService = require("../services/orderService");

async function normalOrderAPI(req, res) {
  try {
    const { status, ...data } = await OrderService.normalOrder(req);
    return res.status(status).send(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function vipOrderAPI(req, res) {
  try {
    const { status, ...data } = await OrderService.vipOrder(req);
    return res.status(status).send(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function addBotAPI(req, res) {
  try {
    const { status, ...data } = await OrderService.addBot(req);
    return res.status(status).send(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function removeBotAPI(req, res) {
    try {
      const { status, ...data } = await OrderService.removeBot(req);
      return res.status(status).send(data);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
module.exports = {
  normalOrderAPI,
  vipOrderAPI,
  addBotAPI,
  removeBotAPI
};
