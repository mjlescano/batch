
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
    done();
  }, 200);
},function(done){
  console.log('  rollback start : %s', 1);
  setTimeout(function(){
    console.log('   rollback done : %s', 1);
    done();
  }, 200);
});

batch.push(function(done){
  console.log('  start : %s', 2);
  setTimeout(function(){
    console.log('   done : %s', 2);
    done();
  }, 200);
},function(done){
  console.log('  rollback start : %s', 2);
  setTimeout(function(){
    console.log('   rollback done : %s', 2);
    done();
  }, 200);
});

batch.push(function(done){
  console.log('  start : %s', 3);
  setTimeout(function(){
    console.log('   fail : %s', 3);
    done('Error happened on 3.');
  }, 200);
},function(done){
  console.log('  rollback start : %s', 3);
  setTimeout(function(){
    console.log('   rollback done : %s', 3);
    done();
  }, 200);
});

batch.end(function(err, results, rollbackErr, rollbackResult){
  console.log('-------------------------------');
  console.log('err', err);
  console.log('results', results);
  console.log('rollbackErr', rollbackErr);
  console.log('rollbackResult', rollbackResult);
});
