/*
 * @Author       : ming
 * @Date         : 2023-12-03 17:35:54
 * @LastEditors  : ming
 * @LastEditTime : 2023-12-04 17:21:14
 * @Description  : express-02-baseAjax.js 页面中原生Ajax
 */
// 1. 引入express
import express from 'express'
// const express = require('express')

// 2. 创建应用对象
const app = express()

// 3. 创建路由规则
app.all('/json', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 允许自定义响应头
  response.setHeader('Access-Control-Allow-Headers', '*')

  let data = {
    name: 'admin',
  }
  let str = JSON.stringify(data)

  // 设置相应
  response.send(str)
})

// 针对ie缓存 --- ie已放弃
app.all('/ie', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 允许自定义响应头
  response.setHeader('Access-Control-Allow-Headers', '*')

  let data = {
    name: 'admin',
  }
  let str = JSON.stringify(data)

  // 设置相应
  response.send(str)
})

// 请求超时与请求异常
app.all('/time', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 允许自定义响应头
  response.setHeader('Access-Control-Allow-Headers', '*')

  let data = {
    name: 'admin',
    desc: '请求超时与请求异常',
    time: '1000',
  }
  let str = JSON.stringify(data)

  setTimeout(() => {
    // 设置响应
    response.send(str)
  }, 3000)
  
})

// 取消请求  || 重复请求
app.all('/delay', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  let data = {
    name: 'admin',
    desc: '取消请求 || 重复请求',
  }
  let str = JSON.stringify(data)
  setTimeout(() => {
    response.send(str)
  }, 3000)
})

// Jquery
app.all('/jquery', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  let data = {
    name: 'admin',
    desc: 'jQuery',
  }
  let str = JSON.stringify(data)
  response.send(str)
})

// axios
app.all('/axios', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  let data = {
    name: 'admin',
    desc: 'axios',
  }
  let str = JSON.stringify(data)
  response.send(str)
})

// fetch
app.all('/fetch', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  let data = {
    name: 'admin',
    desc: 'fetch',
  }
  let str = JSON.stringify(data)
  response.send(str)
})

// 4. 监听端口启动服务
app.listen(8867, () => {
  console.log('express-03-jsonData.js 服务已启动，8867端口监听中……')
})
