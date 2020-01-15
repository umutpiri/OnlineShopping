export function login(userInfo) {
  console.log(userInfo);
  localStorage.setItem('user', JSON.stringify(userInfo));
}

export function logout() {
  localStorage.removeItem('user');
}

export function register(type, userInfo) {
  console.log('registered');
  console.log(type);
  login(userInfo);
}

export function getUser() {
  return JSON.parse(localStorage.getItem('user'));
}
