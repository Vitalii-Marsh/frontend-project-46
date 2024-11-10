const parsers = {
  json: JSON.parse
};

export default (data, formatName) => parsers[formatName](data);