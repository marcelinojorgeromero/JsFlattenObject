
let regularObj = {
  level1Name: 'test1',
  level1: {
    level2Name: 'test2',
    level2LastName: 'last name 2',
    level2: {
      level3Name: 'test3',
      level3: {
        level4Name: 'test4'
      }
    }
  },
  level1LastName: 'last name 1'
};

function flatten(obj, depth) {
  return _flatten(obj, depth);
}

function _flatten(obj, depth, parentKeyPropName, currentDepth) {
  depth = ~~depth;
  currentDepth = ~~currentDepth;
  if (++currentDepth > depth && depth !== 0) return obj;
  
  let separator = '_';
  if (parentKeyPropName == null) {
    parentKeyPropName = '';
    separator = '';
  }

  let result = null;
  let childResult = {};
  if (_.isArray(obj)) {
    result = {};
    let arrayResult = [];
    for (let i = 0; i < obj.length; i++) {
      if (_.isObject(obj[i]) || _.isArray(obj[i])) {
        childResult = _flatten(obj[i], depth, `Depth${currentDepth}Array${i}`, currentDepth);
        _.merge(result, childResult);
        arrayResult[i] = result;
        continue;
      }
      arrayResult[i] = obj[i];
    }
    return arrayResult;
  }

  if (_.isObject(obj)) {
    result = {};

    for (let key in obj) {
      if (_.isObject(obj[key]) || _.isArray(obj[key])) {
        childResult = _flatten(obj[key], depth, `${parentKeyPropName}${separator}${key}`, currentDepth);
        _.merge(result, childResult);
        continue;
      }
      result[`${parentKeyPropName}${separator}${key}`] = obj[key];
    }
    return result;
  }
  return {}; // When no object or array
}
console.log('All levels:')
console.log(flatten(regularObj));
console.log('1st level:')
console.log(flatten(regularObj, 1));
console.log('2nd level:')
console.log(flatten(regularObj, 2));

