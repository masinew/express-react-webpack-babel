const apiPath = '/api/v1';
export default {
  server: {
    protocal: 'http',
    host: 'localhost',
    port: 3000
  },
  apis: {
    user: `${apiPath}/user`,
    auth: `${apiPath}/auth`,
    blog: `${apiPath}/blog`
  }
}
