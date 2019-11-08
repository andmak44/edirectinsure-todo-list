const urls = {
  /**
   * @param {String} userId Get all projects with tasks of user.
   */
  projectsTasksByUserId: userId => 'http://localhost:3006/api/v1/project/task/'+userId,

  /** @description User login url */
  login: 'http://localhost:3006/api/v1/user/login',

  /** @description User register url */
  signup: 'http://localhost:3006/api/v1/user'
};

export default urls;
