import axios from 'axios'

//let base = '/his';
let base='http://localhost:8080'
export const postReq = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
	headers: {
	  'token': localStorage.getItem("token"),
	}
  });
}
export const getReq = (url,params) => {
  return  axios({
    method: 'get',
    data:params,
    url: `${base}${url}`,
	headers: {
	  'token': localStorage.getItem("token"),
	}
  });
}

export const fetchData = async (url,params) => {
  try {
    const response = await axios({
		method: 'get',
		data:params,
		url: `${base}${url}`,
		headers: {
		  'token': localStorage.getItem("token"),
		}
	  })
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      // Do whatever you want to transform the data
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/json',
    }
  });
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
export const getRequest = (url,params) => {
  return axios({
    method: 'get',
    data:params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: `${base}${url}`
  });
}
export const showConstants = (row, column, cellValue, index) => {
  let showMsg = '';
  let array = JSON.parse(localStorage.getItem('ConstantsObj'));
  array.forEach(function (c) {
    // console.log(c['ID']+":"+cellValue+":"+c['ConstantName']);
    if(c['ID']==cellValue){
      showMsg = c['ConstantName'];
    }
  });
  return showMsg;
}

export const showMsgTitle = (_this,msg) => {
  _this.$message(msg+"成功");
}
export const showMsgConfirm = (_this,msg) => {
    _this.$confirm('此操作将'+msg+',是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      _this.$message({
        type: 'success',
        message: '成功!'
      });
    }).catch(() => {
      _this.$message({
        type: 'info',
        message: '已取消'
      });
    });
}
