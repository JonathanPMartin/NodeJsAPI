const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/users');
const model2=require('../models/encrypt');
//const auth = require('koa-basic-auth');
const auth = require('../controllers/auth');
const clean=require('../controllers/clean')
const router = Router({prefix: '/api/v1/User'});

//router.post('/Login',bodyParser(), Login);
router.post('/',bodyParser(), Register);
router.put('/:id([0-9]{1,})',bodyParser(),auth, Update);
router.get('/',auth,Getall);
router.del('/:id([0-9]{1,})',auth,Delete)
/*
async function Login(ctx) {
	console.log('test')
const body =ctx.request.body;
  let user = await model.Login(body);
	let test=await model2.genSalt('test');
	console.log('return is bellow');
	console.log(test);
  if (user.length) {
    ctx.body = user;
		let tem=ctx.state.user;
		console.log('tem is bellow')
		console.log(tem)
		ctx.status = 201;
  }
}
*/
async function Register(ctx){
	let body=ctx.request.body;
	let data=body.username+body.password
	let Isclean=await clean.clean(data);
	if (Isclean){
	let user=await model.addUser(body.username,body.password)
	console.log(user);
	if (user != null){
		console.log(ctx.status)
		ctx.status = 201;
		console.log(ctx.status)
	}
}else{
	ctx.status = 401;

}
}
async function Update(ctx){
	const user = ctx.state.user;
	let id = ctx.params.id;
	let body=ctx.request.body;
	var data=String(body.UserRole)
	let Isclean=await clean.clean(data);
	if(Isclean){
		console.log('test')
		if(user.UserRole=='admin'){
			var result=await model.update(id,body.UserRole)
			ctx.body=true;
			ctx.status=200;
		}else{
				ctx.status=401;
		}
	}else{
			ctx.status=401;
	}
}
async function Delete(ctx){
	const user = ctx.state.user;
	let id = ctx.params.id;
	if(id==user.id || user.UserRole=='admin'){
		var result=await model.deleteUser(id)
		ctx.body=result
		ctx.status=200;
	}else{
		ctx.status=401
	}

}
async function Getall(ctx){
	const user = ctx.state.user;
	if(user.UserRole=='admin'){
		let result=await model.getAll()
		ctx.body=result
		ctx.status=200
	}else{
		ctx.status=401
	}
}
module.exports = router;