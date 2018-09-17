var express = require('express');
var router = express.Router();

// GET userlist. 
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
   collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

/* POST to adduser. */
router.post('/adduser', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

/* DELETE to deleteuser. */
router.delete('/deleteuser/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  var userToDelete = req.params.id;
  collection.remove({ '_id' : userToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});

router.get('/searchuser/:key', function(req, res) {
console.log(123);
 var db = req.db;
 var skey = req.params.key;
 console.log(skey);
  var collection = db.get('userlist');
   collection.find({'firstname' : skey },function(e,docs){
    res.json(docs);
  });
});

module.exports = router;
