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
        <el-table-column fixed prop="caseNumber" label="病历号"  width="80" align="center" />
        <el-table-column prop="realName" label="姓名"  align="center" />
        <el-table-column prop="idNumber" label="身份证号" align="center"/>
        <el-table-column prop="visitDate" label="挂号时间" align="center"/>
        <el-table-column prop="noon" label="挂号午别" align="center"/>
        <el-table-column prop="deptName" label="看诊科室"  align="center" />
        <el-table-column prop="deptTypeName" label="看诊状态"  align="center" />
        <el-table-column fixed="right" label="操作"  align="center" >
          <template #default="scope">
            <el-button link type="danger" >删除</el-button>
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

function handleCurrentChange (number)  {
  loadData(number)
}

</script>

<style scoped>
.h-20{
  height: 20px;
}
</style>