const axios = require('axios');

async function send(method, route, data = {}) {
  let options = {
    headers: {},
    url: process.env.API_HOST + route
  };

  if(data._token) {
    options.headers['Authorization'] = `Bearer ${data._token}`;
  }

  delete data._token;

  const response = await axios({
    method,
    data: data,
    ...options
  });

  return response.data;
}

module.exports.send = send;

module.exports.get = (route, data = {}) => {
  return send('GET', route, data);
}

module.exports.post = (route, data = {}) => {
  return send('POST', route, data);
}

module.exports.delete = (route, data = {}) => {
  return send('DELETE', route, data);
}

module.exports.put = (route, data = {}) => {
  return send('PUT', route, data);
}
