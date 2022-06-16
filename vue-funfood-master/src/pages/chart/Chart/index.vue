<template>
  <section id="dashboard">
    <mdb-card class="mb-4">
      <div v-for="chart in this.datachart1" v-bind:key="chart">
        {{chart}}
      </div>
      <mdb-card-body class="d-sm-flex justify-content-between">
        <h4 class="mb-sm-0 pt-2">
          <a href="https://mdbootstrap.com/material-design-for-bootstrap/" target="_blank">Home Page</a><span>/</span><span>Dashboard</span>
        </h4>
      </mdb-card-body>
    </mdb-card>
    <section>
      <mdb-row class="mt-5">
        <mdb-col md="9" class="mb-4">
          <mdb-card>
            <mdb-card-body>
              <div style="display: block">
                <mdb-bar-chart :data="barChartData" :options="barChartOptions" :height="500"/>
              </div>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
        <mdb-col md="3" class="mb-4">
          <mdb-card class="mb-4">
            <mdb-card-header class="text-center"> Pie chart </mdb-card-header>
            <mdb-card-body>
              <div style="display: block">
                <mdb-pie-chart :data="pieChartData" :options="pieChartOptions" :height="500"/>
              </div>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </section>
    <section>
      <mdb-row class="mt-3">
        <mdb-col md="12" lg="12" class="mb-4">
          <mdb-card class="mb-4">
            <mdb-card-header> Line chart </mdb-card-header>
            <mdb-card-body>
              <div style="display: block">
                <mdb-line-chart :data="lineChartData" :options="lineChartOptions" :height="200"/>
              </div>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </section>
  </section>
</template>

<script>
import {mdbBarChart, mdbCard, mdbCardBody, mdbCardHeader, mdbCol, mdbLineChart, mdbPieChart, mdbRow,} from 'mdbvue'
import ProductService from "../../../service/ProductService";


export default {
  name: 'Dashboard',
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbCardHeader,
/*    mdbIcon,*/
    mdbBarChart,
    mdbPieChart,
    mdbLineChart,
 /*   mdbRadarChart,
    mdbDoughnutChart,*/
/*    mdbListGroup,
    mdbListGroupItem,
    mdbBadge,*/
  },
  data () {
    return {
      pieChartData: {},
      datachart:[],
      datachart1:[],
      top1:undefined,
      top2:undefined,
      top3:undefined,
      top4:undefined,
      top5:undefined,
      showFrameModalTop: false,
      showFrameModalBottom: false,
      showSideModalTopRight: false,
      showSideModalTopLeft: false,
      showSideModalBottomRight: false,
      showSideModalBottomLeft: false,
      showCentralModalSmall: false,
      showCentralModalMedium: false,
      showCentralModalLarge: false,
      showCentralModalFluid: false,
      showFluidModalRight: false,
      showFluidModalLeft: false,
      showFluidModalTop: false,
      showFluidModalBottom: false,
      barChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: '#1',
            data: [12, 39, 3, 50, 2, 32, 84],
            backgroundColor: 'rgba(245, 74, 85, 0.5)',
            borderWidth: 1
          }, {
            label: '#2',
            data: [56, 24, 5, 16, 45, 24, 8],
            backgroundColor: 'rgba(90, 173, 246, 0.5)',
            borderWidth: 1
          }, {
            label: '#3',
            data: [12, 25, 54, 3, 15, 44, 3],
            backgroundColor: 'rgba(245, 192, 50, 0.5)',
            borderWidth: 1
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            barPercentage: 1,
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },

      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      lineChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: '#1',
            backgroundColor: 'rgba(245, 74, 85, 0.5)',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: '#2',
            backgroundColor: 'rgba(90, 173, 246, 0.5)',
            data: [12, 42, 121, 56, 24, 12, 2]
          },
          {
            label: '#3',
            backgroundColor: 'rgba(245, 192, 50, 0.5)',
            data: [2, 123, 154, 76, 54, 23, 5]
          }
        ]
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }]
        }
      }

    }
  },
  // created() {
  //   this.getChart()
  // },
  created() {
    this.getChart()
  },
  methods:{
    async getChart(){
        await ProductService.getchart().then(
            rs => {
              try {
                this.datachart = rs.data;
                console.log(this.datachart)
              }catch (e){
                console.log(e);
              }
              let i;
              let labelArr = [];
              let dataArr = [];
              for(i=0;i<5;i++){
                labelArr.push(this.datachart[i].name)
                dataArr.push(this.datachart[i].quantity)
                // console.log(this.datachart[i])
                // this.datachart1[i] = this.datachart[i]
                //     this.pieChartData.labels[i] = this.datachart[i].name
              }
              this.createPieChart(labelArr,dataArr)
              console.log(this.pieChartData.labels);
            }
        )
    },
    createPieChart(label,data){
      this.pieChartData = {
        labels: label,
        datasets: [
          {
            data: data,
            backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#ac64ad'],
            hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#da92db']
          }
        ]
      };



    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cascading-admin-card {
  margin: 20px 0;
}
.cascading-admin-card .admin-up {
  margin-left: 4%;
  margin-right: 4%;
  margin-top: -20px;
}
.cascading-admin-card .admin-up .fas,
.cascading-admin-card .admin-up .far {
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2), 0 2px 13px 0 rgba(0, 0, 0, 0.19);
  padding: 1.7rem;
  font-size: 2rem;
  color: #fff;
  text-align: left;
  margin-right: 1rem;
  border-radius: 3px;
}
.cascading-admin-card .admin-up .data {
  float: right;
  margin-top: 2rem;
  text-align: right;
}
.admin-up .data p {
  color: #999999;
  font-size: 12px;
}
.classic-admin-card .card-body {
  color: #fff;
  margin-bottom: 0;
  padding: 0.9rem;
}
.classic-admin-card .card-body p {
  font-size: 13px;
  opacity: 0.7;
  margin-bottom: 0;
}
.classic-admin-card .card-body h4 {
  margin-top: 10px;
}
</style>
