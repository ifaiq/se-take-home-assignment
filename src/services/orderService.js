const Order = require("../models/Order");
const Bot = require("../models/Bot");

class OrderService {
  /**
   * Creates a new normal order.
   * @async
   * @param {Object} req - The request object (unused).
   * @returns {Promise<Object>} A Promise that resolves with an object representing the result of the operation.
   * @throws {Error} If an error occurs during the operation.
   */
  static async normalOrder(req) {
    try {
      const oldOrder = await Order.findOne()
        .select("orderNumber -_id")
        .sort({ createdAt: -1 })
        .lean();

      let lastOrderNumber = oldOrder?.orderNumber
        ? oldOrder?.orderNumber + 1
        : 1;
      const order = await Order.create({
        orderNumber: lastOrderNumber,
        type: "normal",
        status: "pending",
      });

      if (!order) return { status: 400, message: "Unable to Create Order!" };
      return { status: 201, data: order, message: "Order Saved!" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  /**
   * Creates a new VIP order.
   * @async
   * @param {Object} req - The request object (unused).
   * @returns {Promise<Object>} A Promise that resolves with an object representing the result of the operation.
   * @throws {Error} If an error occurs during the operation.
   */
  static async vipOrder(req) {
    try {
      const oldOrder = await Order.findOne()
        .select("orderNumber -_id")
        .sort({ createdAt: -1 })
        .lean();

      let lastOrderNumber = oldOrder?.orderNumber
        ? oldOrder?.orderNumber + 1
        : 1;

      const order = await Order.create({
        orderNumber: lastOrderNumber,
        type: "VIP",
        status: "pending",
      });

      if (!order) return { status: 400, message: "Unable to Create Order!" };
      return { status: 201, data: order, message: "Order Saved!" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  /**
   * Creates a new bot and processes pending orders.
   * @async
   * @param {Object} req - The request object (unused).
   * @returns {Promise<Object>} A Promise that resolves with an object representing the result of the operation.
   * @throws {Error} If an error occurs during the operation.
   */
  static async addBot(req) {
    try {
      const bot = await Bot.create({});

      const pendingVIPOrders = await Order.find({
        status: "pending",
        type: "VIP",
      }).sort({ createdAt: -1 });

      for (const pendingOrder of pendingVIPOrders) {
        bot.order = pendingOrder._id;
        bot.status = "processing";
        await bot.save();

        await new Promise((resolve) => setTimeout(resolve, 10000));
        pendingOrder.status = "complete";
        await pendingOrder.save();
      }

      const remainingOrders = await Order.find({
        status: "pending",
        type: "normal",
      }).sort({ createdAt: -1 });

      for (const pendingOrder of remainingOrders) {
        bot.order = pendingOrder._id;
        bot.status = "processing";
        await bot.save();
        await new Promise((resolve) => setTimeout(resolve, 10000));
        pendingOrder.status = "complete";
        await pendingOrder.save();
      }
      bot.status = "idle";
      await bot.save();

      return { status: 201, message: "Bot created and orders processed" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  /**
   * Removes the newest bot and updates the status of its associated order if it is processing.
   * @async
   * @param {Object} req - The request object (unused).
   * @returns {Promise<Object>} A Promise that resolves with an object representing the result of the operation.
   * @throws {Error} If an error occurs during the operation.
   */
  static async removeBot(req) {
    try {
      const newestBot = await Bot.findOne().sort({ createdAt: -1 });

      if (!newestBot) {
        return { status: 400, message: "No bots found" };
      }

      if (newestBot.status === "processing") {
        const order = await Order.findById(newestBot.order);

        if (order) {
          order.status = "pending";
          await order.save();
        }
      }
      await Bot.findByIdAndDelete(newestBot?._id);

      return { status: 200, message: "Bot remvoed" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}

module.exports = OrderService;
