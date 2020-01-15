const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const mongodbConfig = require('../config/mongodbConfig');


/**
 * @swagger
 * definitions:
 *   error:
 *     properties:
 *       return:
 *         type: string
 *       returnCode:
 *         type: string
 *         example: "9999"
 *   idReq:
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: string
 *         example: "2"
 *   MemberProfileRes:
 *     properties:
 *       return:
 *         type: object
 *         properties:
 *           _id:
 *             type: string
 *             example: "5e0b10ce99165209d0104b34"
 *           id:
 *             type: number
 *             example: 2
 *           name:
 *             type: string
 *             example: "Bill"
 *           sex:
 *             type: string
 *             example: "1"
 *           personId:
 *             type: string
 *             example: "A123456789"
 *           birthDate:
 *             type: string
 *             example: "1988/06/15"
 *           phone:
 *             type: string
 *             example: "0954293179"
 *           position:
 *             type: string
 *             example: "Manager"
 *           department:
 *             type: string
 *             example: "Sales"
 *       returnCode:
 *         type: string
 *         example: "0000"
 */
/**
  * @swagger
  * /profiLe:
  *   post:
  *     description: work Member profile
  *     tags: [MemberProfile]
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: User's id (get from login API)
  *         in: body
  *         required: true
  *         schema:
  *           $ref: '#/definitions/idReq'
  *           type: object
  *     responses:
  *       0000:
  *         description: return member profile from id search
  *         schema:
  *           type: object
  *           $ref: '#/definitions/MemberProfileRes'
  *       9999:
  *         description: return error message
  *         schema:
  *           type: object
  *           $ref: '#/definitions/error'
  */
module.exports = app => {
  // MemberProfile
  app.post('/profiLe', function (req, res, next) {
    console.log('POST ' + mongodbConfig.apiDomain + '/profiLe');
    console.log(req);
    MongoClient.connect(mongodbConfig.url, function (err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(mongodbConfig.dbName);

      db.collection("employee", function (err, collection) {
        collection.find({ id: parseInt(req.body.id) }).toArray(function (err, items) {
          if (err) throw err;
          console.log(items[0]);
          console.log("We found " + items.length + " results!");
          if (!items.length == 0) {
            profileReturnCode.return = items
            res.json(profileReturnCode);
          } else {
            res.json(errorCode);
          }
        });

      });
      client.close();
    });

  });

};