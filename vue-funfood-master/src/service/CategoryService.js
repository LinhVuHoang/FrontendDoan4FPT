import axios from "axios";

const URL_CATEGORIES = "http://localhost:8888/api/v1/categories";


class CategoryService {

    getAll(params){
        return axios.get(URL_CATEGORIES + "/list", {
            params: params,
        });
    }


}

export default new CategoryService();