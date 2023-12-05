/*
 * @Author       : ming
 * @Date         : 2023-12-03 17:35:54
 * @LastEditors  : ming
 * @LastEditTime : 2023-12-03 18:33:17
 * @Description  : express-02-baseAjax.js 页面中原生Ajax
 */
// 1. 引入express
import express from 'express'
// const express = require('express')

// 2. 创建应用对象
const app = express()

// 3. 创建路由规则
// request 请求报文的封装
// response 响应报文的封装
app.get('/server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')

  // 设置相应
  response.send('Hello Ajax')
})

// post请求
app.post('/server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 允许自定义响应头
  response.setHeader('Access-Control-Allow-Headers', '*')

  // 设置相应
  response.send('Hello Ajax Post')
})

// 可以接受任意类型请求
app.all('/server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 允许自定义响应头
  response.setHeader('Access-Control-Allow-Headers', '*')

  // 设置相应
  response.send('Hello Ajax Post')
})

// 4. 监听端口启动服务
app.listen(8866, () => {
  console.log('express-02-baseAjax.js 服务已启动，8866端口监听中……')
})
