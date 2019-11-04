export const logout = (user) => {
  localStorage.removeItem('user');
  return null;
};
