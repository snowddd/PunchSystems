

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
 *   punchRes:
 *     properties:
 *       return:
 *         type: string
 *         example: "punchIn"
 *       returnCode:
 *         type: string
 *         example: "0000"
 */
/**
  * @swagger
  * /punch:
  *   post:
  *     description: user punch api
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
  *         description: return you are punchIn = "1" or PunchOut = "2" now
  *         schema:
  *           type: object
  *           $ref: '#/definitions/punchRes'
  *       9999:
  *         description: return error message
  *         schema:
  *           type: object
  *           $ref: '#/definitions/error'
  */
module.exports = app => {
    // Punch
    app.post('/punch', function (req, res, next) {
        console.log('POST ' + apiDomain + '/punch');
        console.log(req);
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);

            db.collection("punch", function (err, collection) {
                collection.find({ id: parseInt(req.body.id) }).toArray(async function (err, items) {
                    if (err) throw err;
                    if (!items.length == 0) {
                        cktime = (new Date().toString().slice(0, 15));

                        // get json value in array
                        const checkTimeList = items.map(time => Object.values(time)[3]);
                        const checkTimeListString = [];

                        // trans date to string
                        for (i = 0; i < checkTimeList.length; i++) {
                            console.log(checkTimeList[i])
                            abc = checkTimeList[i] + '';
                            checkTimeListString.push(abc);
                        }
                        if (checkTimeListString) {
                            const result = checkTimeListString.filter(time => !time.indexOf(cktime));
                            console.log(result)

                            //check punch status
                            switch (result.length) {
                                case 0:
                                    await collection.insert({ id: parseInt(req.body.id), CheckStatus: 1, CheckTime: new Date() });
                                    punchReturnCode.return = "punchIn";
                                    punchReturnCode.returnCode = '0000';
                                    res.json(punchReturnCode);
                                    break;
                                case 1:
                                    await collection.insert({ id: parseInt(req.body.id), CheckStatus: 2, CheckTime: new Date() });
                                    punchReturnCode.return = "punchOut";
                                    punchReturnCode.returnCode = '0000';
                                    res.json(punchReturnCode);
                                    break;
                                case 2:
                                    punchReturnCode.return = "cannot punch this day";
                                    punchReturnCode.returnCode = '0002';
                                    res.json(punchReturnCode);
                                    break;
                                default:
                                    punchReturnCode.return = "cannot punch this day";
                                    punchReturnCode.returnCode = '0002';
                                    res.json(punchReturnCode);
                                    break;
                            }
                        }
                    }
                    else {
                        await collection.insert({ id: parseInt(req.body.id), CheckStatus: 1, CheckTime: new Date() });
                        punchReturnCode.return = "punchIn";
                        punchReturnCode.returnCode = '0000';
                        res.json(punchReturnCode);
                    }
                    client.close();
                });
            });
            // db will close early insert 
            // client.close();
        });

    });

};