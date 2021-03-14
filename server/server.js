const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
// work with express
const server = require('http').Server(app)
const connection = require('./db')

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './dist')))

//例子：get方法的例子
app.get('/123', function (req, res) {
  console.log('teste', req.query)
  return res.json(questions)
})


//上传登录的用户名并判断是否存在
app.post('/Login', function (req, res) {

  console.log('12345678')
  const { username, password } = req.body
  console.log('param', username, password)

  const sql = `select * from userinfo where username='${username}'`
  connection.query(sql, function (error, results) {
    if (error) {
      // throw error;
      console.log("出现错误")
    }
    console.log('results', results)
    if (results.length != 0) {
      if (results[0].password === password) {
        console.log("success");
        return res.json({ code: 0, data: results })
      }
    }
    return res.json({ code: 1, msg: 'Wrong EmailAddress or Wrong PassWord' })
  })
})

//上传注册的信息
app.post('/logon', function (req, res) {
  const { username, password, email,value } = req.body
  console.log('username,password,email', username, password, email,value)
  const sql1 = `select * from userinfo where username= '${username}'`

  connection.query(sql1, function (error, results) {
    if (error) {
      console.log('查找时出错')
      throw error
    }
    console.log('results', results)
    if (results.length != 0) {
      return res.json({ code: 0, msg: "Your username has logon yet" })
    }
    const sql2 = `insert into userinfo (username, password, email,tag) values ('${username}', '${password}', '${email}','${value}')`
    connection.query(sql2, function (err, rest) {
      if (err) {
        console.log('插入时出错')
        throw err
      }
      console.log('result', rest)
      return res.json({ code: 1, msg: "You have logon succeed!" })
    })
  })
})

//添加教师
app.post('/addteacher', function (req, res) {
  const { username, password, email } = req.body
  console.log('username,password,email', username, password, email)
  const sql3 = `select * from userinfo where username= '${username}'`
  connection.query(sql3, function (error, results) {
    if (error) {
      console.log('查找时出错')
      throw error
    }
    console.log('results', results)
    if (results.length != 0) {
      return res.json({ code: 0, msg: "Your username has logon yet" })
    }
    const sql4 = `insert into userinfo (username, password, email) values ('${username}', '${password}', '${email}')`
    connection.query(sql4, function (err, rest) {
      if (err) {
        console.log('插入时出错')
        throw err
      }
      console.log('result', rest)
      return res.json({ code: 1, msg: "You have logon succeed!" })
    })
  })
})
//添加机房
app.post('/addroom', function (req, res) {
  const { roomname, roomaddress, pcnumber } = req.body
  console.log('roomname,roomaddress,pcnumber', roomname, roomaddress, pcnumber)
  const sql5 = `select * from roominfo where roomname= '${roomname}'`
  connection.query(sql5, function (error, results) {
    if (error) {
      console.log('查找时出错')
      throw error
    }
    console.log('results', results)
    if (results.length != 0) {
      return res.json({ code: 0, msg: "Your username has logon yet" })
    }
    const sql = `insert into roominfo (roomname,roomaddress,pcnumber,tag) values ('${roomname}', '${roomaddress}', '${pcnumber}','0')`
    //插入电脑个数
    for (var i = 0; i < pcnumber; i++) {
      const sql = `insert into pcinfo (tag,roomname) values ('0', '${roomaddress}')`
      connection.query(sql, function (err, rest) {
        if (err) {
          console.log('添加时出错')
          throw err
        }
      })
    }
    connection.query(sql, function (err, rest) {

      console.log('result', rest)
      return res.json({ code: 1, msg: "You have logon succeed!" })
    })
  })
})

//修改密码
app.post('/setting', function (req, res) {
  const { username, new1password } = req.body
  console.log("newpassword" + new1password)
  const sql2 = `select * from userinfo where username= '${username}'`

  connection.query(sql2, function (error, results) {
    if (error) {
      console.log("连接出错")
      throw error
    }
    console.log("results", results)

    // if(results.length!=0){
    //   return res.json({code:0,msg:"Your username has logon yet"})
    // }
    const sql3 = `update userinfo set password = '${new1password}' WHERE username = '${username}'`
    connection.query(sql3, function (err, rest) {
      if (err) {
        console.log('修改时出错')
        throw err
      }
      console.log('result++++', rest)
      return res.json({ code: 1, msg: "You have succeed!" })
    })
  })
})

//选择电脑
app.post('/choice_pc', function (req, res) {
  const { username,batchPassArr} = req.body
  console.log(" batchPassArr" + username, batchPassArr)
  const sql2 = `select * from userinfo where username= '${username}'`
 console.log(username),
  connection.query(sql2, function (error, results) {
    if (error) {
      console.log("连接出错")
      throw error
    }
    console.log("results", results)
    const sql3 = `update pcinfo set tag = 1 WHERE pcid = '${batchPassArr}'`
    connection.query(sql3, function (err, rest) {
      if (err) {
        console.log('选择电脑出错')
        throw err
      }
      console.log('result++++', rest)
      return res.json({ code: 1, msg: "You have succeed!" })
    })
  })
})

