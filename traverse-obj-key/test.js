var obj = {
  name: 'Nick',
  friends: ['Boy', 'Yuren', 'Emery'],
  age: 30,
  from: 'Canada',
  interests: ['entrepeneur', 'reading', 'travelling'],
  skills: ['js', 'node.js'],
  married: false,
  // Rest are generated...
  test0: false,
  test1: false,
  test2: false,
  test3: false,
  test4: false,
  test5: false,
  test6: false,
  test7: false,
  test8: false,
  test9: false,
  test10: false,
  test11: false,
  test12: false,
  test13: false,
  test14: false,
  test15: false,
  test16: false,
  test17: false,
  test18: false,
  test19: false,
  test20: false,
  test21: false,
  test22: false,
  test23: false,
  test24: false,
  test25: false,
  test26: false,
  test27: false,
  test28: false,
  test29: false,
  test30: false
};
var REPEAT = 1000000;
var count = []
var took = [];

console.log('------ obj ------');
console.log(obj);
console.log('-----------------');

console.log('> test 1 ........');
count[0] = 0;
took[0] = 0.0;
for (var i = 0; i < REPEAT; ++i) {
  var now = Date.now();
  for (var key in obj) {
    // var val = obj[key];
    // ++count[0];
  }
  took[0] += (Date.now() - now);
}

console.log('> test 2 ........');
count[1] = 0;
took[1] = 0.0;
for (var i = 0; i < REPEAT; ++i) {
  var now = Date.now();
  Object.keys(obj).forEach(function(key) {
    // var val = obj[key];
    // ++count[1];
  });
  took[1] += (Date.now() - now);
}

console.log('----- report -----');
console.log('- for loop took %sms in average, REPEAT=%s', took[0] / REPEAT, REPEAT);
console.log('- Object.keys & Array.prototype.every took %sms in average, REPEAT=%s', took[1] / REPEAT, REPEAT);
