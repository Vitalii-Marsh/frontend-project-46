import _ from 'lodash';

export default (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const result = _.sortBy(_.union(keys1, keys2));

  return result;
};
