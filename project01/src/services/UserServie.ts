export function getUser() {
  const userString = sessionStorage.getItem("user");
  const user: { username: string; userEmail: string } = userString
    ? JSON.parse(userString)
    : undefined;
  return user;
}
