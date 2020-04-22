// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function () {
  let articles = [];
  for (let i = 0; i < 5; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      date: Random.date(),  //年月日
      longDate: Random.datetime(), //精确到时分秒
      number: Random.natural(201, 205),  //数字
      image: Random.image(),      //图片
      flag: Random.boolean(),  // true-false
      name: Random.cname(),     //姓名
      url: Random.url(),       //url地址
      province: Random.province(),  //省
      city: Random.city(),     //市
      county: Random.county()  //区
    }
    articles.push(newArticleObject)
  }
  return {
    code: 1,
    msg: "操作成功",
    data: articles,
  }
}
Mock.setup({
  timeout: 500
})
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData);


const loginData = function (req) {
  const {username, password} = JSON.parse(req.body)
  if (username == 'wxh' && password == '123') {
    return {
      result: 200,
      data: {
        code: 1,
        uid: Random.id(),
        type: 1,
        username: username,
        expire_in: "63666",
        token: Random.guid(),
        logintime: Random.now()
      }
    }
  } else {
    return {
      result: 0,
      data: {
        code: 400,
        uid: Random.id(),
        type: 1,
        username: username,
        expire_in: "63666",
        token: Random.guid(),
        logintime: Random.now()
      }
    }
  }
}
Mock.mock('/api/login', 'post', loginData);
