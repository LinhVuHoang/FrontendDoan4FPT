import axios from "axios";

const URL_CATEGORIES = "http://localhost:8888/api/v1/categories";


class CategoryService {

    getAll(params){
        return axios.get(URL_CATEGORIES + "/list", {
            params: params,
        });
    }
    save(body){
        return axios.post(URL_CATEGORIES + "/create",body)
    }
    detail(id){
        return axios.get(URL_CATEGORIES + "/detail/"+ id)
    }
    edit(id, body){
        return axios.put(URL_CATEGORIES + "/update/"+id,body)
    }
    delete(id){
        return axios.delete(URL_CATEGORIES + "/delete/" + id)
    }

}

export default new CategoryService();