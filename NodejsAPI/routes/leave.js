

const apiDomain = 'http://localhost:5000';
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'PunchSystems';

const nowDate = new Date().getUTCFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

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
 *   LeaveReq:
 *     required:
 *       - id
 *       - Vacation
 *       - VactionDate
 *     properties:
 *       id:
 *         type: number
 *         example: 2
 *       Vacation:
 *         type: string
 *         example: "4"
 *       VacationDate:
 *         type: string
 *         example: "2020-03-05"
 *   leaveRes:
 *     properties:
 *       return:
 *         type: string
 *         example: "success to advance leave"
 *       returnCode:
 *         type: string
 *         example: "0000"
 */
/**
  * @swagger
  * /leave:
  *   post:
  *     description: user punch api
  *     tags: [Leave]
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: User's id (get from login API) & Vacation type and VacationDate(choose in select)
  *         in: body
  *         required: true
  *         schema:
  *           $ref: '#/definitions/LeaveReq'
  *           type: object
  *     responses:
  *       0000:
  *         description: return leave success message
  *         schema:
  *           type: object
  *           $ref: '#/definitions/leaveRes'
  *       9999:
  *         description: return error message
  *         schema:
  *           type: object
  *           $ref: '#/definitions/error'
  */
module.exports = app => {
    //Leave 
    app.post('/leave', function (req, res, next) {
        console.log('POST ' + apiDomain + '/leave');
        console.log(req);
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            if (checkDateMin(req.body.VacationDate)) {
                db.collection("leave", function (err, collection) {
                    collection.find({ id: parseInt(req.body.id) }).toArray(async function (err, items) {
                        if (err) throw err;

                        if (!items.length == 0) {

                            // get json value in array
                            const checkLeaveTimeList = items.map(time => Object.values(time)[3]);
                            // check leaveDate same
                            if (checkLeaveTimeList) {
                                const result = checkLeaveTimeList.filter(time => !time.indexOf(req.body.VacationDate));
                                if (result.length == 0) {
                                    await collection.insert({ id: parseInt(req.body.id), Vacation: leavetrans(parseInt(req.body.Vacation)), VacationDate: req.body.VacationDate });
                                    leaveReturnCode.return = "success to advance leave";
                                    leaveReturnCode.returnCode = '0000';
                                    res.json(leaveReturnCode);
                                }
                                else if (result.length > 0) {
                                    res.json(errorCode);
                                }
                            }
                        }
                        else {
                            await collection.insert({ id: parseInt(req.body.id), Vacation: leavetrans(req.body.Vacation), VacationDate: req.body.VacationDate });
                            leaveReturnCode.return = "success to advance leave";
                            leaveReturnCode.returnCode = '0000';
                            res.json(leaveReturnCode);
                        }
                        client.close();
                    });
                });

            } else {
                res.json(errorCode);
            }

            // db will close early insert 
            // client.close();
        });

    });

};

//checkleaveTime
function checkDateMin(leaveDate) {
    //year leaveDate>nowDate
    if (parseInt(leaveDate.slice(0, 4)) > parseInt(nowDate.slice(0, 4))) {
        return true;
    }
    //same year, month leaveDate>nowDate
    else if (parseInt(leaveDate.slice(0, 4)) === parseInt(nowDate.slice(0, 4)) && parseInt(leaveDate.slice(5, 7)) > parseInt(nowDate.slice(5, 7))) {
        return true;
    }
    //same year, same month, date leaveDate>nowDate
    else if (parseInt(leaveDate.slice(0, 4)) === parseInt(nowDate.slice(0, 4)) && parseInt(leaveDate.slice(5, 7)) === parseInt(nowDate.slice(5, 7)) && parseInt(leaveDate.slice(8, 10)) >= parseInt(nowDate.slice(7, 10))) {
        return true;
    }
    else {
        return false;
    }

}

//trans leave
function leavetrans(leave) {
    switch (leave) {
        case 0:
            return 'Leave for Statutory Reasons';
        case 1:
            return 'Personal Leave';
        case 2:
            return 'Sick Leave';
        case 3:
            return 'Marital Leave';
        case 4:
            return 'Annual Leave';
        default:
            return 'Annual Leave';
    }

}