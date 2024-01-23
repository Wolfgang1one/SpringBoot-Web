<template>
  <!-- 搜索栏 start -->
  <el-row>
    <el-col :span="3" style="padding-right: 20px;">
      <el-select v-model="gender" class="m-2" filterable
                 clearable @clear="loadData(1)"
                 placeholder="性别"  @change="loadData(1)" >
        <el-option v-for="item in genders"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id"/>
      </el-select>
    </el-col>

    <el-col :span="3" style="padding-right: 20px;">
      <el-select v-model="cardType" class="m-2" filterable
                 clearable @clear="loadData(1)"
                 placeholder="卡类型"  @change="loadData(1)" >
        <el-option
            v-for="item in cardTypes"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
      </el-select>
    </el-col>
    <el-col :span="5" style="padding-right: 20px;">
      <el-input v-model.trim="kw"
                placeholder="请输入关键字进行检索" class="w-100 m-2"/>
    </el-col>
    <el-col :span="3">
      <el-button type="primary" @click="loadData(1)" >查询</el-button>
    </el-col>
    <el-col :span="4"></el-col>
    <el-col :span="3">
      <el-button type="danger" @click="addDialogVisible=true">新增用户</el-button>
    </el-col>
  </el-row>

  <div style="margin-top: 40px;"></div>
  <!-- 搜索栏 end -->
  <!-- 表格栏 start -->
      <el-row class="m-2">
        <el-col :span="24">
          <el-table :data="data.records" style="width:100%;"
                    v-loading="loading">
            <!--  expand类型就表示表项可展开   -->
            <el-table-column fixed="left"  type="expand">
              <!--     展开卡片的内容在这里写         -->
              <template  #default="scope">
                <el-card class="box-card">
                  <div>卡号: {{scope.row.cardNo}}</div>
                  <div>家庭住址:{{scope.row.addr}} </div>
                  <div>渠道:{{scope.row.channelName}} </div>
                  <div>注册时间:{{scope.row.createdate}} </div>
                </el-card>
              </template>
            </el-table-column>
            <!--  expand拓展卡片end   -->

            <el-table-column fixed prop="id" label="序号" width="80" align="center"/>
            <el-table-column prop="realName" label="姓名" align="center"/>
            <el-table-column prop="genderName" label="性别"  align="center" />
            <el-table-column prop="idnumber" label="身份证号"  align="center" />
            <el-table-column prop="birthdate" label="生日"  align="center" />
            <el-table-column prop="phone" label="联系方式"  align="center" />
            <el-table-column prop="cardTypeName" label="卡类型"  align="center" />

            <el-table-column fixed="right" label="Operations"  align="center" >
              <template #default="scope">
                <el-button link type="primary" @click="showEdit(scope.row)">编辑</el-button>
                <el-button link type="danger" @click="del(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>

        </el-col>
      </el-row>

  <!-- 表格栏 end -->
  <div style="margin-top: 20px;"></div>
  <!-- page start -->
  <el-row>
    <el-col :span="20">
      <el-pagination background layout="prev, pager, next"
                     :total="data.total" :page-count="data.pages"
                     @current-change="handleCurrentChange"/>
    </el-col>
    <el-col :span="4">
      <el-select v-model="ps" class="m-2" placeholder="每页行数" @change="loadData(1)" >
        <el-option
            v-for="item in pageSizes"
            :key="item"
            :label="item"
            :value="item"/>
      </el-select>
    </el-col>
  </el-row>
  <!-- page end -->



  <!-- 编辑数据项对话框 start -->
  <el-dialog v-model="editDialogVisible" title="编辑" @close="closeDialog">
    <el-form :model="editform" :rules="rules" label-width="100px">
      <el-form-item label="卡号"  prop="cardNo" >
        <el-input v-model="editform.cardNo"  autocomplete="off" readonly />
      </el-form-item>
      <el-form-item label="性别"  prop="gender">
        <el-select v-model="editform.gender" class="m-2" filterable placeholder="性别"   >
          <el-option v-for="item in genders"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道来源"  prop="channel">
        <el-select v-model="editform.channel" filterable class="m-2" placeholder="渠道来源"   >
          <el-option v-for="item in channels"
                     :key="item.id"
                     :label="item.constantName"
                     :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="卡类型"  prop="cardType">
        <el-select v-model="editform.cardType" filterable class="m-2" placeholder="渠道来源"   >
          <el-option v-for="item in cardTypes"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名"  prop="realName" >
        <el-input v-model="editform.realName"  autocomplete="off" />
      </el-form-item>
      <el-form-item label="身份证号"  prop="idnumber" >
        <el-input v-model="editform.idnumber"  autocomplete="off" />
      </el-form-item>
      <el-form-item label="生日"  prop="birthdate" >
        <el-col :span="8"  style="padding-right: 20px;">
          <el-date-picker
              v-model="editform.birthdate"
              type="date"
              start-placeholder="date"
              :size="size"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"/>
        </el-col>
      </el-form-item>
      <el-form-item label="联系方式"  prop="phone" >
        <el-input v-model="editform.phone"  autocomplete="off" />
      </el-form-item>
      <el-form-item label="地址"  prop="addr" >
        <el-input v-model="editform.addr"  autocomplete="off" />
      </el-form-item>
    </el-form>

    <template #footer>
	      <span class="dialog-footer">
	        <el-button @click="editDialogVisible = false">取消</el-button>
	        <el-button type="primary" @click="editSave">
	          保存
	        </el-button>
	      </span>
    </template>
  </el-dialog>
  <!-- 编辑数据项对话框  end-->

  <!-- 新增常数据项对话框 start -->
  <el-dialog v-model="addDialogVisible" title="新增" @close="closeDialog">
    <el-form :model="editform" :rules="rules" label-width="100px">
      <el-form-item label="性别"  prop="useType">
        <el-select v-model="editform.gender" class="m-2" filterable placeholder="性别"   >
          <el-option v-for="item in genders"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道来源"  prop="channel">
        <el-select v-model="editform.channel" filterable class="m-2" placeholder="渠道来源"   >
          <el-option v-for="item in channels"
                     :key="item.id"
                     :label="item.constantName"
                     :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="卡类型"  prop="cardType">
        <el-select v-model="editform.cardType" filterable class="m-2" placeholder="渠道来源"   >
          <el-option v-for="item in cardTypes"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名"  prop="realName" >
        <el-input v-model="editform.realName"  autocomplete="off" />
      </el-form-item>
      <el-form-item label="身份证号"  prop="idnumber" >
        <el-input v-model="editform.idnumber"  autocomplete="off" />
      </el-form-item>
      <el-form-item label="生日"  prop="birthdate" >
        <el-col :span="8"  style="padding-right: 20px;">
          <el-date-picker
              v-model="editform.birthdate"
              type="date"
              start-placeholder="date"
              :size="size"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"/>
        </el-col>
      </el-form-item>
      <el-form-item label="联系方式"  prop="phone" >
        <el-input v-model="editform.phone"  autocomplete="off" />
      </el-form-item>
      <el-form-item label="地址"  prop="addr" >
        <el-input v-model="editform.addr"  autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
	      <span class="dialog-footer">
	        <el-button @click="addDialogVisible = false">取消</el-button>
	        <el-button type="primary" @click="save">
	          新增
	        </el-button>
	      </span>
    </template>
  </el-dialog>
  <!-- 新增常数据类别对话框  end-->
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { fetchData,postReq } from '../../utils/api'
import { ElMessageBox } from 'element-plus'

