export function getUser() {
  const userString = localStorage.getItem("user");
  const user: { username: string; userEmail: string } = userString
    ? JSON.parse(userString)
    : undefined;
  return user;
}
