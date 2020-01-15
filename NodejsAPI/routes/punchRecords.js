

const apiDomain = 'http://localhost:5000';
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'PunchSystems';



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
 *   punchRecordRes:
 *     properties:
 *       returnCode:
 *         type: string
 *         example: "0000"
 *       return:
 *         type: array
 *         items:
 *           $ref: '#/definitions/punchRecord'
 *         example:
 *           - _id: "5e17f587605fad3310646291"
 *             id: 1
 *             CheckStatus: 1
 *             CheckTime: "Fri Jan 10 2020 11:54:47 GMT+0800 (GMT+08:00)"
 *           - _id: "5e17f589605fad3310646292"
 *             id: 1
 *             CheckStatus: 2
 *             CheckTime: "Fri Jan 10 2020 11:54:49 GMT+0800 (GMT+08:00)"
 *           - _id: "5e1d7d08f7dda03ea88a8779"
 *             id: 1
 *             CheckStatus: 1
 *             CheckTime: "Tue Jan 14 2020 16:34:16 GMT+0800 (GMT+08:00)"
 *           - _id: "5e1d7ee4d881b839b424579d"
 *             id: 1
 *             CheckStatus: 2
 *             CheckTime: "Tue Jan 14 2020 16:42:12 GMT+0800 (GMT+08:00)"
 *   punchRecord:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       id:
 *         type: number
 *         example: 2
 *       CheckStatus:
 *         type: number
 *         example: 1
 *       CheckTime:
 *         type: string
 *         example: "Fri Jan 10 2020 11:54:47 GMT+0800 (GMT+08:00)"
 */
/**
  * @swagger
  * /punchRecords:
  *   post:
  *     description: user punch 50 records
  *     tags: [Punch]
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
  *         description: return user punch time and status in 50 records
  *         schema:
  *           type: object
  *           $ref: '#/definitions/punchRecordRes'
  *       9999:
  *         description: return error message
  *         schema:
  *           type: object
  *           $ref: '#/definitions/error'
  */
module.exports = app => {
    // recent 50 punch records
    app.post('/punchRecords', function (req, res, next) {
        console.log('POST ' + apiDomain + '/punchRecords');
        console.log(req);
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            db.collection("punch", function (err, collection) {
                collection.find({ id: parseInt(req.body.id) }).toArray(function (err, items) {
                    if (err) throw err;
                    console.log(items[0]);
                    console.log("We found " + items.length + " results!");
                    if (!items.length == 0) {
                        const recent50Array = [];
                        if (items.length < 50) {
                            for (i = 0; i < items.length; i++) {
                                recent50Array.push(items[i]);
                            }
                        }
                        else if (items.length > 50) {
                            for (i = 0; i < 50; i++) {
                                recent50Array.push(items[i]);
                            }
                        }
                        punchReturnCode.return = recent50Array;
                        // trans date
                        for (i = 0; i < punchReturnCode.return.length; i++) {
                            punchReturnCode.return[i].CheckTime = punchReturnCode.return[i].CheckTime + '';
                        }
                        punchReturnCode.returnCode = '0000';
                        console.log(punchReturnCode.return.CheckTime);
                        res.json(punchReturnCode);
                    } else if (items.length == 0) {
                        punchReturnCode.return = '0 records';
                        punchReturnCode.returnCode = '0001';
                        res.json(punchReturnCode);

                    } else {
                        res.json(errorCode);
                    }
                });

            });
            client.close();
        });

    });
};