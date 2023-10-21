const Koa=require('koa');
const json=require('koa-json');
const KoaRouter=require('koa-router');
const path=require('path');
const render=require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app= new Koa();
const router = new KoaRouter();

// Replace With DB
const things= ['My Family', 'Programming', 'Music'];

// Json prettier Middleware
app.use(json());
// Body Parser Middleware 
app.use(bodyParser());

// Add additional properties to context 
app.context.user = "Asad";

// Simple Middleware 
// app.use(async ctx=> (ctx.body = {"msg": "Hello World"}));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
})

// Routes 
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

// List of things 
async function index(ctx) {
    await ctx.render('index', {
        title: 'Things I Love:',
        things: things
    });
}

// Show add page 
async function showAdd(ctx) {
    await ctx.render('add');
}

// Add thing 
async function add(ctx) {
    const body= ctx.request.body;
    things.push(body.thing);
    ctx.redirect('/');
}

router.get('/test', ctx => (ctx.body = `Bhai ${ctx.user}`));
router.get('/test2/:name', ctx => (ctx.body = `Bhai ${ctx.params.name}`));

// Router Middleware 
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,() => console.log('Server Started...'));