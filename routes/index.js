var express = require('express');
var router = express.Router();
const shell = require('node-powershell');
var cors =require('cors')

/* GET home page. */
router.get('/', cors(),  (req, res, next)=> {
  let ps = new shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });
  console.log("this is code")
  console.log(req.query.code)
  if (req.query.code) {
    ps.addCommand(`${req.query.code}`)
    ps.invoke()
      .then(output => {
        console.log(output)
        res.end(output)
        
        // res.json({ output: output });
      })
      .catch(err => {
        console.log(err);
        ps.dispose();
      });
  } else {
    ps.addCommand('ls')
    ps.invoke()
      .then(output => {
        console.log(output)
        res.json({ output: output });
      })
      .catch(err => {
        console.log(err);
        ps.dispose();
      });
  }
  
  // ps.addCommand(req.body.pathRout)



});

module.exports = router;
