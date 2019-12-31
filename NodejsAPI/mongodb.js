const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

  // Connection URL
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'myproject';



// leaveData mongo~
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   db.createCollection('leave',function(err,collection){
//   if (err) throw err;
//   client.close(); //close mongodb
//   });
// });


// punchData mongo~
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   db.createCollection('punch',function(err,collection){
// client.close(); //close mongodb
//   });
// });


//accountsData mongo~
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);

//   db.collection('accounts',function(err,collection){
//     collection.insert({ id:1, account:'Steve', password:'123456' });
//     collection.insert({ id:2, account:'Bill', password:'123456' });
//     collection.insert({ id:3, account:'James', password:'123456' });
 
    // collection.count(function(err,count){
    //     if(err) throw err;
    //     console.log('Total Rows:'+count);
    // });
//   });
//   client.close(); //close mongodb
// });

//employee mongo~
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);

//   db.collection('employee',function(err,collection){
//     collection.insert({ id:1, name:'Steve', sex:'1',personId:'G123456789',birthDate:'1970/07/10',phobe:'0900291823',position:'Chairman',department:'Business' });
//     collection.insert({ id:2, name:'Bill', sex:'1' ,personId:'A123456789',birthDate:'1988/06/15',phobe:'0954293179',position:'Manager',department:'Sales' });
//     collection.insert({ id:3, name:'James', sex:'2' ,personId:'B123456789',birthDate:'2001/07/29',phobe:'0923296412',position:'Staff',department:'HR' });
 
//     collection.count(function(err,count){
//         if(err) throw err;
//         console.log('Total Rows:'+count);
//     });
//   });
//   client.close(); //close mongodb
// });


