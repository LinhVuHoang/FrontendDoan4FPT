<template>
  <div>
    <a-card>
      <div>
        <a-form @submit="handleSearch" class="product__search-form">
          <a-form-item>
            <a-input-search v-model="params.id" class="ant-col-md-7" placeholder="Search by ID">
              <a-icon type="search"/>
            </a-input-search>
            <a-input-search v-model="params.accountName" class="ant-col-md-7"  style="margin-left: 2%" placeholder="Search by name">
              <a-icon type="search"/>
            </a-input-search>
            <a-input-search v-model="params.phoneAccount" class="ant-col-md-7" style="margin-left: 2%" placeholder="Search by phone">
              <a-icon type="search"/>
            </a-input-search>
            <a-range-picker
                            :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
                            @change="selectDate"/>
          </a-form-item>

        </a-form>
        <a-button type="primary" html-type="submit" @click="handleSearch">
          Search
        </a-button>
        <a-button type="primary" html-type="submit" @click="resetButton" style="margin-left: 20px">
          Reset
        </a-button>
      </div>
      <div class="price"> <span style="align-content: center">TotalPrice: {{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.price)}}</span></div>
      <div class="price"> <span style="align-content: center">Sales Money: {{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.price1)}}</span></div>
      <a-table :columns="columns" :pagination="false" rowKey="id" :data-source="data">
        <span slot="name" slot-scope="text">
          {{text.name}}
        </span>
        <span slot="phone" slot-scope="text">
          {{text.phone}}
        </span>
         <span slot="totalPrice" slot-scope="text">
           {{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text)}}
         </span>
        <span slot="createdAt" slot-scope="text">{{text.split("-")[2]}}-{{text.split("-")[1]}}-{{text.split("-")[0]}}</span>
        <span slot="OrderStatus" slot-scope="text,record">
          <span v-if="text ==1" style="color: green">
           Đã xử lý
          </span>
          <span v-else style="color: blue">
             Đang xử lý
          </span>
          <span v-if="text ==1">
          <input  type="checkbox" id="checkbox" checked="checked"  @change="updatestatus(record.id,0)"/>
          <label style="text-align: center" for="checkbox"></label>
            </span>
          <span v-else>
            <input type="checkbox" id="checkbox" @change="updatestatus(record.id,1)"/>
          <label style="text-align: center" for="checkbox"></label>
          </span>
        </span>
          <span slot="checkout" slot-scope="text,record">
            <span v-if="text ==false" style="color: red">
              Chưa thanh toán
            </span>
            <span v-else style="color: green">
              Đã thanh toán
            </span>
            <span v-if="text ==true">
          <input  type="checkbox" id="checkbox" checked="checked"  @change="updatecheckout(record.id,false)"/>
          <label style="text-align: center" for="checkbox"></label>
            </span>
          <span v-else>
            <input type="checkbox" id="checkbox" @change="updatecheckout(record.id,true)"/>
          <label style="text-align: center" for="checkbox"></label>
          </span>
          </span>
        <div slot="action" slot-scope="text,record">
          <a class="button" :href="'detail/'+ record.id ">
            <a-icon style="font-size: 25px" type="info-circle"/>
          </a>
        </div>
      </a-table>
      <div style="padding-top: 15px">
        <a-pagination
            :default-current="this.params.pageSize"
            :total="this.totalRecords"
            show-size-changer
            @showSizeChange="onShowSizeChange"
            @change="onChange"
        />
      </div>

    </a-card>
  </div>
</template>

