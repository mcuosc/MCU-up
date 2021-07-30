module.exports = function test(query){
  let result = {};
  result.test = query.str;
  return new Promise(function(resolve, reject) {
    resolve(result);
  })
}
