export default function authHeader() {
    const token = localStorage.getItem("token");
  
    if (token) {
      // for Node.js Express back-end
      return { 'Authorization': "Bearer " + token };
    } else {
      return {};
    }
}