import mongodb from 'mongodb'
const { ObjectId } = mongodb;

import parseNestedJsonFromQueryParam from './_utils/parseNestedJsonFromQueryParam.js'

export default class MongoInterface {
  constructor(database, collection) {
    this.collection = database.collection(collection);

    this.queryOperators = {
      LESS_THAN: {
        url: 'lt',
        operator: '$lt'
      },
      GREATER_THAN: {
        url: 'gt',
        operator: '$gt'
      }
    }
  }

  assignQueryOperators(obj) {
    const parsedObj = parseNestedJsonFromQueryParam(obj);

    Object.values(parsedObj).forEach((value) => {
      Object.keys(value).forEach((key) => {
        if (key === this.queryOperators.LESS_THAN.url) {
          const queryKey = this.queryOperators.LESS_THAN.operator;
          value[queryKey] = value[key];
          delete value[key];
        }

        if (key === this.queryOperators.GREATER_THAN.url) {
          const queryKey = this.queryOperators.GREATER_THAN.operator;
          value[queryKey] = value[key];
          delete value[key];
        }
      })
    });

    return parsedObj;
  }

  findAll() {
    return new Promise(function(resolve, reject) {
      this.collection.find().toArray((err, items) => {
        if (err) {
          return reject(err)
        }
        
        return resolve(items)
      })
    }.bind(this))
  }

  insertOne(item) {
    return new Promise(function(resolve, reject) {
      this.collection.insertOne(item, (err) => {
        if (err) {
          return reject(err)
        }
        
        return resolve(item);
      })
    }.bind(this))
  }

  findById(id) {
    return new Promise(function(resolve, reject) {
      this.collection.findOne({ _id: ObjectId(id) }, (err, item) => {
        if (err) {
          return reject(err)
        }
        
        return resolve(item);
      })
    }.bind(this))
  }

  deleteById(id) {
    return new Promise(function(resolve, reject) {
      this.collection.deleteOne({ _id: ObjectId(id) }, (err, item) => {
        if (err) {
          return reject(err)
        }
        
        return resolve({
          id
        });
      })
    }.bind(this))
  }

  updateById(id, obj) {
    return new Promise(function(resolve, reject) {
      this.collection.findOneAndUpdate(
        { _id: ObjectId(id) }, 
        { '$set': obj },
        { returnOriginal: false }, 
        (err, item) => {
        if (err) {
          return reject(err)
        }
        
        return resolve(item.value);
      })
    }.bind(this))
  }

  filterByKeyValue(obj) {
    const objWithQueryOperators = this.assignQueryOperators(obj);

    return new Promise(function(resolve, reject) {
      this.collection.find(objWithQueryOperators).toArray((err, items) => {
        if (err) {
          return reject(err)
        }
        
        return resolve(items);
      })
    }.bind(this))
  }

 }