
/**
 * Merges two configuration objects by adding the extension object properties
 * into the orgin object. If the origin object already has that property, it
 * will be overwriten with the value of the extension object.
 */
function deepMerge(origin, extension){
  
  if(typeof origin != 'object') origin = {};

  Object.keys(extension).forEach(function(key){
    if(origin.hasOwnProperty(key) 
    && typeof extension[key] === 'object'){

      origin[key] = deepMerge(origin[key], extension[key]);
    }else{
      origin[key] = extension[key];
    }
  });
  return origin;
}


module.exports = process.env.NODE_ENV === 'production'
                   ? deepMerge(require('./config'), require('./production'))
                   : require('./config');
                   
