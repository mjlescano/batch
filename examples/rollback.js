
/**
 * Module dependencies.
 */

var Batch = require('..');

var batch = new Batch;

batch.concurrency(1);

batch.push(function(done){
  console.log('  start : %s', 1);
  setTimeout(function(){
    console.log('   done : %s', 1);
    done(null, 'one value');
  }, 200);
},function(done){
  console.log('  rollback start : %s', 1);
  setTimeout(function(){
    console.log('   rollback done : %s', 1);
    done(null, 'one rollback value');
  }, 200);
});

batch.push(function(done){
  console.log('  start : %s', 2);
  setTimeout(function(){
    console.log('   done : %s', 2);
    done(null, 'two value');
  }, 200);
},function(done){
  console.log('  rollback start : %s', 2);
  setTimeout(function(){
    console.log('   rollback done : %s', 2);
    done(null, 'two rollback value');
  }, 200);
});

batch.push(function(done){
  console.log('  start : %s', 3);
  setTimeout(function(){
    console.log('   fail : %s', 3);
    done(new Error('Error happened on 3.'));
  }, 200);
},function(done){
  console.log('  rollback start : %s', 3);
  setTimeout(function(){
    console.log('   rollback done : %s', 3);
    done(null, 'three rollback value');
  }, 200);
});

batch.end(function(err, results, rollbackErr, rollbackResult){
  console.log('-------------------------------');
  console.log('err', err);
  console.log('results', results);
  console.log('rollbackErr', rollbackErr);
  console.log('rollbackResult', rollbackResult);
});
