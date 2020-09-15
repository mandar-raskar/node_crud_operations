var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var mongo = require('mongodb');

/* GET home page. */
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");


router.post("/adduser",function(req,res){
  var myobj = { 
    "firstname" : req.body.firstname,
    "lastname" : req.body.lastname,
    "email" : req.body.email,
    "phone" : req.body.phone,
    "imagename" : req.body.imagename,
    "image" : req.body.image
   };
   dbo.collection("customers").findOne({email : req.body.email}, function(err, result) {
    if(result){
    return  res.json({"status":"success", result:"Email alredy exists"})
    }
    else{
  dbo.collection("customers").insertOne(myobj, function(err, result1) {
    if (err) {
      res.json({"status":"failure",result:""})
    };
   return res.json({"status":"success",result:"Inserted"})

  });
}
})
});

router.get("/getuser",function(req,res){
  dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) {
      res.json({"status":"failure", result:""})
    };
    res.json({"status":"success", result:result})

  });
})

router.post("/deleteuser",function(req,res){
  var myquery = { "email": req.body.email };
  dbo.collection("customers").deleteOne(myquery, function(err, obj) {
    if (err) {
      res.json({"status":"failure", result:""})
    };
    res.json({"status":"success", result:"Record Deleted"})

  });
})

router.post("/getuser", function(req,res){
  dbo.collection("customers").findOne({email : req.body.email}, function(err, result) {
    if (err) {
      res.json({"status":"failure", result:""})
    };
    res.json({"status":"success", result:result})
  });
})


})


module.exports = router;
