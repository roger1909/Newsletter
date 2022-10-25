const express = require('express');
const app = express();
const request = require('request')
const https = require('https')

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/signup.html')

})

app.post('/', function(req, res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.Email;
const data = {
  members: [
    {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};
const jsonData = JSON.stringify(data);
const url =  'https://us21.api.mailchimp.com/3.0/lists/e0495418eb'
const options = {
  method: 'post',
  auth: 'roger1:a0ed6752ffbc5c2a14ef5a866559ccac-us21'
}
const request = https.request(url, options, function(response){
  if (response.statusCode === 200) {
    res.sendFile(__dirname + '/success.html')
  } else {
    res.sendFile(__dirname + '/failure.html')
  }
  response.on('data', function(data){
    console.log(JSON.parse(data))
  })
})

request.write(jsonData);
request.end()
});









app.listen(3000, function(){
  console.log('server is running on 3000')
})



// a0ed6752ffbc5c2a14ef5a866559ccac-us21  apikey

// e0495418eb audience key
