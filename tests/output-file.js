var test = require('tap').test;
var exeq = require('..');
var fs = require('fs');
var path = require('path');

test('stdout', function(t) {

  var q = exeq([
    'ls > a.txt',
    'rm a.txt'
  ]);

  var n = -1;

  q.on('each', function(command, index) {
    if (index === 0) {
      t.ok(fs.existsSync(path.resolve('a.txt')));
      t.ok(fs.readFileSync('a.txt').toString().indexOf('a.txt') >= 0);
    } else {
      t.notOk(fs.existsSync('a.txt'));
    }
  });

  q.on('done', function() {
    t.end();
  });

  // execute the commands
  q.run();

});
