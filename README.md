# `Ajax` 学习

## 1. express基础使用

### express服务
```
// 1. 引入express
import express from 'express'
// const express = require('express')

// 2. 创建应用对象
const app = express()

// 3. 创建路由规则
// request 请求报文的封装
// response 响应报文的封装
// 可以接受任意类型请求
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

// 4. 监听端口启动服务
app.listen(8867, () => {
  console.log('express-03-jsonData.js 服务已启动，8867端口监听中……')
})
```

### 页面使用

```
const result = document.getElementById('result')
const initData = (res) => {
  result.innerHTML = res.name
}

const resultPost = document.getElementById('result-post')
const initPostData = (res) => {
  resultPost.innerHTML = res.name
}

// get请求
const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
  // 1. 创建对象
  const xhr = new XMLHttpRequest()
  // 2. 初始化，设置请求的方法和url
  xhr.open('GET', 'http://127.0.0.1:8867/json?a=1&b=2&c=3')
  // 3.发送
  xhr.send()
  // 4.事件绑定 处理服务端返回结果
  // on when 当……时
  // readystate xhr对象中的属性，表示状态：0 表示未初始化  1 open方法调用完毕 2 send方法已经调用完毕 3 服务端返回部分结果 4 服务端返回了所有结果
  // change 改变
  xhr.onreadystatechange = () => {
    // 判断 服务端返回所有结果时
    if (xhr.readyState === 4) {
      // 判断 响应状态码 200 403 404 401 500
      if (xhr.status >= 200 && xhr.status < 300) {
        // 处理结果 行 头 空行 体
        console.log(xhr.status) // 响应状态码
        console.log(xhr.statusText) // 响应状态字符串
        console.log(xhr.getAllResponseHeaders()) // 所有响应头
        console.log(xhr.response) // 响应体

        // 手动转换数据
        let data = JSON.parse(xhr.response)
        initData(data)
      } else {
        console.error(xhr)
      }
    }
  }
})

// post请求
const box = document.getElementById('post-box')
const clearData = () => {
  resultPost.innerHTML = '鼠标移上发送请求Post'
}
box.addEventListener('mouseenter', () => {
  // 1. 创建对象
  const xhr = new XMLHttpRequest()

  // 设置响应体类型(主动转换响应体类型)
  xhr.responseType = 'json'

  // 2. 初始化，设置请求的方法和url
  xhr.open('POST', 'http://127.0.0.1:8867/json')

  // 设置请求头
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.setRequestHeader('name', 'admin')

  // 3.发送
  xhr.send('a=1&b=2&c=3') // post请求参数设置
  // 4.事件绑定 处理服务端返回结果
  // on when 当……时
  // readystate xhr对象中的属性，表示状态：0 表示未初始化  1 open方法调用完毕 2 send方法已经调用完毕 3 服务端返回部分结果 4 服务端返回了所有结果
  // change 改变
  xhr.onreadystatechange = () => {
    // 判断 服务端返回所有结果时
    if (xhr.readyState === 4) {
      // 判断 响应状态码 200 403 404 401 500
      if (xhr.status >= 200 && xhr.status < 300) {
        // 处理结果 行 头 空行 体
        // console.log(xhr.status) // 响应状态码
        // console.log(xhr.statusText) // 响应状态字符串
        // console.log(xhr.getAllResponseHeaders()) // 所有响应头
        // console.log(xhr.response) // 响应体

        // 手动转换数据
        // let data = JSON.parse(xhr.response)
        // 自动转换数据 xhr。
        initPostData(xhr.response)
      } else {
        console.error(xhr)
      }
    }
  }
})
box.addEventListener('mouseout', () => {
  clearData()
})
```

## 2. nodemon 自动重新启动 node 应用程序

### 安装

> npm i -g nodemon

### 配置


### 启动


## 3. 请求配置

###  创建对象
```js
const xhr = new XMLHttpRequest();
```
#### 设置返回数据格式
```xhr.responseType = "json";```
#### 请求超时设置2s
```xhr.timeout = 2000;```
#### 超时回调函数
```js
xhr.ontimeout = () => {
  alert('超时，请重试')
}
```
#### 网络异常回调
```js
xhr.onerror = () => {
  alert('网络错误，请重试')
}
```
#### 初始化，设置请求的方法和url
```js
xhr.open("POST", "http://127.0.0.1:8867/time");
```
#### 设置请求头
```js
xhr.setRequestHeader(
  "Content-Type",
  "application/x-www-form-urlencoded"
);
xhr.setRequestHeader("name", "admin");
```

### 发送请求
```js
xhr.send(); // post请求参数设置
```

