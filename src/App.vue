<template>
  <div class="container">
    <div class="header layout">
      <img width="70px" src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoasang.png" />
      <h1>SMART FARM PROJECT</h1>
    </div>
    <div class="sidebar layout" style="padding-top: 20px; overflow: hidden">
      <nav>
        <ul>
          <li>
            <a href="#">
              <img src="./assets/img/icon home.png" />
              Smart Farm
            </a>
          </li>
          <li>
            <a href="#">
              <img src="./assets/img/db1.png" />
              Chart
            </a>
          </li>
          <li>
            <a href="#">
              <img src="./assets/img/mess.png" />
              Message
            </a>
          </li>
          <li>
            <a href="#">
              <img src="./assets/img/device.png" />
              Devices
            </a>
          </li>
          <li>
            <a href="#">
              <img src="./assets/img/setting.png" />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="value layout">
      <div class="value_col col_1">
        <h1>Temperature</h1>
        <h2>{{ state.dhtTempData }} &deg;C</h2>
        <img src="./assets/img/temperature.png" />
      </div>
      <div class="value_col col_2">
        <h1>Humidity</h1>
        <h2>{{ state.dhtHumData }} %</h2>
        <img src="./assets/img/humidity.png" />
      </div>
      <div class="value_col col_3">
        <h1>Light</h1>
        <h2>{{ state.lightData }} lux</h2>
        <img src="./assets/img/sensor.png" />
      </div>
      <div class="value_col col_4">
        <h1>Soil Moisture</h1>
        <h2>{{ state.soilData }} %</h2>
        <img src="./assets/img/soil-analysis.png" />
      </div>
    </div>
    <div class="status1 layout">
      <div class="status_col s_1">
        <h1>Pump 1</h1>
        <div class="stt">
          <img src="./assets/img/pump.png" />
          <div class="btn">
            <span class="text">OFF</span>
            <label class="switch">
              <input v-model="buttonStatus1" v-on:click="toggleButton1()" type="checkbox" />
              <span class="slider round"></span>
            </label>
            <span class="text">ON</span>
          </div>
        </div>
      </div>
      <div class="status_col s_2">
        <h1>Pump 2</h1>
        <div class="stt">
          <img src="./assets/img/pump (1).png" />
          <div class="btn">
            <span class="text">OFF</span>
            <label class="switch">
              <input v-model="buttonStatus2" v-on:click="toggleButton2()" type="checkbox" />
              <span class="slider round"></span>
            </label>
            <span class="text">ON</span>
          </div>
        </div>
      </div>
      <div class="status_col s_3">
        <h1>Fan</h1>
        <div class="stt">
          <img src="./assets/img/fan.png" style="width: 80px; margin-left: 70px;" />
          <div class="btn" style="margin-left: 50px;">
            <span class="text">OFF</span>
            <label class="switch">
              <input v-model="buttonStatus3" v-on:click="toggleButton3()" type="checkbox" />
              <span class="slider round"></span>
            </label>
            <span class="text">ON</span>
          </div>
        </div>
      </div>
      <div class="status_col s_4">
        <h1>Motor</h1>
        <div class="stt">
          <img src="./assets/img/timing-belt.png" style="width: 80px; margin-left: 30px;" />
          <div class="btn" style="margin-left: 20px;">
            <span class="text">OFF</span>
            <label class="switch">
              <input v-model="buttonStatus4" v-on:click="toggleButton4()" type="checkbox" />
              <span class="slider round"></span>
            </label>
            <span class="text">ON</span>
          </div>
        </div>
      </div>
    </div>

    <div class="status2 layout">
      <h1>Weather</h1>
      <div class="firestore">

        <!--Contact form-->
        <!-- <div class="row p-3" style="background-color: #fafafa;">
          <div class="col-md-4">
            <input class="form-control" v-model="name" type="text" placeholder="Name" aria-label="default input example"
              autocomplete="off">
          </div>
          <div class="col-md-4">
            <input class="form-control" v-model="mbnumber" type="number" placeholder="Enter Mb Number"
              aria-label="default input example" autocomplete="off">
          </div>
          <div class="col-md-1">
            <button type="button" v-on:click="saveData" class="btnn btn-primary">Save</button>
          </div>
        </div> -->

        <!--Contact data-->
        <!-- <div class="row mt-5">
          <div class="col -md-12">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Contact Number</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(contact, index) in contacts" :key="index">
                  <td>{{ contact.name }}</td>
                  <td>{{ contact.mbnumber }}</td>
                  <td><button type="button" class="btn btn-delete" style="width: auto;">Delete</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> -->
      </div>
    </div>

    <div class="footer layout">
      <h1>Design by: Nguyen Tien Phat - 1914598</h1>
    </div>
  </div>
</template>

