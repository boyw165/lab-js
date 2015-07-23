var doc = require('./doc');

/**
 *
 * @param {JSON} doc
 * @param {String} key
 * @param {Object} prop
 */
function propertyMatches(doc, key, prop) {
  for (var op in prop) {
    switch (op) {
    case '$eq':
      return doc[key] === prop[op];
    case '$gt':
      return doc[key] > prop[op];
    case '$lt':
      return doc[key] < prop[op];
    case '$not':
      return !propertyMatches(doc, key, prop[op]);
    }
  }

  return false;
}

/**
 *
 * @param {Array} arr
 * @param {Object} query
 */
function queryMatches(doc, query) {
  return doc.filter(function(subDoc) {
    for (var key in query) {
      return propertyMatches(subDoc, key, query[key]);
    }
    return false;
  });
}

////////////////////////////////////////////////////////////////////////////////
// Scenario ////////////////////////////////////////////////////////////////////

var REPEAT = 100000;
var took = 0.0;
var res;

for (var i = 0; i < REPEAT; ++i) {
  var now = Date.now();

  res = queryMatches(doc, {
    'age': {'$gt': 30}
  });
  took += (Date.now() - now);
}
console.log('- Normal query took %sms in average. REPEAT=%s', took / REPEAT, REPEAT);
console.log('  ,query result=', res.length);
