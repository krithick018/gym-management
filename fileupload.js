  var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv');
http.createServer(function (req, res) {

res.write("Welcome");
if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
      var newpath = 'd:/nodejs/fileupload/' + files.filetoupload.originalFilename;
	   console.log(oldpath);
	  res.write(oldpath);
	  res.write(newpath);
	  fs.copyFileSync(oldpath, newpath);
	  
	  mv(oldpath,newpath, function(err) {
    if (err) { throw err; }
console.log('file moved successfully');
 res.write('File uploaded and moved!');
res.end();
});
}).listen(process.env.PORT);