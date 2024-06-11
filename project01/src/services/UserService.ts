export function getUser() {
  const user = localStorage.getItem("user");
  try {
    return user;
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
    return null;
  }
}
