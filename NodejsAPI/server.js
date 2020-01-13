
returnCode = {
  "return": "success to login", "returnCode": "0000", "id": ""
};

profileReturnCode = {
  "return": []
  , "returnCode": "0000"
};

punchReturnCode = {
  "returnCode": "0000",
  "return": ""
}

leaveReturnCode = {
  "returnCode": "0000",
  "return": ""
}



errorCode = {
  "return": "fail", "returnCode": "9999"
};

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: '*',
};

const apiDomain = 'http://localhost:5000';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const nowDate = new Date().getUTCFullYear()+'-'+(new Date().getMonth()+1)+'-'+ new Date().getDate();

//UTC+8
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + (h * 60 * 60 * 1000));
  return this;
}

//checkleaveTime
function checkDateMin(leaveDate){
  //year leaveDate>nowDate
if(parseInt(leaveDate.slice(0,4))>parseInt(nowDate.slice(0,4))){
 return true;
}
 //same year, month leaveDate>nowDate
else if (parseInt(leaveDate.slice(0,4)) === parseInt(nowDate.slice(0,4)) && parseInt(leaveDate.slice(5,7))>parseInt(nowDate.slice(5,7)) )    
{
  return true;
}
//same year, same month, date leaveDate>nowDate
else if (parseInt(leaveDate.slice(0,4)) === parseInt(nowDate.slice(0,4)) && parseInt(leaveDate.slice(5,7)) === parseInt(nowDate.slice(5,7)) && parseInt(leaveDate.slice(8,10)) >= parseInt(nowDate.slice(7,10)) )    
{
  return true;
}
else{
return false;
}

}


//trans leave
function leavetrans(leave){
switch(leave){
case 0 :
return 'Leave for Statutory Reasons';
case 1 :
return 'Personal Leave';
case 2 :
return 'Sick Leave';
case 3 :
return 'Marital Leave';
case 4 :
return 'Annual Leave';
default:
return 'Annual Leave';
}

}

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'PunchSystems';

var app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Login
app.post('/login', function (req, res, next) {
  console.log('POST ' + apiDomain + '/login');
  console.log(req);
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    db.collection("accounts", function (err, collection) {
      collection.find({ account: `${req.body.account}` }).toArray(function (err, items) {
        if (err) throw err;
        console.log(items);
        console.log("We found " + items.length + " results!");

        if (!items.length == 0) {
          returnCode.id = items[0].id;
          if (items[0].account == req.body.account && items[0].password == req.body.password) {
            res.json(returnCode);
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

// MemberProfile
app.post('/profiLe', function (req, res, next) {
  console.log('POST ' + apiDomain + '/profiLe');
  console.log(req);
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);

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

// Punch
app.post('/punch', function (req, res, next) {
  console.log('POST ' + apiDomain + '/punch');
  console.log(req);
  MongoClient.connect(url,  function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    db.collection("punch",  function (err, collection) {
       collection.find({ id: parseInt(req.body.id) }).toArray( async function (err, items) {
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
          if(items.length<50)
          {
            for(i=0;i<items.length;i++)
            {
            recent50Array.push(items[i]);
            }
          }
          else if (items.length>50)
          {
            for(i=0;i<50;i++)
            {
            recent50Array.push(items[i]);
            }
          }
          punchReturnCode.return = recent50Array;
          // trans date
          for(i=0;i<punchReturnCode.return.length;i++){
          punchReturnCode.return[i].CheckTime = punchReturnCode.return[i].CheckTime + '';
        }
        punchReturnCode.returnCode = '0000';
          console.log(punchReturnCode.return.CheckTime);
          res.json(punchReturnCode);
        } else if (items.length == 0) {
          punchReturnCode.return = '0 records';
          punchReturnCode.returnCode = '0001';
          res.json(punchReturnCode);

        }else {
          res.json(errorCode);
        }
      });

    });
    client.close();
  });

});


//Leave 
app.post('/leave', function (req, res, next) {
  console.log('POST ' + apiDomain + '/leave');
  console.log(req);
  MongoClient.connect(url,  function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    console.log('``````````````````````````````````````````````````````````')
    console.log(checkDateMin(req.body.VacationDate))
    console.log('``````````````````````````````````````````````````````````')
    if(checkDateMin(req.body.VacationDate)){
    db.collection("leave",  function (err, collection) {
       collection.find({ id: parseInt(req.body.id) }).toArray( async function (err, items) {
        if (err) throw err;

        if (!items.length == 0) {

          // get json value in array
          const checkLeaveTimeList = items.map(time => Object.values(time)[3]);
          // check leaveDate same
          if (checkLeaveTimeList) {
           const result = checkLeaveTimeList.filter(time => !time.indexOf(req.body.VacationDate));
           if (result.length==0){
            await collection.insert({ id: parseInt(req.body.id), Vacation : leavetrans(parseInt(req.body.Vacation)) , VacationDate:req.body.VacationDate });
            leaveReturnCode.return = "success to advance leave";
            leaveReturnCode.returnCode = '0000';
            res.json(leaveReturnCode);
            }
            else if (result.length>0){
            res.json(errorCode);
            }
          }
        }
        else {
          await collection.insert({ id: parseInt(req.body.id), Vacation : leavetrans(req.body.Vacation) , VacationDate:req.body.VacationDate });
          leaveReturnCode.return = "success to advance leave";
          leaveReturnCode.returnCode = '0000';
          res.json(leaveReturnCode);
        }
        client.close();
      });
    });

  }else{
res.json(errorCode);
  }

    // db will close early insert 
    // client.close();
  });

});


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
          if(items.length<15)
          {
            for(i=0;i<items.length;i++)
            {
            recent50Array.push(items[i]);
            }
          }
          else if (items.length>15)
          {
            for(i=0;i<15;i++)
            {
            recent50Array.push(items[i]);
            }
          }
          leaveReturnCode.return = recent50Array;
          // trans date
          for(i=0;i<leaveReturnCode.return.length;i++){
            leaveReturnCode.return[i].CheckTime = leaveReturnCode.return[i].CheckTime + '';
        }
          console.log(leaveReturnCode.return.CheckTime);
          leaveReturnCode.returnCode = '0000';
          res.json(leaveReturnCode);
        } else if (items.length == 0) {
          leaveReturnCode.return = '0 records';
          leaveReturnCode.returnCode = '0001';
          res.json(leaveReturnCode);

        }else {
          res.json(errorCode);
        }
      });

    });
    client.close();
  });

});






app.listen(5001); //dedault port




console.log('Node.js web server at port 5001 is running..')