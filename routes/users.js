const router = require('koa-router')()
const User = require('../model/user');
const constant = require('../utils/constant');

router.prefix('/users')

router.get('/', async (ctx, next) => {
  ctx.body = 'this is a users response!'
})

router.get('/info/:name', async (ctx, next) => {
  const params = ctx.params;
  const info = await  User.findOne({name:params.name});
  if(info && !info.errors){
    ctx.body = {
      code:constant.resultCode.Success_Code,
      data:info,
      msg:"success"
    }
  }else if(info && info.errors){
    ctx.body = {
      code:constant.resultCode.Error_Code_DB,
      msg:"db err"
    }
  }
  else{
    ctx.body = {
      code:constant.resultCode.Error_Code_NoExit,
      msg:"user is not exit"
    }
  }
})

router.get('/register', async (ctx, next) => {
  //test url - http://127.0.0.1:3000/users/register?userName=testuser&email=123@gmail.com
  let query = ctx.query;
  const user = {
    name: query.userName,
    email: query.email,
  };
  const info = await  User.find({name:user.name});
  if(info && info.length === 0){
    const crt =  await User.create(user);
    if(crt.errors){
      ctx.body = {
        code:constant.resultCode.Error_Code_DB,
        msg:"db create error"
      }
    }else{
      ctx.body = {
        code:constant.resultCode.Success_Code,
        msg:"success"
      }
    }
  }else if(info && info.length >0){
    ctx.body = {
      code:constant.resultCode.Error_Code_IsExit,
      msg:"user is exit"
    }
  }
  else{
    ctx.body = {
      code:constant.resultCode.Error_Code_DB,
      msg:"db err"
    }
  }
  
})

module.exports = router
