//重新封装axios，便于参数传递
import Vue from 'vue';
//ajax请求插件
import axios from 'axios';
//处理传入的参数，变为字符串参数
import qs from 'qs';
import Cookies from 'js-cookie';
//公共管理数据
import store from '../store';
import {compressPic,dataURItoBlob,getQueryString} from '../common.js'

const Axios = axios.create({
  timeout: 20000,
  withCredentials: true // 是否允许带cookie等
});
// 添加一个请求拦截器，增加参数序列化功能，便于传递参数
Axios.interceptors.request.use(
  config => {
    if (config.method==="post"&&config.headers['Content-Type']==='application/x-www-form-urlencoded') {
      // 参数序列化
      config.data = qs.stringify(config.data);
    }
    // 判断url中是否传递token，有则写入cookie
    if (getQueryString('accessToken')) {
      Cookies.set("token", getQueryString('accessToken'), 90);
    }
    // 判断cookie中是否有token，有则写入请求头中
    let token = Cookies.get("token");
    if (token) {
      config.headers['channel-token'] = token;
      config.headers['accessToken'] = token;
    }
    return config;
  }, error=> {
  return Promise.reject(error);
});

const toastWhiteList = [];//后续可在这里添加不需要toast的白名单
// 添加一个响应拦截器
Axios.interceptors.response.use(response =>{
  let data = response.data;
  // 判断接口响应
  let code = data.resultCode;
  switch(code){
    // 成功
    case '00000':
    return Promise.resolve(data);
    // 无数据
    case '0007':
    return Promise.resolve(data);
    // token过期
    case '-10007':
    if(response.config.resultCodeWhiteList){
      var result = response.config.resultCodeWhiteList.find((item)=>{
          return item===code;
      });
      if(result){
          return Promise.resolve(data);
      }
    }
  }
  return response;
}, error=> {
  return Promise.reject(error);
});

/**
 * 封装get请求，get请求的参数写在config中例如config={params:params,withCredentials: true,}
 * @param url
 * @param data
 * @returns {Promise}
 */
export function ajaxGet(url,params={}){
  return new Promise((resolve,reject) => {
    Axios.get(url,{//整个对象为config
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求，params和cofig分离
 * @param url
 * @param data
 * @returns {Promise}
 */
export function ajaxPost(url,data = {},config){
  return new Promise((resolve,reject) => {
    Axios.post(url,data,config)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

/**
 * 封装上传图片的方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function uploadPic(vue,url,files,index){
  return new Promise((resolve, reject) => {
      vue.hideNoNetwork();
      let config = {
        headers:{
          'Content-Type':'application/json;charset=utf-8',
        }
      };  //添加请求头
      let params = new FormData(); //创建form对象
      params.noCache = Math.random();
      let reader = new FileReader();
      reader.onloadend = (e) => {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值，可用于显示预览图片
          let dataURL = reader.result;
          compressPic(dataURL).then(newDataURL=>{
              let formdata = new FormData();
              let blob = dataURItoBlob(newDataURL);
              formdata.append("file", blob, files[index].name);
              params = formdata;
              Axios.post(url,params,config).then( response => {
                  let data = response.data;
                  if(data.resultCode=="success") {
                      resolve (data.data);//返回获取的图片id
                  }
              }).catch(data=>{//失败的操作
                  
              })
              params= null;//清空上传文件
          });
      }
      reader.readAsDataURL(files[index]);
  // 隐藏
  //vue.$vux.loading.hide()
  })
}

/**
 * 封装jsonp方法
 * @param url
 * @param data
 * @returns {Promise}
 */
//调用方法
export function jsonp (url, data, time) {
  return new Promise((resolve, reject) => {
    function callback(json){
      resolve(json)
    }
    createJsonp(url, data,callback,time);
  })
};
//动态添加<script> 标签并组建请求url callback为跨域请求成功后回调函数
function createJsonp(url, data, callback, time) {
  var radom = Math.random() * 100;
  var number = parseInt(radom); //随机数字
  var callBackRadom = "jsonpSuccess_" + number; //指定回调函数
  window[callBackRadom] = callback;
  var query = []; 
  for (var key in data) {
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }
  var param = (query.length ? '?' + query.join('&') : '');
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (param != null && param.length > 0) {
    script.src = url + "" + param + "&callback=" + callBackRadom;
  }
  else {
    script.src = url + "?callback=" + callBackRadom;
  }
  script.id = callBackRadom; //指定id 是为了removeJsonp中动态去除<script>标签
  document.getElementsByTagName('head')[0].appendChild(script);
  //超时处理
  if (time) {
    setTimeout(function () {
      console.log('请求超时！')
      removeJsonp(callBackRadom);
    }, time);
  }else{
    removeJsonp(callBackRadom);
  }
}
//成功后移除动态加载的<script>标签
function removeJsonp (id) {
  var head = document.getElementsByTagName('head')[0];
  var el = document.getElementById(id);
  if (head != null && el != null) {
    head.removeChild(el);
  }
}