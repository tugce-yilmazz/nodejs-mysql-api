const app = require('express')()
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
//create a server object:

var con = mysql.createConnection({
    user: 'root',
    password: 'root@ttao1306',
    server: 'localhost', 
    database: 'is_odev' ,
    port:3306
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM is_odev.musteri_bilgileri", function (err, result, fields) {
    if (err) throw err;

      app.use(bodyParser.json())

      app.get('/customer', (req, res) => {
      res.send({user:result})
      res.end();
      });


      app.get('/customer/:id', (req, res) => {
      user = result;
      user = user.find(user => user.id === parseInt(req.params.id))
      user ? res.send({user}) : res.status(404).json({message: 'User not found.'})
      res.end();
      });

    

      app.post('/post', function(req, res) {

        var jsondata = req.body;
 
       console.log("data",[jsondata.values]);
        const query = con.query("INSERT INTO is_odev.musteri_bilgileri SET ?", jsondata, function(err,result) {
          if(err) {
             res.send(err);
          }
         else {
             res.send('Success');
          }
        })
        console.log(query.sql);

  })

})
app.get('/post', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
  })

})

app.listen(4000, () => console.log("dinliyor"))

