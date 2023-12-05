/*
 * @Author       : ming
 * @Date         : 2023-12-03 17:23:18
 * @LastEditors  : ming
 * @LastEditTime : 2023-12-03 17:48:22
 * @Description  : express 基础使用
 */

// 1. 引入express
import express from 'express'
// const express = require('express')

// 2. 创建应用对象
const app = express()

// 3. 创建路由规则
// request 请求报文的封装
// response 响应报文的封装
app.get('/', (request, response) => {
  // 设置相应
  response.send('hhhhh')
})

// 4. 监听端口启动服务
app.listen(8866, () => {
  console.log('express-01-test.js 服务已启动，8866端口监听中……')
})
