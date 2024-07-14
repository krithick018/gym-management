var MongoClient = require('Kultfitdb').MongoClient;
var url = "mongodb+srv://krithicknarayan:Krithick@123@cluster0.zf5hmex.mongodb.net/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Kultfitdb");
  dbo.collection("registration").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.name);
    db.close();
  });
});