export const getSetRole = (role = false) => {
    const localRole = localStorage.getItem("role");
    if (role) {
      localStorage.setItem("role", role);
      return role;
    } else if (!role && localRole) {
      return localRole;
    } else {
      localStorage.setItem("role", "Admin");
      return 'Admin'
    }
  };