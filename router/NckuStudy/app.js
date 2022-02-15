const express = require("express");
const fetch = require("node-fetch");
const config = require("./config.json");
const router = express.Router();
const host = "http://127.0.0.1";

var pending = config.pending;
router.use((req, res) => {
  const method = req.method;
  const body = JSON.stringify(req.body);
  const headers = req.headers;

  let minPending = 0;
  for (let i = 0; i < pending.length; i++) { //can reduce delay if  use heap
    if (pending[minPending] > pending[i]) {
      minPending = i;
    }
  }
  let port = config.port[minPending];
  pending[minPending]++;
  const url = `${host}:${port}` + req.url;
  console.log(url)
  const packMsg =
    req.method === "GET"
      ? { method: method, headers: headers }
      : { method: method, body: body, headers: headers };
  fetch(url, packMsg).then(async (result) => {
    const resBody = await result.text();
    res.send(resBody);
  });
  //pending[minPending]--;
});

module.exports = router;
