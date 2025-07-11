// utils/checkTokenInCookies.js

export const checkTokenInCookies = () => {
    const tokenExists = document.cookie.split("; ").some(cookie => 
      cookie.startsWith("jwt=")
    );
  
    if (!tokenExists) {
      localStorage.removeItem("idUser");
      console.log("Token missing from cookies. idUser removed.");
    }
  };
  