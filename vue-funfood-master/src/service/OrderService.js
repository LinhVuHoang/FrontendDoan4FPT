import axios from "axios";

const URL_ORDER = "http://localhost:8888/api/v1/orders";

class OrderService {

    getAll(params){
        return axios.get(URL_ORDER + "/list", {
            params: params,
        });
    }
    getOrderItems(id){
        return axios.get(URL_ORDER+"/"+ id)
    }
    updateStatus(id,status){
        return axios.put(URL_ORDER+"/status/update?id="+id+"&status="+status)
    }
    updateCheckout(id,isCheck){
        return axios.put(URL_ORDER+"/checkOut/update?id="+id+"&isCheck="+isCheck)
    }
    // delete(id){
    //     return axios.delete(URL_ORDER + "/delete/" + id)
    // }
}

export default new OrderService();