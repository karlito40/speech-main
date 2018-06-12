import Router from 'next/router';

export const redirect = (res, location) => {
  if (res) {
    res.writeHead(302, { Location: location });
    res.end();
  } else {
    Router.push(location);
  }
}
