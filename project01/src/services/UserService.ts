export function getUser() {
  const userString = localStorage.getItem("user");

  try {
    const user = userString ? JSON.parse(userString) : null;
    if (user && user.username && user.userEmail) {
      return user;
    }
    return null;
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
    return null;
  }
}
