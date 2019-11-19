import MongoInterface from './MongoInterface.js'

export default class DatabaseHandlers {
  constructor(database) {
    this.toyCollectionInterface = new MongoInterface(database, 'toys');
  }

  async getAllDocuments(req, res, next) {
    const allDocuments = await this.toyCollectionInterface.findAll();
    return res.send({ allDocuments });
  }

  async deleteOne(req, res, next) {
    const deletionResponse = await this.toyCollectionInterface.deleteOne(req.body);
    return res.send(deletionResponse);
  }

  async insertOne(req, res, next) {
    const insertionResponse = await this.toyCollectionInterface.insertOne(req.body);
    return res.send(insertionResponse);
  }

  async filterByProperty(req, res, next) {
    const filteredDocs = await this.toyCollectionInterface.findByProperty(req.body);
    return res.send(filteredDocs);
  }
}