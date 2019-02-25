# Timon Order
![Timon](https://github.com/thaisribeiro/timon-order/blob/master/meerkat-3828228_1280.jpg)

> [Mongoose](http://mongoosejs.com) based paging library

## Installation

```sh
npm install timon-order
```

## Usage
Add the plugin to your schema and when using use `paginate` for common pageings or `paginateAggregate` for aggregate pageings:

```js
import mongoose from 'mongoose'
import timonOrder from 'timon-order'

const mySchema = new mongoose.Schema({ 
    /*you schema*/
})

mySchema.plugin(timonOrder)
const myModel = mongoose.model('myModel',  mySchema)

async function myFunction() {
	const paginate = myModel.paginate({}) //usage
	const paginateAggregate = myModel.paginateAggregate({})
}

```

### Model.paginate([query], [options])

**Parameters**

* `[query]` {Object} - mongoose queires. [Documentation](https://mongoosejs.com/docs/api.html#query_Query)
* `[options]` {Object}
  - `[page=1]` {Number} - Default 1
  - `[limit=10]` {Number} - Default 10

### Model.paginateAggregate([query], [options])

**Parameters**

* `[query]` [{Object}] - mongoose aggregate. [Documentation](https://mongoosejs.com/docs/api.html#aggregate_Aggregate)
* `[options]` {Object} 
  - `[page=1]` {Number} - Default 1
  - `[limit=10]` {Number} - Default 10
  
