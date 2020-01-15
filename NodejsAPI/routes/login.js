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
 *   LoginReq:
 *     required:
 *       - account
 *       - password
 *     properties:
 *       account:
 *         type: string
 *         example: Bill
 *       password:
 *         type: string
 *         example: e10adc3949ba59abbe56e057f20f883e
 *   LoginRes:
 *     properties:
 *       return:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             example: 2
 *       returnCode:
 *         type: string
 *         example: "0000"
 */
/**
   * @swagger
   * /login:
   *   post:
   *     description: Login to the application
   *     tags: [Login]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: User's name & password(md5 hased).
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/LoginReq'
   *           type: object
   *     responses:
   *       0000:
   *         description: return this user id
   *         schema:
   *           type: object
   *           $ref: '#/definitions/LoginRes'
   *       9999:
   *         description: return error message
   *         schema:
   *           type: object
   *           $ref: '#/definitions/error'
   */
module.exports = app => {
    //login
    app.post('/login', function (req, res, next) {
        console.log('POST ' + mongodbConfig.apiDomain + '/login');
        console.log(req);
        MongoClient.connect(mongodbConfig.url, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(mongodbConfig.dbName);

            db.collection("accounts", function (err, collection) {
                collection.find({ account: `${req.body.account}` }).toArray(function (err, items) {
                    if (err) throw err;
                    console.log(items);
                    console.log("We found " + items.length + " results!");

                    if (!items.length == 0) {
                        loginreturnCode.id = items[0].id;
                        if (items[0].account == req.body.account && items[0].password == req.body.password) {
                            res.json(loginreturnCode);
                        } else {
                            res.json(errorCode);
                        }
                    } else {
                        res.json(errorCode);
                    }
                });

            });
            client.close();
        });

    });

};