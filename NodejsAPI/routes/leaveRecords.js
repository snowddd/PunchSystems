

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
 *   leaveRecord:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       id:
 *         type: number
 *         example: 2
 *       Vacation:
 *         type: string
 *         example: "Annual Leave"
 *       VacationDate:
 *         type: string
 *         example: "2020-01-15"
 *   leaveRecordRes:
 *     properties:
 *       returnCode:
 *         type: string
 *         example: "0000"
 *       return:
 *         type: array
 *         items:
 *           $ref: '#/definitions/leaveRecord'
 *         example:
 *           - _id: "5e17f587605fad3310646291"
 *             id: 2
 *             Vacation: "Leave for Statutory Reasons"
 *             VacationDate: "2020-01-15"
 *           - _id: "5e17f589605fad3310646292"
 *             id: 2
 *             Vacation: "Annual Leave"
 *             VacationDate: "2020-02-17"
 *           - _id: "5e1d7d08f7dda03ea88a8779"
 *             id: 2
 *             Vacation: "Personal Leave"
 *             VacationDate: "2020-03-21"
 *           - _id: "5e1d7ee4d881b839b424579d"
 *             id: 2
 *             Vacation: "Personal Leave"
 *             VacationDate: "2020-05-15"
 */
/**
  * @swagger
  * /leaveRecords:
  *   post:
  *     description: user punch api
  *     tags: [Leave]
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
  *         description: return user 15 vacation date and type 
  *         schema:
  *           type: object
  *           $ref: '#/definitions/leaveRecordRes'
  *       9999:
  *         description: return error message
  *         schema:
  *           type: object
  *           $ref: '#/definitions/error'
  */
module.exports = app => {
    // recent 15 leave records
    app.post('/leaveRecords', function (req, res, next) {
        console.log('POST ' + apiDomain + '/leaveRecords');
        console.log(req);
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            db.collection("leave", function (err, collection) {
                collection.find({ id: parseInt(req.body.id) }).toArray(function (err, items) {
                    if (err) throw err;
                    console.log(items[0]);
                    console.log("We found " + items.length + " results!");
                    if (!items.length == 0) {
                        const recent50Array = [];
                        if (items.length < 15) {
                            for (i = 0; i < items.length; i++) {
                                recent50Array.push(items[i]);
                            }
                        }
                        else if (items.length > 15) {
                            for (i = 0; i < 15; i++) {
                                recent50Array.push(items[i]);
                            }
                        }
                        leaveReturnCode.return = recent50Array;
                        // trans date
                        //   for(i=0;i<leaveReturnCode.return.length;i++){
                        //     leaveReturnCode.return[i].CheckTime = leaveReturnCode.return[i].CheckTime + '';
                        // }
                        //   console.log(leaveReturnCode.return.CheckTime);
                        leaveReturnCode.returnCode = '0000';
                        res.json(leaveReturnCode);
                    } else if (items.length == 0) {
                        leaveReturnCode.return = '0 records';
                        leaveReturnCode.returnCode = '0001';
                        res.json(leaveReturnCode);

                    } else {
                        res.json(errorCode);
                    }
                });

            });
            client.close();
        });

    });


};