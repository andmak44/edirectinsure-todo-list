export const mapProjects = (projects) => {
  return projects.reduce((obj, project) => {
    obj[project.name] = project;
    return obj;
  }, {});
};