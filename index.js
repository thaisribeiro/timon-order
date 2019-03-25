async function paginate (filter, options, populate) {
  options = Object.assign({}, options)
  const params = filter || {}
  const page = options.page ? options.page : 1
  const limit = options.limit ? options.limit : 10
  let data = []

  if (!populate) {
    data = await this.find(params)
      .skip((limit * page) - limit)
      .limit(limit)
      .lean()
  } else {
    populate = {
      ...populate,
      options: {
        skip: ((limit * page) - limit),
        limit: limit
      }
    }
    data = await this.find(params)
      .populate(populate)
      .skip((limit * page) - limit)
      .limit(limit)
      .lean()
  }

  const count = (await this.find(params)).length

  return {
    docs: data,
    total: count,
    page: page,
    limit: limit,
    pages: Math.ceil(count / limit) || 1
  }
}

async function paginateAggregate (filter, options) {
  options = Object.assign({}, options)
  const page = options.page ? options.page : 1
  const limit = options.limit ? options.limit : 10
  const skip = ((limit * page) - limit)
  let params = filter || {}

  params = [
    ...params,
    { $skip: skip }, { $limit: limit }
  ]

  const data = await this.aggregate(params)
  const count = (await this.aggregate(filter)).length
  return {
    docs: data,
    total: count,
    page: page,
    limit: limit,
    pages: Math.ceil(count / limit) || 1
  }
}

module.exports = function (schema) {
  schema.statics.paginate = paginate
  schema.statics.paginateAggregate = paginateAggregate
}

module.exports.paginate = paginate
module.exports.paginateAggregate = paginateAggregate
