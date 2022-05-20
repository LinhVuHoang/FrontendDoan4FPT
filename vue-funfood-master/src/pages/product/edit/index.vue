<template>
  <a-form :form="form" :label-col="{span:5}" :wrapper-col="{span: 12}">
  <a-form-item label="Product Name">
    <a-input v-model="currentData.name"/>
    <span id="error-name" style="color: red"></span>
  </a-form-item>
    <a-form-item label="Price">
      <a-input v-model="currentData.price"/>
      <span id="error-price" style="color: red"></span>
    </a-form-item>
    <a-form-item label="Category">
      <a-select v-model="currentData.categoryId">
        <a-select-option v-for="item in data" :key="item.id" :value="item.id">
          {{item.name}}
        </a-select-option>
      </a-select>
      <span id="error-category" style="color: red"></span>
    </a-form-item>
    <a-form-item label="Description">
      <a-input v-model="currentData.description"/>
    </a-form-item>
    <a-form-item label="Quantity">
      <a-input v-model="currentData.quantity"/>
    </a-form-item>
    <a-form-item label="Thumbnail">
      <a-input v-model="currentData.thumbnail"/>
    </a-form-item>
    <a-form-item label="Status" hidden>
      <a-input v-model="currentData.status"/>
    </a-form-item>
    <a-form-item style="height: auto" label="Detail">
      <a-input v-model="currentData.detail"/>
    </a-form-item>
    <a-form-item :wrapper-col="{offset:10}">
      <a-button type="primary" @click.stop.prevent="handleSubmit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import CategoryService from "@/service/CategoryService";
import ProductService from "@/service/ProductService";

export default {
   data(){
     return{
       data:[],
       currentData:{
         id:null,
         name: undefined,
         price: undefined,
         thumbnail: undefined,
         categoryId: undefined,
         quantity: undefined,
         detail: undefined,
         description: undefined,
         status: 'ACTIVE'
       }
     };
   },
  created() {
    this.getCategorise()
    this.getProducts(this.$route.params.id)
  },
  methods: {
    getCategorise() {
      CategoryService.getAll().then(
          res => {
            this.data = res.data
          }
      )
    },
    getProducts(id){
      ProductService.detail(id).then(response =>{
       this.currentData =response.data;
       console.log(response.data);
      })
    },
    validate() {
      var errorName = document.getElementById('error-name')
      var errorPrice = document.getElementById('error-price')
      if(this.currentData.name === undefined){
        errorName.innerText = 'Vui lòng nhập tên sản phẩm'
      }
      if (this.currentData.price === undefined){
        errorPrice.innerText = 'Vui lòng nhập giá tiền lớn hơn 0'
      }else {
        errorPrice.innerText = ''
      }
    },
    handleSubmit(e){
      e.preventDefault()
      if(!this.validate()){
        return "lỗi validate kìa thằng đần"
      }
      ProductService.edit(this.currentData.id,this.currentData).then(response=> {
        console.log(response.data);
            this.$router.push("/products/list")
          }
      ).catch(error => {
        console.log(error)
      })
    }
  },
};
</script>