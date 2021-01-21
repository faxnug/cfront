// 把 JSON 转换成请求中的参数
//let a = {name: hello, age:10}
//qs.Stringfy(a)
//name=hello&age=13
import Qs from 'qs';
//封装了 ajax，方便 http 调用
import axios from 'axios';

import router from '../router';

//通用公共方法（带回调）
export const reqRealEndAsync = (method, baseUrl, url, params, callback) => {
  params.token = sessionStorage.getItem('token');
  return axios({
    timeout:5000,
    baseURL:baseUrl,
    method:method,
    url:url,
    headers:{
      'Content-Type':'application/x-www-form-urlencoded',
    },
    data:Qs.stringify(params),
    //false --split
    //true --List<String>
    traditional:true,
  }).then(res => {
    let result = res.data;
    //{code:,message:,data:{{}}}
    if(result.code == 1){
      //
      router.replace({
        path:'login',
        query:{
          msg:result.message,
        }  
      })

    }else if(result.code == 0){
      //
      if(callback != undefined){
        callback(result.code, result.message, result.data);
      }

    }
    else{
      // console.error(result);
      //
      if(callback != undefined){
        callback(result.code, result.message, result.data);
      }
    }
  })
};

//通用公共方法（不带回调）
export const reqRealEnd = (method, baseUrl, url, params) => {
  params.token = sessionStorage.getItem('token');
  return axios({
    timeout:5000,
    baseURL:baseUrl,
    method:method,
    url:url,
    headers:{
      'Content-Type':'application/x-www-form-urlencoded',
    },
    data:Qs.stringify(params),
    //false --split
    //true --List<String>
    traditional:true,
  })
};