### 事件绑定 处理服务端返回结果
xhr.onreadystatechange
#### 判断 服务端返回所有结果时
xhr.readyState === 4
> 状态：0 表示未初始化  1 open方法调用完毕 2 send方法已经调用完毕 3 服务端返回部分结果 4 服务端返回了所有结果
##### 判断 响应状态码 200 403 404 401 500
xhr.status >= 200 && xhr.status < 300
##### 处理结果 行 头 空行 体
console.log(xhr.status) // 响应状态码
console.log(xhr.statusText) // 响应状态字符串
console.log(xhr.getAllResponseHeaders()) // 所有响应头
console.log(xhr.response) // 响应体
```js
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(xhr.status) // 响应状态码
      console.log(xhr.statusText) // 响应状态字符串
      console.log(xhr.getAllResponseHeaders()) // 所有响应头
      console.log(xhr.response) // 响应体
      initPostData(xhr.response);
    } else {
      console.error(xhr);
    }
  }
};
```

### 取消请求
```js
xhr.abort(); 
```

### 重复请求
设置标识变量、……


## 4. jQuery发送请求
```js
$('button').eq(0).click(() => {
  $.get('http://127.0.0.1:8867/jquery', { a: 100, b: 200 }, (res) => {
    console.log(res)
    let data = JSON.parse(res)
    console.log(`Get请求结果\n姓名：${data.name}\n描述：${data.desc}`)
  })
})

$('button').eq(1).click(() => {
  $.post('http://127.0.0.1:8867/jquery', { a: 100, b: 200 }, (res) => {
    console.log(res)
    console.log(`Post请求结果\n姓名：${res.name}\n描述：${res.desc}`)
  }, 'json') // 接收json数据类型
})

$('button').eq(2).click(() => {
  $.ajax({
    // url
    url: 'http://127.0.0.1:8867/jquery',
    // 参数
    data: { a: 100, b: 200 },
    // 请求类型
    type: 'GET',
    // 响应体结果
    dataType: 'json',
    // 成功的回调
    success: (data) => {
      console.log(data)
    },
    // 超时时间
    timeout: 2000,
    // 失败回调
    error: () => {
      console.log('出错了，请重试')
    },
    headers: {
      a: 300,
      name: 'admin',
    }
  })
})
```

## 5. axios发送请求
```js
const btns = document.querySelectorAll('button')

// 配置 baseURL
axios.defaults.baseURL = 'http://127.0.0.1:8867'

btns[0].onclick = () => {
  // GET请求
  axios.get('/axios', {
    // params参数
    params: {
      size: 100,
      number: 1,
    },
    // 请求头
    headers: {
      name: 'admin',
      token: '111111',
    }
  }).then((res) => {
    console.log(res, res.data)
    console.log(`Get请求结果\n姓名：${res.data.name}\n描述：${res.data.desc}`)
  })
}

btns[1].onclick = () => {
  // POST请求
  axios.post('/axios', {
    username: 'admin',
    password: '123456',
  }, {
    // params参数
    params: {
      size: 100,
      number: 1,
    },
    // 请求头
    headers: {
      name: 'admin',
      token: '111111',
    },
    // 请求体
    // data: {
    //   // username: 'admin',
    //   password: '123456',
    // },
  }).then((res) => {
    console.log(res, res.data)
    console.log(`Post请求结果\n姓名：${res.data.name}\n描述：${res.data.desc}`)
  })
}

btns[2].onclick = () => {
  // POST请求
  axios({
    method: 'POST',
    url: '/axios',
    // params参数
    params: {
      size: 100,
      number: 1,
    },
    // 请求头
    headers: {
      name: 'admin',
      token: '111111',
    },
    // 请求体
    data: {
      username: 'admin',
      password: '123456',
    },
  }).then((res) => {
    console.log(res, res.data)
    console.log(`通用型方法请求结果\n姓名：${res.data.name}\n描述：${res.data.desc}`)
  })
}
```


## 6. fetch请求
```js
btn.onclick = () => {
  fetch('http://127.0.0.1:8867/fetch?pagesize=10&number=1', {
    // 请求方法
    method: 'POST',
    // 请求头
    headers: {
      name: 'admin',
    },
    // 请求体
    body: 'username=admin&password=123456',
  }).then((res) => {
    console.log(res)
    // return res.text() // 返回字符串
    return res.json() // 返回json
  }).then((res) => {
    console.log(res)

  })
}
```

## 7. 同源策略
### 同源策略

- **同源**： "协议+域名+端口"三者相同
  - 两个不同的域名指向同一个 ip 地址，也非同源
- **同源策略 / SOP（Same origin policy）**：是一种约定，由 Netscape 公司 1995 年引入浏览器，它是浏览器最核心也最基本的安全功能，现在所有支持 JavaScript 的浏览器都会使用这个策略。
- 在同源策略下，web浏览器允许第一个页面的脚本访问第二个页面里的数据。这个策略可以阻止一个页面上的恶意脚本通过页面的DOM对象获得访问另一个页面上敏感信息的权限，确保一个应用中的资源只能被本应用的资源访问。
- **为什么**：如果缺少了同源策略，浏览器很容易受到 XSS、 CSFR 等攻击。

