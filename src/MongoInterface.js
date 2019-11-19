export default class MongoInterface {
  constructor(database, collection) {
    this.collection = database.collection(collection);
  }

  findAll() {
    return new Promise(function(resolve, reject) {
      this.collection.find().toArray((err, docs) => {
        if (err) {
          return reject(err)
        }
        
        return resolve(docs)
      })
    }.bind(this))
  }

  deleteOne(item) {
    return new Promise(function(resolve, reject) {
      this.collection.deleteOne(item, (err) => {
        if (err) {
          return reject(err)
        }
        
        return resolve(JSON.stringify(item) + ' deleted from db!');
      })
    }.bind(this))
  }

  insertOne(item) {
    return new Promise(function(resolve, reject) {
      this.collection.insertOne(item, (err) => {
        if (err) {
          return reject(err)
        }
        
        return resolve(JSON.stringify(item) + ' added to db!');
      })
    }.bind(this))
  }

  findByProperty(property) {
    return new Promise(function(resolve, reject) {
      this.collection.find(property).toArray((err, docs) => {
        if (err) {
          return reject(err)
        }
        
        return resolve(docs)
      })
    }.bind(this))
  }
 }