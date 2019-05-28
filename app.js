const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const log4js = require('log4js');
log4js.configure('config/log4js.json');
const logger = require('log4js').getLogger("app"); 
const hLogger = require('log4js').getLogger("http"); 
const db = require("./utils/db")
const fs = require("fs")
const path = require("path")  
const root = path.join(__dirname)

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())  
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  hLogger.trace(`${ctx.method} ${ctx.url} - ${ms}ms`);
}) 
// 注册路由
readDirSync(root)
function readDirSync(path){
  path = path+"/routes";
	var pa = fs.readdirSync(path);
	pa.forEach(function(ele,index){
		var info = fs.statSync(path+"/"+ele)	
		if(info.isDirectory()){
			console.log("dir: "+ele)
			readDirSync(path+"/"+ele);
		}else{
      console.log("dir: "+ele)
      let rot = require(path+"/"+ele);
      app.use(rot.routes(), rot.allowedMethods())
		}	
	})
} 

// error-handling
app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx);
});

module.exports = app