> - **XSS（Cross-Site Scripting，跨域脚本攻击）**
>
>   是最常见的 Web 攻击，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。 
>
>   - 本质：
>     - 恶意代码未经过滤，与网站正常的代码混在一起
>     - 浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行
>
> [前端 | XSS 的攻击手段及其防御 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/61773197) 
>
> - **CSFR（Cross-Site Request Forgery，跨站请求伪造攻击）**
>
>   是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。可以简单的理解为：攻击者可以盗用你的登陆信息，以你的身份模拟发送各种请求对服务器来说这个请求是完全合法的，但是却完成了攻击者所期望的一个操作，比如以你的名义发送邮件、发消息，盗取你的账号，添加系统管理员，甚至于购买商品、虚拟货币转账等。 
>
>   - 原理
>
>     1、用户C打开浏览器，访问受信任网站A，输入用户名和密码请求登录网站A；
>
>     2、在用户信息通过验证后，网站A产生Cookie信息并返回给浏览器，此时用户登录网站A成功，可以正常发送请求到网站A；
>
>     3、用户未退出网站A之前，在同一浏览器中，打开一个TAB页访问网站B；
>
>     4、网站B接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点A；
>
>     5、浏览器在接收到这些攻击性代码后，根据网站B的请求，在用户不知情的情况下携带Cookie信息，向网站A发出请求。网站A并不知道该请求其实是由B发起的，所以会根据用户C的Cookie信息以C的权限处理该请求，导致来自网站B的恶意代码被执行。
>
>   - CSRF 攻击的三个条件 :
>
>     1 . 用户已经登录了站点 A，并在本地记录了cookie
>
>     2 . 在用户没有登出站点 A 的情况下（也就是 cookie 生效的情况下），访问了恶意攻击者提供的引诱危险站点B（B站点要求访问站点A）
>
>     3 . 站点 A 没有做任何 CSRF 防御
>
> [什么是CSRF？如何防御CSRF攻击？知了堂告诉你 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/343515825) 

### 判断是否满足同源策略

下表给出了与 URL `http://store.company.com/dir/page.html` 的源进行对比的示例：

|                        URL                        | 结果 |                原因                 |
| :-----------------------------------------------: | :--: | :---------------------------------: |
|    `http://store.company.com/dir2/other.html`     | 同源 |            只有路径不同             |
| `http://store.company.com/dir/inner/another.html` | 同源 |            只有路径不同             |
|      `https://store.company.com/secure.html`      | 失败 |              协议不同               |
|    `http://store.company.com:81/dir/etc.html`     | 失败 | 端口不同（`http://` 默认端口是 80） |
|     `http://news.company.com/dir/other.html`      | 失败 |        主机不同（域名不同）         |


### 实例
```js
let btns = document.querySelectorAll('button')
let results = document.querySelectorAll('.result')

const initData = (res) => {
  results[0].innerHTML = res.response
}
btns[0].onclick = () => {
  const xhr = new XMLHttpRequest()
  // 因为是满足同源策略的，所以url可以简写
  xhr.open('GET', '/data')
  xhr.send() // post请求参数设置
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        initData(xhr)
      } else {
        console.error(xhr)
      }
    }
  }
}

const initPostData = (res) => {
  results[1].innerHTML = res.response
}
btns[1].onclick = () => {
  const xhr = new XMLHttpRequest()
  // 因为是满足同源策略的，所以url可以简写
  xhr.open('POST', '/data')
  xhr.send() // post请求参数设置
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        initPostData(xhr)
      } else {
        console.error(xhr)
      }
    }
  }
}
```


## 8. 实现跨越

1. script标签
2. jsonp

```js
// 发送请求
// 1. 创建script标签
const script = document.createElement('script')
// 2. 设置script标签属性
script.src = 'http://127.0.0.1:8868/check-username?username=' + username
// 3. 将标签插入文档中
document.body.appendChild(script)
```
3. jQuery jsonp

```js
let input = document.querySelector('#username')
const initData = (res) => {
  console.log(res)
  $('#result').html(res.desc)
}
let results = document.querySelectorAll('.result')
$('button').eq(0).click(() => {
  $.getJSON('http://127.0.0.1:8868/jquery-jsonp?callback=?', { username: input.value }, (res) => {
    let data = res
    console.log(`请求结果\n姓名：${data.name}\n描述：${data.desc}`)
    initData(res)
  })
  })
```

4. CORS 设置

```js
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500') // 注意'/'是否存在
  // 允许自定义响应头
  response.setHeader('Access-Control-Allow-Headers', '*')
    // 允许自定义响应头
  response.setHeader('Access-Control-Allow-Method', '*')
```