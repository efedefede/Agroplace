const { OrderDetail, Order } = require("../../../db.js");

module.exports = async (req, res, next) => {
  const { userId, id } = req.params;

  try {
    const order = await Order.findOne({
      where: {
        userId: userId,
        state: "cart",
      },
    });

    const findDuplicate = await OrderDetail.findAll({
      where: {
        productId: id,
        orderId: order.id,
      },
    });
    if (findDuplicate.length !== 0) {
      res.send("Ya existe ese producto");
    } else {
      const detailCreate = await OrderDetail.create({
        productId: id,
        quantity: 1,
      });
      await detailCreate.setOrder(order.id);
      res.json(detailCreate);
    }
  } catch (error) {
    res.json(error);
  }
};