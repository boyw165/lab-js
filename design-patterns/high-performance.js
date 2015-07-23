var queryMatches = function(doc, query) {
  return Object.keys(query).every(function(name) {
    return propertyMatches(doc, name, query[name]);
  })
}

/**
 * Version 1
 */
var propertyMatches = function(doc, name, prop) {
  return Object.keys(prop).every(function(op) {
    switch (op) {
    case '$eq':
      return  doc[name] === prop[op];
    case '$gt':
      return  doc[name] > prop[op];
    case '$lt':
      return  doc[name] < prop[op];
    case '$not':
      return  !propertyMatches(doc, name, prop[op]);
    }

    return false;
  });
}

/**
 * Version 2
 */
var propertyMatches = function(doc, name, prop) {
  return Object.keys(prop).every(function(op) {
    switch (op) {
    case '$eq':
      return  doc[name] === prop[op];
    case '$gt':
      return  doc[name] > prop[op];
    case '$lt':
      return  doc[name] < prop[op];
    case '$not':
      return  !propertyMatches(doc, name, prop[op]);
    }

    return false;
  });
}