<script>
import moment from 'moment';
import OrderService from "../../../service/OrderService";
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'account',
    key: 'accountName',
    ellipsis: true,
    scopedSlots: {customRender: 'name'},
  },
  {
    title: 'Phone',
    dataIndex: 'account',
    key: 'phoneAccount',
    ellipsis: true,
    scopedSlots: {customRender: 'phone'},
  },
  {
    title: 'Total Price',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    ellipsis: true,
    scopedSlots: {customRender: 'totalPrice'}
  },
  {
    title:'Created At',
    dataIndex: 'createdAt',
    key:'createdAt',
    scopedSlots: {customRender: 'createdAt'}
  },
  {
    title: 'OrderStatus',
    dataIndex: 'status',
    key: 'OrderStatus',
    scopedSlots: {customRender: 'OrderStatus'}
  },
  {
    title: 'CheckOut',
    dataIndex: 'checkout',
    key: 'checkout',
    scopedSlots: {customRender: 'checkout'},
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    ellipsis: true,
    scopedSlots: {customRender: 'action'},
  },
];
export default {
  data(){
    return{
      data:[],
      data1:[],
      data2:[],
      form: {
        id: undefined,
        quantity:1
      },
      price:undefined,
      price1:undefined,
      columns,
      body:{
        id: undefined,
        quantity:1
      },
      totalRecords: undefined,
      params: {
        pageSize: 10,
        page: 1,
        from: "",
        to: "",
        accountName:undefined,
        phoneAccount:undefined,
        id:undefined
      },
      params1:{
        pageSize:10,
        page:undefined,
        name:""
      },
      params2:{
        pageSize:10,
        page:undefined,
        name:""
      }
    };
  },
  created() {
    this.getOrder(),
        this.caculatorTotalPrice()
    this.caculatorCheckout()
    this.updatecheckout()
    this.updatestatus()
  },
  methods:{
    async  getOrder(){
      await OrderService.getAll(this.params).then(
          rs => {
            try {
              this.data = rs.data.data;
              console.log(this.data)
              this.totalRecords = rs.data.pagination.totalItems;
              console.log(this.totalRecords)
              console.log(rs.data.data)
            }catch (e){
              console.log(e)
            }
          }
      )
    },
    async caculatorTotalPrice(){
      let price =0;
      let check =true;
      let page=1;
      this.params1.page = page;
      do {
        await OrderService.getAll(this.params1).then(
            rs => {
              try {
                this.data1 = rs.data.data;
                if(this.data1.length>0) {
                  for (let i = 0; i < this.data1.length; i++) {
                    if(this.data1[i].status ==1) {
                      price = price + this.data1[i].totalPrice;
                    }
                  }
                  page = this.params1.page;
                  page = page+1;
                  this.params1.page = page;
                }else {check=false}
              } catch (e) {
                console.log(e)
              }
            }
        )
        console.log(price)
      }while (check){
        this.price = price;
        console.log(this.price)
      }
      },

    async caculatorCheckout(){
      let price =0;
      let check =true;
      let page=1;
      this.params2.page = page;
      do {
        await OrderService.getAll(this.params2).then(
            rs => {
              try {
                this.data2 = rs.data.data;
                if(this.data2.length>0) {
                  for (let i = 0; i < this.data2.length; i++) {
                    if(this.data2[i].checkout ==true) {
                      price = price + this.data2[i].totalPrice;
                    }
                  }
                  page = this.params2.page;
                  page = page+1;
                  this.params2.page = page;
                }else {check=false}
              } catch (e) {
                console.log(e)
              }
            }
        )
        console.log(price)
      }while (check){
        this.price1 = price;
        console.log(this.price1)
      }
    },

    selectDate(dates, dateStrings) {
      this.params.from = dateStrings[0];
      this.params.to = dateStrings[1];
      this.getOrder();
    },

    onShowSizeChange(current, pageSize) {
      this.params.pageSize = pageSize;
      this.params.page = current;
      this.getOrder();
    },
    onChange(page, limit) {
      this.params.page = page;
      this.params.pageSize = limit;
      this.getOrder();
    },
    updatestatus(id,status){
      OrderService.updateStatus(id,status).then(
          rs=>{
            console.log(rs.data)
            this.getOrder();
            this.caculatorTotalPrice();
          })

    },

    updatecheckout(id,isCheck){
        OrderService.updateCheckout(id,isCheck).then(
            rs=>{
              console.log(rs.data)
              this.getOrder();
              this.caculatorCheckout()
            }
        )
    },
    handleSearch(e){
      e.preventDefault();
      this.params.page = 1;
      console.log(this.params.accountName)
      console.log(this.params);
      this.getOrder()
    },
    resetButton(){
      this.params = {
        pageSize: 10,
        page:1,
        name: "",
      }
      this.getOrder();
    },
    moment: function () {
      return moment();
    },
  }
}
</script>

<style lang="scss" scoped>
$color-primary: #4c4c4c;
$color-secondary: #a6a6a6;
$color-highlight: #ff3f40;
.price {
  margin: 1.5em 0;
  color: $color-highlight;
  font-size: 1.2em;

span {
  padding-left: 0.15em;
  font-size: 2.9em;
}
}
.product__search-form{
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
}

</style>