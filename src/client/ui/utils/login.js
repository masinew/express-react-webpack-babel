import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';

import config from '../../../common/config/client';

const port = config.server.port;
const server = `${config.server.protocal}://${config.server.host}${ port ? `:${port}` : '' }`;

export default function login(username, password, a) {
  let formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  const fetchOptions = {
    method: 'POST',
    body: formData,
    credentials: 'include'
  };

  fetch(`${server}/user/login`, fetchOptions)
    .then((response) => {
      response.json().then((result) => {
        a(result)
      });
    });
}
