const hre = require("hardhat");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const airDrop = async function (user_address) {
  const NFT = await hre.ethers.getContractFactory("FeedMob");
  const { CONTRACT_ADDRESS } = process.env;
  const contract = NFT.attach(CONTRACT_ADDRESS);
  const amount = 100 // token amount
  const tx = contract.airDrop(user_address, amount);
  return tx;
}

var jsonParser = bodyParser.json()

app.use(express.static('public'));

app.get('/', function (req, res) {
  console.log("Got a GET request for the homepage");
  res.sendFile( __dirname + "/" + "index.html");
})

app.post('/airdrop', jsonParser, async function (req, res) {
  var address = req.body.address;
  console.log("address: ", address);
  var result = await airDrop(address);
  if (result) {
    console.log("result: ", result);
    res.send("success");
  }
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
