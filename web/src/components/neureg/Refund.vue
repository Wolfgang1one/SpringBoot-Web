<template>
<!--  退号-->
  <!-- 搜索栏 start  -->
  <el-row class="row-bg">
    <el-col :span="2">
      <div class="grid-content ep-bg-purple-dark" style="text-align: left;align-items: center;margin: auto;">
        <el-text size="large">患者信息查询</el-text>
      </div>
    </el-col>

  </el-row>

  <el-row class="row-bg" style="margin-bottom: 10px">
    <el-col :span="1.5" >
      <div class="grid-content ep-bg-purple-dark" style="text-align: left;margin: auto">
        <el-text size="large" style="color: red; ">* </el-text>
        <el-text size="large">病 历 号：</el-text>
      </div>
    </el-col>

    <el-col :span="2">
      <div class="grid-content ep-bg-purple-dark" style="text-align: left;align-items: center;">
        <el-input placeholder="请输入病历号" class="w-100 m-2" v-model="kw"/>
      </div>
    </el-col>

    <el-col :span="1">
    </el-col>

    <el-col :span="4" style="text-align: left;align-items: center;">
      <el-button type="primary" @click="loadData(1,ps.valueOf(),kw.valueOf())">搜索</el-button>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="24" class="h-20"></el-col>
  </el-row>

  <el-row class="row-bg">
    <el-col :span="2">
      <div class="grid-content ep-bg-purple-dark" style="text-align: left">
        <el-text size="large">患者身份确认</el-text>
      </div>
    </el-col>
  </el-row>

  <el-row class="row-bg" >
    <el-col :span="1.5" >
      <div class="grid-content ep-bg-purple-dark" style="text-align: left;align-items: center;">
        <el-text size="large">姓  名：</el-text>
      </div>
    </el-col>
    <el-col :span="2">
      <div class="grid-content ep-bg-purple-dark" >
        <el-input placeholder="姓名" class="w-100 m-2"/>
      </div>
    </el-col>

    <el-col :span="2"></el-col>

    <el-col :span="1.5" >
      <div class="grid-content ep-bg-purple-dark" style="text-align: left">
        <el-text size="large">身份证号：</el-text>
      </div>
    </el-col>
    <el-col :span="3">
      <div class="grid-content ep-bg-purple-dark" >
        <el-input placeholder="身份证号" class="w-100 m-2"/>
      </div>
    </el-col>

    <el-col :span="2"></el-col>

    <el-col :span="1.5" >
      <div class="grid-content ep-bg-purple-dark" style="text-align: left">
        <el-text size="large">家庭住址：</el-text>
      </div>
    </el-col>
    <el-col :span="5">
      <div class="grid-content ep-bg-purple-dark" >
        <el-input placeholder="家庭住址" class="w-100 m-2"/>
      </div>
    </el-col>
  </el-row>
  <!-- 搜索栏 end  -->
  <el-row>
    <el-col :span="24" class="h-20"></el-col>
  </el-row>
  <!-- 表格栏 start  -->
  <el-row class="m-2">
    <el-col :span="24" v-show="loading.valueOf()">
      <el-table :data="data.records" style="width:100%;">
        <el-table-column fixed prop="id" label="序号" width="80" align="center" />
        <el-table-column prop="caseNumber" label="病历号"  width="80" align="center" />
        <el-table-column prop="realName" label="姓名"  align="center" />
        <el-table-column prop="idNumber" label="身份证号" align="center"/>
        <el-table-column prop="visitDate" label="挂号时间" align="center"/>
        <el-table-column prop="noon" label="挂号午别" align="center"/>
        <el-table-column prop="deptName" label="看诊科室"  align="center" />
<!--        <el-table-column :prop="visitStateChange('data.records.visitState')" label="看诊状态"  align="center" />-->
<!--        <el-table-column prop="visitState" label="看诊状态"  align="center" />-->
        <el-table-column prop="visitState" label="看诊状态" align="center" >
          <template #default="scope">
<!--            {{scope.row.gender==1?"男":"女"}}-->
            <span v-if="scope.row.visitState === 1">已挂号</span>
            <span v-else-if="scope.row.visitState === 2">医生接诊</span>
            <span v-else-if="scope.row.visitState === 3">看诊结束</span>
            <span v-else-if="scope.row.visitState === 4">已退号</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作"  align="center" >
          <template #default="scope">
            <el-button type="primary" @click="del(scope.row)" >退号</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <!-- 表格栏 end  -->

  <!-- 分页栏start  -->
  <el-row >
    <el-col :span="20" v-show="loading.valueOf()">
      <el-pagination background layout="prev, pager, next"
                     :total="data.total" :page-count="data.pages"
                     @current-change="handleCurrentChange"/>
    </el-col>

  </el-row>

  <!-- 分页栏 end  -->



</template>

<script setup>
// 1 导入包
import {ref, onMounted, onUpdated} from 'vue';
import { fetchData,postReq } from '../../utils/api'
import router from "../../router";
import {ElMessageBox} from "element-plus";

onMounted(async()=>{
  loadData(1,ps.value);
})

// 2 定义Data
// 创建customer 列表
const data=ref({})
const loading=ref(false)
const ps=ref(1)
const kw=ref('')

