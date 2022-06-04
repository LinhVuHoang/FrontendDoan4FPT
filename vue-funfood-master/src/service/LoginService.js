import axios from "axios";
const URL_LOGIN ="http://localhost:8888/api/v1/accounts/login";
class LoginService{
 authenticate(data){
     return axios.post(URL_LOGIN,data)
 }
}
export default new LoginService();