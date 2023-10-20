import BadRequest from "../errors/BadRequest.js";

async function handlePagination(req, res, next) {
  try {
    let { limit = 5, page = 1, ordering = "_id:-1" } = req.query;

    let [dataOrder, order] = ordering.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    ordering = parseInt(order);

    const result = req.result;

    if (limit > 0 && page > 0) {
      const paginatedResult = await result
        .find()
        // -1 = decrescente
        //  1 = crescente
        .sort({ [dataOrder]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      res.status(200).json(paginatedResult);
    } else {
      next(new BadRequest());
    }
  } catch (err) {
    next(err);
  }
}

export default handlePagination;