// const
//3 写function
//通过异步请求获得病人 顾客的分页信息
async function loadData(pageNo){
  loading.value=false
  let url=`/register/page?pn=${pageNo}&count=${ps.value}`;

  if(kw.value!=''){
    url+=`&keyword=${kw.value}`;
  }
  // console.log(url)
  const result = await fetchData(url,null);

  if(result.result){
    // console.log("测试data是否赋值")
    if(kw.value!=''){
      // console.log("data赋值")
      data.value = result.data;
      loading.value=true;
    }else{
      loading.value=false;
    }

  }else{
    if(result.errMsg=='未登录')
      router.push('/login')
  }
}

async function loadUseVo(userId) {
  // let url = `/user/getById?id=${userId}`;
  // const result = fetchData(url, null);
  // if (result.result) {
  //   // console.log("测试data是否赋值")
  //   userVo.value=result.data;
  //   console.log(result.data);
  // } else {
  //   console.log("userVo获取失败");
  //   if (result.errMsg == '未登录')
  //     router.push('/login')
  // }
  try {
    let url = `/user/getById?id=${userId}`;
    const result = await fetchData(url, null);

    if (result.result) {
      userVo = {...result.data};
      console.log("result.data");
      console.log(result.data);
      console.log("userVo");
      console.log(userVo);
    } else {
      console.error("userVo获取失败:", result.errMsg);
      if (result.errMsg === '未登录') {
        router.push('/login');
      }
    }
  } catch (error) {
    console.error("发生错误:", error);
  }
}

async function loadScheduling(deptID, userID, noon, visitDate) {
  // let url = `/scheduling/getPlan?deptId=${deptID}&userId=${userID}&noon=${noon}&start=${visitDate}&end=${visitDate}`;
  // const result = fetchData(url,null);
  // if(result.result){
  //   // console.log("测试data是否赋值")
  //   scheduling.value=result.data;
  //   console.log(result.data);
  // }else{
  //   console.log("Scheduling获取失败");
  //   if(result.errMsg=='未登录')
  //     router.push('/login')
  // }
  try {
    let url = `/scheduling/getPlan?deptId=${deptID}&userId=${userID}&noon=${noon}&start=${visitDate}&end=${visitDate}`;
    const result = await fetchData(url, null);

    if (result.result) {
      scheduling = {...result.data};
      console.log("result.data");
      console.log(result.data);
      console.log("scheduling");
      console.log(scheduling);
    } else {
      console.error("Scheduling获取失败:", result.errMsg);
      if (result.errMsg === '未登录') {
        router.push('/login');
      }
    }
  } catch (error) {
    console.error("发生错误:", error);
  }
}

function handleCurrentChange (number)  {
  loadData(number)
}

let register =ref({});
let registerVo=ref({});
let userVo=ref({});
let scheduling=ref({});

function del(t){
  // console.log(t);
  registerVo = { ...t };
  console.log(registerVo.userID);


  loadUseVo(registerVo.userID);

  loadScheduling(registerVo.deptID,registerVo.userID,registerVo.noon,registerVo.visitDate);



  register = {
    id: registerVo.id,
    caseNumber: registerVo.caseNumber,
    age: registerVo.age,
    ageType: registerVo.ageType,
    visitDate: registerVo.visitDate,
    noon: registerVo.noon,
    deptID: registerVo.deptID,
    userID: registerVo.userID,
    registLeID: registerVo.registLeID,
    settleID: registerVo.settleID,
    isBook: registerVo.isBook,
    registTime: registerVo.registTime,
    registerID: registerVo.registerID,
    visitState: registerVo.visitState,
    medicalCardId: registerVo.medicalCardId,
    timeInterval: registerVo.timeInterval,
    channel: registerVo.channel,
  };
  // console.log(typeof register);

  ElMessageBox.confirm(
      '确认是否退号?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  )
      .then(() => {
        // var formData = new FormData();
        const test = {
          register:register,
          registerVo:registerVo,
          userVo:userVo,
          scheduling:scheduling
        }

        //private Register register;
        // private RegisterVo registerVo;
        // private UserVo userVo;
        // private SchedulingVo scheduling;

        // formData.append("register", register.value);
        // formData.append("registerVo", registerVo.value);
        // Object.keys(registerVo).forEach(key => {
        //   formData.append(`registerVo_${key}`, registerVo[key]);
        // });
        //
        // Object.keys(register).forEach(key => {
        //   formData.append(`register_${key}`, register[key]);
        // });
        //
        // Object.keys(userVo).forEach(key => {
        //   formData.append(`userVo_${key}`, userVo[key]);
        // });
        //
        // Object.keys(scheduling).forEach(key => {
        //   formData.append(`scheduling_${key}`, scheduling[key]);
        // });

        // for(let [key,value] of formData.entries()){
        //   console.log(key +":"+ value)
        // }

        postReq("/register/del",test).then(resp=>{
          if(resp.data.result){
            loadData(data.value.current)
            ElMessageBox.alert('退号成功', '提示',{})

          }else{
            if(resp.data.result.errMsg=='未登录')
              router.push('/login')

            ElMessageBox.alert(resp.data.errMsg, '提示',{})
          }
        })
      })
}

</script>

<style scoped>
.h-20{
  height: 20px;
}
</style>