//选择教室
app.post('/choice_room', function (req, res) {
  const { username,batchPassArr} = req.body
  console.log(" batchPassArr" + username, batchPassArr)
  const sql2 = `select * from userinfo where username= '${username}'`
  console.log("gkgsddk",username)
  connection.query(sql2, function (error, results) {
    if (error) {
      console.log("连接出错")
      throw error
    }
    console.log("results", results)
    const sql3 = `update roominfo set tag = 1 WHERE roomname = '${batchPassArr}'`
    connection.query(sql3, function (err, rest) {
      if (err) {
        console.log('选择电脑出错')
        throw err
      }
      
      console.log('result++++', rest)
      return res.json({ code: 1, msg: "You have succeed!" })
    })
  })
})

//选择已被占用教室
app.post('/deleteroom', function (req, res) {
  const { username,batchPassArr} = req.body
  console.log(" batchPassArr" + username, batchPassArr)
  const sql2 = `select * from userinfo where username= '${username}'`

  connection.query(sql2, function (error, results) {
    if (error) {
      console.log("连接出错")
      throw error
    }
    console.log("results", results)
    const sql3 = `update roominfo set tag = 0 WHERE roomname = '${batchPassArr}'`
    connection.query(sql3, function (err, rest) {
      if (err) {
        console.log('选择电脑出错')
        throw err
      }
      console.log('result++++', rest)
      return res.json({ code: 1, msg: "You have succeed!" })
    })
  })
})

//选择已被占用电脑
app.post('/deletepc', function (req, res) {
  const { username,batchPassArr} = req.body
  console.log(" batchPassArr" + username, batchPassArr)
  const sql2 = `select * from userinfo where username= '${username}'`

  connection.query(sql2, function (error, results) {
    if (error) {
      console.log("连接出错")
      throw error
    }
    console.log("results", results)
    const sql3 = `update pcinfo set tag = 0 WHERE pcid = '${batchPassArr}'`
    connection.query(sql3, function (err, rest) {
      if (err) {
        console.log('选择电脑出错')
        throw err
      }
      console.log('result++++', rest)
      return res.json({ code: 1, msg: "You have succeed!" })
    })
  })
})

//选择删除教师
app.post('/delete_teacher', function (req, res) {
  const { username,batchPassArr} = req.body
  console.log(" batchPassArr" + username, batchPassArr)
  const sql2 = `select * from userinfo where username= '${username}'`

  console.log("gkgsddk",username)
  connection.query(sql2, function (error, results) {
    if (error) {
      console.log("连接出错")
      throw error
    }
    console.log("results", results)
    const sql3 = `delete from userinfo  WHERE username = '${batchPassArr}'`
    connection.query(sql3, function (err, rest) {
      if (err) {
        console.log('选择电脑出错')
        throw err
      }
      console.log('result++++', rest)
      return res.json({ code: 1, msg: "You have succeed!" })
    })
  })
})
//获取数据库教室内容
app.get('/choice_room', function (req, res) {
  const {tag} = req.query
  console.log('roominfo', tag)
  const sql =`select * from roominfo where tag='0'`
  connection.query(sql,  function (error, results, f) {
    if (error) throw error
    console.log('results', results[0], typeof (results[0]))
    return res.json({code: 1, data: results})
  })
})

//获取数据库教师内容
app.get('/delete_teacher', function (req, res) {
  const {tag} = req.query
  console.log('roominfo', tag)
  const sql =`select * from userinfo where tag='1'`
  connection.query(sql,  function (error, results, f) {
    if (error) throw error
    console.log('results', results[0], typeof (results[0]))
    return res.json({code: 1, data: results})
  })
})
//获取数据库pc内容
app.get('/choice_pc', function (req, res) {
  const {tag} = req.query
  console.log('pcinfo', tag)
  const sql =`select * from pcinfo where tag='0'`
  connection.query(sql,  function (error, results, f) {
    if (error) throw error
    console.log('results', results[0], typeof (results[0]))
    return res.json({code: 1, data: results})
  })
})


//获取数据库被占用pc内容
app.get('/deletepc', function (req, res) {
  const {tag} = req.query
  console.log('pcinfo', tag)
  const sql =`select * from pcinfo where tag='1'`
  connection.query(sql,  function (error, results, f) {
    if (error) throw error
    console.log('results', results[0], typeof (results[0]))
    return res.json({code: 1, data: results})
  })
})

//获取数据库已被占用教室内容
app.get('/deleteroom', function (req, res) {
  const {tag} = req.query
  console.log('roominfo', tag)
  const sql =`select * from roominfo where tag='1'`
  connection.query(sql,  function (error, results, f) {
    if (error) throw error
    console.log('results', results[0], typeof (results[0]))
    return res.json({code: 1, data: results})
  })
})

app.get('/', (req, res) => res.send('Hello World!'))

server.listen(3000, function () {
  console.log('Node app start at port 3000')
})
