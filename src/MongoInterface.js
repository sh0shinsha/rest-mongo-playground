import mongodb from 'mongodb'
const { ObjectId } = mongodb;

export default class MongoInterface {
  constructor(database, collection) {
    this.collection = database.collection(collection);
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

  // deleteOne(item) {
  //   return new Promise(function(resolve, reject) {
  //     this.collection.deleteOne(item, (err) => {
  //       if (err) {
  //         return reject(err)
  //       }
        
  //       return resolve(JSON.stringify(item) + ' deleted from db!');
  //     })
  //   }.bind(this))
  // }

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

  // findByProperty(property) {
  //   return new Promise(function(resolve, reject) {
  //     this.collection.find(property).toArray((err, docs) => {
  //       if (err) {
  //         return reject(err)
  //       }
        
  //       return resolve(docs)
  //     })
  //   }.bind(this))
  // }
 }