<script scoped lang="ts" >
import firebase from './utl/firebase'
import { onMounted, reactive } from 'vue';
import 'firebase/database'
import { productCollection } from './utl/firebase'
import { lm35Collection } from './utl/firebase'
import { dhtTempCollection } from './utl/firebase'
import { dhtHumCollection } from './utl/firebase'
import { lightCollection } from './utl/firebase'
import { soilCollection } from './utl/firebase'
import { pump1Status } from './utl/firebase'
import { pump2Status } from './utl/firebase'
import { fanStatus } from './utl/firebase'
import { motorStatus } from './utl/firebase'

export default {
  data: () => ({
    buttonStatus1: false,
    buttonStatus2: false,
    buttonStatus3: false,
    buttonStatus4: false,
  }),

  mounted() {
    const buttonStatus11 = localStorage.getItem('buttonStatus1')
    if (buttonStatus11) {
      this.buttonStatus1 = JSON.parse(buttonStatus11)
    }
    const buttonStatus22 = localStorage.getItem('buttonStatus2')
    if (buttonStatus22) {
      this.buttonStatus2 = JSON.parse(buttonStatus22)
    }
    const buttonStatus33 = localStorage.getItem('buttonStatus3')
    if (buttonStatus33) {
      this.buttonStatus3 = JSON.parse(buttonStatus33)
    }
    const buttonStatus44 = localStorage.getItem('buttonStatus4')
    if (buttonStatus44) {
      this.buttonStatus4 = JSON.parse(buttonStatus44)
    }
  },

  methods: {
    toggleButton1() {
      this.buttonStatus1 = !this.buttonStatus1

      let obj1 = {
        buttonStatus1: this.buttonStatus1,
        timestap: new Date(),
      }

      firebase.firestore.collection('Pump1').add(obj1).then(doc => {
        alert('Data add and Doc id ' + doc.id)
      }).catch(e => {
        console.log(e)
      })

      pump1Status.set(this.buttonStatus1 ? 1 : 0).then(() => {
      }).catch((e) => {
        console.log(e)
      })

      localStorage.setItem('buttonStatus1', JSON.stringify(this.buttonStatus1))
      
    },

    toggleButton2() {
      this.buttonStatus2 = !this.buttonStatus2
      let obj2 = {
        buttonStatus2: this.buttonStatus2,
        timestap: new Date(),
      }
      firebase.firestore.collection('Pump2').add(obj2).then(doc => {
        alert('Data add and Doc id ' + doc.id)
      }).catch(e => {
        console.log(e)
      })

      pump2Status.set(this.buttonStatus2 ? 1 : 0).then(() => {
      }).catch((e) => {
        console.log(e)
      })

      localStorage.setItem('buttonStatus2', JSON.stringify(this.buttonStatus2))

    },

    toggleButton3() {
      this.buttonStatus3 = !this.buttonStatus3
      let obj3 = {
        buttonStatus3: this.buttonStatus3,
        timestap: new Date(),
      }
      firebase.firestore.collection('Fan').add(obj3).then(doc => {
        alert('Data add and Doc id ' + doc.id)
      }).catch(e => {
        console.log(e)
      })

      fanStatus.set(this.buttonStatus3 ? 1 : 0).then(() => {
      }).catch((e) => {
        console.log(e)
      })
      
      localStorage.setItem('buttonStatus3', JSON.stringify(this.buttonStatus3))
  
    },

    toggleButton4() {
      this.buttonStatus4 = !this.buttonStatus4
      let obj4 = {
        buttonStatus4: this.buttonStatus4,
        timestap: new Date(),
      }
      firebase.firestore.collection('Motor').add(obj4).then(doc => {
        alert('Data add and Doc id ' + doc.id)
      }).catch(e => {
        console.log(e)
      })

      motorStatus.set(this.buttonStatus4 ? 1 : 0).then(() => {
      }).catch((e) => {
        console.log(e)
      })

      localStorage.setItem('buttonStatus4', JSON.stringify(this.buttonStatus4))

    },

  },

  setup() {
    const state = reactive({
      productData: {},
      lm35Data: {},
      dhtTempData: {},
      dhtHumData: {},
      lightData: {},
      soilData: {},

    })

    onMounted(async () => {
      let productDataSet = await productCollection.once("value");
      state.productData = productDataSet.val();

      let lm35DataSet = await lm35Collection.on("value", (snapshot) => {
        state.lm35Data = snapshot.val();
      });
      // state.lm35Data = lm35DataSet.val();

      let dhtTempDataSet = await dhtTempCollection.on("value", (snapshot) => {
        state.dhtTempData = snapshot.val();
      });
      // state.dhtTempData = dhtTempDataSet.val();

      let dhtHumDataSet = await dhtHumCollection.on("value", (snapshot) => {
        state.dhtHumData = snapshot.val();
      });
      // state.dhtHumData = dhtHumDataSet.val();

      let lightDataSet = await lightCollection.on("value", (snapshot) => {
        state.lightData = snapshot.val();
      });
      // state.lightData = lightDataSet.val();

      let soilDataSet = await soilCollection.on("value", (snapshot) => {
        state.soilData = snapshot.val();
      });
      // state.soilData = soilDataSet.val();

    })

    return { state };
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

body {
  padding: 0px;
  font-family: Merriweather;
  font-size: 12px;
  color: #000;
}

.layout {
  background-color: rgb(168, 168, 235);
  /* border: 1px solid white; */
  min-height: 50px;
}

.container {
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 1fr 1fr;
  grid-template-rows: 50px 1fr 1fr 50px;
  grid-template-areas:
    "header header header"
    "sidebar value value"
    "sidebar status1 status2"
    "sidebar footer footer";
}

/* ---------Thanh dau trang--------*/

.header {
  grid-area: header;
  color: blue;
  background-color: #70a1ff;
  display: flex;
}

.header h1 {
  font-size: 30px;
  margin: auto;
}

/*-----------------------------------*/

/*-------- Thanh menu ben trai------- */
.sidebar {
  grid-area: sidebar;
  background-color: #09006f;
}

.sidebar nav {
  height: 100%;
}

.sidebar nav ul {
  height: 100%;
  list-style-type: none;
  margin: 0px 0 20px 0;
}

.sidebar nav ul li {
  margin: 0px 0 40px 0;
}

.sidebar nav ul li a {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: white;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.sidebar nav ul li a img {
  width: 50px;
  height: 50px;
}

.sidebar nav ul li a:hover {
  background-color: #2980b9;
  border-radius: 10px;
}

/*-----------------------------------*/

/*-------- hien thi gia tri------- */
.value {
  grid-area: value;
  display: flex;
  justify-content: space-evenly;
  background-color: white;
}

.value_col {
  display: flex;
  flex-direction: column;
  width: 22%;
  height: inherit;
  background-color: #e7d5ff;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 15px;
  /* box-shadow: 7px 7px 13px 4px rgba(102, 102, 102, 0.25); */
}

.col_1 {
  display: flex;
  padding-left: 10px;
  color: red;
}

.col_1 h2 {
  margin-top: 0px;
  font-size: 60px;
}

.col_1 img {
  width: 120px;
}

.col_2 {
  display: flex;
  padding-left: 10px;
  color: #1e90ff;
}

.col_2 h2 {
  margin-top: 0px;
  font-size: 60px;
}

.col_2 img {
  width: 120px;
}

.col_3 {
  display: flex;
  padding-left: 10px;
  color: orange;
}

.col_3 h2 {
  margin-top: 0px;
  font-size: 60px;
}

.col_3 img {
  width: 130px;
}

.col_4 {
  display: flex;
  padding-left: 10px;
  color: #2f3542;
}

.col_4 h2 {
  margin-top: 0px;
  font-size: 60px;
}

.col_4 img {
  width: 130px;
}

/*-----------------------------------*/

/*-------- hien thi trang thai------- */
.status1 {
  grid-area: status1;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 900px;
  grid-gap: 20px;
}

.status_col {
  border-radius: 10px;
  color: #000;
  background-color: #e7d5ff;
  box-shadow: 7px 7px 13px 4px rgba(102, 102, 102, 0.25);
}

.status_col h1 {
  padding-left: 20px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked+.slider {
  background-color: #2196f3;
}

input:focus+.slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked+.slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.btn {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  justify-content: space-between;
  width: 150px;
}

.s_1 {
  margin: 10px 0px 0px 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.stt {
  padding-left: 100px;
}

.text {
  font-size: 20px;
  font-weight: 700;
  color: blue;
}

.s_1 img {
  width: 100px;
}

.s_2 {
  margin: 10px 50px 0px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.s_2 img {
  width: 100px;
}

.s_3 {
  margin: 0px 0px 10px 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.s_3 img {
  width: 100px;
}

.s_4 {
  margin: 0px 50px 10px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.s_4 img {
  width: 100px;
}

.status2 {
  grid-area: status2;
  display: flex;
  background-color: white;
  flex-direction: column;
}

.status2 {
  width: 450px;
  height: auto;
  background-color: #e7d5ff;
  color: blue;
  box-shadow: 7px 7px 13px 4px rgba(102, 102, 102, 0.25);
  border-radius: 40px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.footer {
  grid-area: footer;
  font-size: 8px;
  text-align: center;
  justify-items: center;
  background-color: #70a1ff;
  color: white;
}

.footer h1 {
  margin-top: 15px;
}
</style>
