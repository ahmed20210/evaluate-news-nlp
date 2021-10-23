const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
 cors = require('cors')
const fetch = require('node-fetch')

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());

app.use(express.static('dist'))
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
let userInput = [] 

console.log(apiKey)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})
app.post('/api', async function(req, res) {
    userInput = req.body.url;
    console.log(`You entered: ${userInput}`);
    const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`

    const response = await fetch(apiURL)
    const resData = await response.json()
    console.log(resData)
    res.send(resData)
 const projectData = {
       score_tag : resData.score_tag,
       agreement : resData.agreement,
       subjectivity : resData.subjectivity,
       confidence : resData.confidence,
       irony : resData.irony
      }
      res.send(projectData);
})
// designates what port the app will listen to for incoming requests
app.listen(8089, function () {
    console.log('Example app listening on port 8089!')
})

