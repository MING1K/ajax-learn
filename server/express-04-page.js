/*
 * @Author       : ming
 * @Date         : 2023-12-04 17:40:22
 * @LastEditors  : ming
 * @LastEditTime : 2023-12-05 00:28:38
 * @Description  : 
 */
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname } from "node:path"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log(__filename, __dirname)
const resolvedPath =  pathToFileURL(__dirname).pathname

// 1. 引入express
import express from 'express'

// 2. 创建应用对象
const app = express()

// 3. 创建路由规则
app.all('/home', (request, response) => {
  // 设置响应头 设置允许跨域
  // response.setHeader('Access-Control-Allow-Origin', '*')
  // 允许自定义响应头
  // response.setHeader('Access-Control-Allow-Headers', '*')
  // 响应一个页面
  let path =  (resolvedPath + '/server-01-cros/index.html').substring(1)
  // console.log(path)
  response.sendFile(path)
})

app.all('/data', (request, response) => {
  // 设置响应头 设置允许跨域
  // response.setHeader('Access-Control-Allow-Origin', '*')
  // 允许自定义响应头
  // response.setHeader('Access-Control-Allow-Headers', '*')
  let data = {
    name: 'admin',
    desc: '用户数据',
  }
  response.send(JSON.stringify(data))
})

// jsonp
app.all('/jsonp', (request, response) => {
  // 设置响应头 设置允许跨域
  // response.setHeader('Access-Control-Allow-Origin', '*')
  // 允许自定义响应头
  // response.setHeader('Access-Control-Allow-Headers', '*')
  let data = {
    name: 'admin',
    desc: '用户数据',
  }
  response.send('console.log(data, "script标签发送请求")')
})

// jsonp
app.all('/check-username', (request, response) => {
  let username = request.query.username
  // console.log(request.params, request.query)
  let data = {
    name: username,
    desc: `用户名${username}已经存在`,
  }
  response.end(`initData(${JSON.stringify(data)})`)
})

// jQuery jsonp
app.all('/jquery-jsonp', (request, response) => {
  let username = request.query.username
  // console.log(request.params, request.query)
  let data = {
    name: username,
    desc: `用户名${username}已经存在`,
  }
  // 接收callback参数
  let cd = request.query.callback
  response.end(`${cd}(${JSON.stringify(data)})`)
})

// cors-request
app.all('/cors-request', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500') // 注意'/'是否存在
  // 允许自定义响应头
  response.setHeader('Access-Control-Allow-Headers', '*')
    // 允许自定义响应头
  response.setHeader('Access-Control-Allow-Method', '*')
  let data = {
    name: 'admin',
    desc: `用户名${'admin'}已经存在`,
  }
  response.send(JSON.stringify(data))
})


// 4. 监听端口启动服务
app.listen(8868, () => {
  console.log('express-04-page.js 服务已启动，8868端口监听中……')
})
