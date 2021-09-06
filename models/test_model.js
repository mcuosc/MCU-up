/**
* The example of model
* 示範 model 採用匿名 async function 的實作
*/

module.exports = async function(query){
  let result = {};
  result.test = query.str;

  return result;
  // for non-async
  /*return new Promise(function(resolve, reject) {
    resolve(result);
  })*/
}
