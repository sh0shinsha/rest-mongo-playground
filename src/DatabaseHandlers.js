import MongoInterface from './MongoInterface.js'
import urljoin from 'url-join'

export default class DatabaseHandlers {
  constructor(database) {
    this.userCollectionInterface = new MongoInterface(database, 'users');
    this.baseURI = 'http://localhost:9000/'
  }

  async addUser(req, res, next) {
    const insertionResponse = await this.userCollectionInterface.insertOne(req.body);
    return res.status(201).send({
      entry: {
        keyField: insertionResponse._id,
        uri: urljoin(this.baseURI, 'user', `${insertionResponse._id}`)
      }
    });
  }

  async findUser(req, res, next) {
    const user = await this.userCollectionInterface.findById(req.params.id);
    return res.status(200).send(user);
  }

  async allUsers(req, res, next) {
    const allusers = await this.userCollectionInterface.findAll();
    return res.status(200).send(allusers);
  }

  async deleteUser(req, res, next) {
    const deletionResponse = await this.userCollectionInterface.deleteById(req.params.id);
    return res.status(200).send({
      entry: {
        keyField: deletionResponse.id
      }
    })
  }

}