//加载页码
const loading=ref(false)
//分页信息
const data = ref({})

//搜索栏 下拉框数据集
//搜索栏 文本框
const kw=ref('')
const gender=ref('')
const cardType=ref('')

//每页行数
const ps=ref(10)
//行数集
const pageSizes=[5,10,20,30,50]
//性别集合
const genders = [{name:'男',id:71}, {name:'女',id:72}]
const cardTypes = [{name:'普通卡',id:185}, {name:'医保卡',id:186}]
const channels = ref([])


//新增对话框是否显示
const addDialogVisible = ref(false)
//编辑对话框是否显示
const editDialogVisible = ref(false)
//表单对象
const editform=ref({
  "id": '',
  "realName": "",
  "gender": '',
  "idnumber": "",
  "birthdate": '',
  "phone": "",
  "channel":"",
  "cardType":"",
  "addr":"",
  "cardNo":""
})
//表单验证
const rules=ref({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  realName: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ]
})

//组件挂载后事件
onMounted(async() => {
  loadData(1)
  //科室
  loadChannelData()

});


async function loadChannelData(){
  // typeid=16是就诊渠道
  let url=`/constantitem/page?&count=200&pn=1&ctype=16`
  const result = await fetchData(url,null);
  if(result.result){
    channels.value=result.data.records
  }else{
    if(result.errMsg=='未登录'){
      router.push('/login')
    }
  }
}

//加载用户数据
async function loadData(pn){
  loading.value=true
  let url=`/medicalCard/page?count=${ps.value}&pn=${pn}`
  if(kw!='')
    url+=`&keyword=${kw.value}`
  if(gender!='')
    url+=`&gender=${gender.value}`
  if(cardType!='')
    url+=`&cardType=${cardType.value}`
  const result = await fetchData(url,null);
  if(result.result){
    console.log(result)
    data.value = result.data
    console.log(data.value)
    loading.value=false
  }else{
    if(result.errMsg=='未登录')
      router.push('/login')
  }
}

//分页
function handleCurrentChange (number)  {
  loadData(number)
}
//显示编辑框
function showEdit(item){
  editDialogVisible.value=true
  editform.value=item
}
function  closeDialog(){
  editform.value={
    "id": '',
    "userName": "",
    "realName": "",
    "useType": '',
    "useTypeName": "",
    "docTitleID": '',
    "docTitle": "",
    "isScheduling": "",
    "deptID": '',
    "dept": "",
    "registLeID": '',
    "registLe": ""
  }
}

//保存编辑内容
function editSave(){
  console.log(editform.value.deptType)
  postReq("/medicalCard/update",editform.value).then(resp=>{
    if(resp.data.result){
      editDialogVisible.value=false
      loadData(data.value.current)
      ElMessageBox.alert('修改成功', '提示',{})

    }else{
      if(result.errMsg=='未登录')
        router.push('/login')
      ElMessageBox.alert(resp.data.errMsg, '提示',{})
    }

  })
}
//新增就诊卡
function save(){
  postReq("/medicalCard/add",editform.value).then(resp=>{
    if(resp.data.result){
      addDialogVisible.value=false
      loadData(data.value.current)
      ElMessageBox.alert('新增成功', '提示',{})
    }else{
      if(result.errMsg=='未登录')
        router.push('/login')
      ElMessageBox.alert(resp.data.errMsg, '提示',{})
    }
  })
}

function del(id){
  ElMessageBox.confirm(
      '确认是否删除?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  )
      .then(() => {
        var formData = new FormData();
        formData.append("id", id);
        postReq("/medicalCard/del",formData).then(resp=>{
          if(resp.data.result){
            loadData(data.value.current)
            ElMessageBox.alert('删除成功', '提示',{})
          }else{
            if(result.errMsg=='未登录')
              router.push('/login')
            ElMessageBox.alert(resp.data.errMsg, '提示',{})
          }
        })
      })
}

</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 10px;
}

.box-card {
  width: 99.8%;
}
</style>