export async function paginate(filter, options) {
    const params = filter || {}
    const page = +options.page || 1
    const limit = +options.limit || 10

    const data = await this.find(params)
        .skip((limit * page) - limit)
        .limit(limit)
        .lean()

    const count = (await this.find(params)).length

    return {
        docs: data,
        total: count,
        page: page,
        limit: limit,
        pages: Math.ceil(count / limit) || 1
    }
}

export async function paginateAggregate(filter, options) {
    const page = +options.page || 1
    const limit = +options.limit || 10
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