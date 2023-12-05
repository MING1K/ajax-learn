const data = {
  name: 'admin',
  age: 18,
  sex: '男'
}

const alertData = () => {
  console.log(data, 'script标签实现跨域')
  alert(`姓名：${data.name} 性别：${data.sex} 年龄：${data.age}`)
}
