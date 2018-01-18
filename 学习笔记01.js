
//webpack学习笔记
const LoaderDependency = require("./LoaderDependency");

class LoaderPlugin {


	apply(compiler) {
		compiler.plugin("compilation",(compilation, params) => {
			const normalModuleFactory = params.normalModuleFactory;

			compilation.dependencyFactories.set(LoaderDependency, normalModuleFactory);
		});

		compiler.plugin("compilation", (compilation) => {
			compilation.plugin("normal-module-loader", (loaderContext, module) => {
				loaderContext.
			})
		})
	}
}


const path = require('path');

module.exports = {
	// 多入口文件
	entry: {
		entry: './src/main.js',
		entry2: './src/entry2.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {

	},
	plugins: [],
	devServer: {}
}



// koa2 学习笔记
const Koa = require('koa');
const app = new Koa();

app.use(async(ctx)=> {
	ctx.body = 'Hello world'
})

app.listen(3000);

console.log('app starting at port 3000')


async function testAsync() {
	return 'Hello World';
}

async function test() {
	const v1 = await testAsync();
	console.log(v1)
}

function takeLongTime() {
	return new Promise(resolve => {
		setTimeout(()=> resolve("long_time_value"),3000);
	});
}

async function test() {
	const v = await takeLongTime();
	console.log(v)
}

//接收get请求(demo02)
app.use(async(ctx)=> {
	let url = ctx.url;
	//从request中接收请求
	let request = ctx.request;
	let req_request = request.query;
	let req_requestString = request.querystring;

	//从上下文中获取get请求
	let ctx_query = ctx.query;
	let ctx_queryString = ctx.querystring;

	ctx.body = {
		url,
		req_request,
		req_requestString,
		ctx_query,
		ctx_queryString
	}


});

app.listen(3000, () => {
	console.log('[demo] server is starting at port 3000');
})

//接收Post请求(demo3)

app.use(async(ctx)=>{
	if(ctx.url === '/' && ctx.method === 'GET') {
		//显示表单页面
		let html = `
			<h1>hello world GET method</h1>
			<form method="POST" action="/">
				<p>UserName</p>
				<input name="userName" /><br/>
				<p>age</p>
				<button type="submit">submit</button>
			</form>	
		`;
		ctx.body = html;
	} else if(ctx.url === '/' && ctx.method === 'POST') {
		let postdata = await parsePostData(ctx);
		ctx.body = postdata;	
	} else {
		ctx.body = '<h1>404!</h1>'
	}
});

//解析post请求
function parsePostData(ctx){
	return new Promise((resolve,reject) => {
		try{
			let postdata = "";
			ctx.req.addListener('data', (data) => {
				postdata += data;
			})
			ctx.req.on('end',() => {
				let parseData = parseQueryStr(postdata);

				resolve(postdata);
			})
		} catch(error) {
			reject(error);
		}
	})
}

//格式化请求参数为json对象
function parseQueryStr(queryStr) {
	let queryData = {};
	let queryStrList = queryStr.split('&');
	for( let [index.queryStr] of queryStrList.entries() ) {
		 let itemList = queryStr.split('=');
		 queryData[itemList[0]] = decodeURIComponent(itemList[1]);
	}
	return queryData;
}


app.listen(3000, () => {
	console.log('server is starting at port 3000');
})


//koa-bodyparser中间件(转换post请求到ctx.request里面)

const bodyparser = require('koa-bodyparser');

app.use(bodyparser());

app.use(async(ctx)=>{
	if(ctx.url === '/' && ctx.method === 'GET') {
		//显示表单页面
		let html = `
			<h1>hello world GET method</h1>
			<form method="POST" action="/">
				<p>UserName</p>
				<input name="userName" /><br/>
				<p>age</p>
				<button type="submit">submit</button>
			</form>	
		`;
		ctx.body = html;
	} else if(ctx.url === '/' && ctx.method === 'POST') {
		//let postdata = await parsePostData(ctx);

		//中间件直接解析了post请求的参数
		let postdata = ctx.request.body;

		ctx.body = postdata;	
	} else {
		ctx.body = '<h1>404!</h1>'
	}
});


//koa2实现原生路由
const Koa = require('koa');
const app = new Koa();
const fs = require('fs');


async function route(url) {
	let page = '404.html';
	switch (url) {
		case '/':
			page = 'index.html';
			break;
		case 'index': 
			page = 'index.html';
			break;
		case '/todo':
			page = 'todo.html';
			break;
		case '/404':
			page = '404.html';
			break;
		default: 
			break;				
	}
	let html = await render(page);
	return html;
}

function render(page) {
	return new Promise((resolve,reject) => {
		let pageUrl = `./page/${page}`;
		fs.readFile(pageUrl,'binary',(err,data)=> {
			if(err){
				reject(err);
			} else {
				resolve(data);
			}
		})
	})
}

app.use(async(ctx) => {
	let url = ctx.request.url;
	let html = await route(url);
	ctx.body = html;
})

app.listen(3000,() => {
	console.log('server is starting at port 3000');
});



//koa路由中间件(koa-router)
const koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router
   .get('/',(ctx, next) => {
	  ctx.body = 'hello world';
   })
   .get('/todo',(ctx,next) => {
   		ctx.body = 'Todo page';
   })


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
	console.log('server is starting at port 3000');
});



//koa路由中间件(层级)

const koa = require('koa');
const Router = require('koa-router');

const app = new Koa();


let home = new Router();

home
  .get('/jspang',async(ctx) => {
	ctx.body = "home jspang page";
  })
  .get('/todo',async(ctx) => {
  	ctx.body = "home todo page";
  })

let page = new Router();

page
  .get('/jspang',async(ctx) => {
	ctx.body = "home jspang page";
  })
  .get('/todo',async(ctx) => {
  	ctx.body = "home todo page";
  })

//父级路由
let router = new Router();

router.use('/home',home.routes(),home.allowedMethods());

router.use('/page',page.routes(),home.allowedMethods());

app
  .use(router.routes())
  .use(router.allowedMethods())	

app.listen(3000, () => {
	console.log('serve is starting at port 3000');
})


//koa-router中间件 传递参数
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx,next) => {
	ctx.body = ctx.query;
})

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000, () => {
	console.log('server is starting at port 3000');
})   	


//koa中使用cookie
const Koa = require('koa');
const app = new Koa();

app.use(async(ctx) => {
	if(ctx.url === '/index') {
		ctx.cookie.set(
			'myName','JSPang',{
				domain:'127.0.0.1',
				path:'/index',
				maxAge: 1000*60*60*24,
				expires: new Date('2018-12-31');
				httpOnly: false,
				overwrite: false
			}
		);
		ctx.body = "cookie set is ok";
	} else {
		if(ctx.cookies.get('myName')){
			ctx.body = ctx.cookies.get('myName');
		} else {
			ctx.body = 'cookie is none';
		}
		ctx.body = "hello World";
	}
});

app.listen(3000, () => {
	console.log('sss')
})

//koa2 之ejs模板(koa-views)
const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const app = new Koa();


app.use(views(path.join(__dirnamem,'./views'),{
	extension: 'ejs'
}))

app.use(async(ctx) => {
	let title = 'hello 123';
	await ctx.render('index',{title});
})


//koa静态资源
const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();

const staticPath = './static';


app.use(static(path.join(__dirname,staticPath)));

app.use(async(ctx) => {
	ctx.body = "hello 11";
})

app.listen(3000, () => {
	console.log('server is starting at port 3000');
})






























































































