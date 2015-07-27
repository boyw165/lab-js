var express = require('express');
var router = express.Router();

function guidGen() {
  var S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

router.get('/', function (req, res, next) {
  res.render('index', {title: 'Welcome'});
});

/**
 * Access map candidates.
 */
router.post('/search/map', function(req, res, next) {
  var ret = [];

  if (req.body.search) {
    for (var i = 0; i < 20; ++i) {
      ret.push(req.body.search +
               (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1));
    }
  }

  res.send({
    candidates: ret
  });
});

module.exports = router;
