// import Vue from "vue";
// import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

// Vue.use(VueRouter);

// const routes = [
//   {
//     path: "/",
//     name: "Home",
//     component: Home
//   },
//   {
//     path: "/about",
//     name: "About",
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/About.vue")
//   }
// ];

// const router = new VueRouter({
//   routes
// });

// export default router;
import Vue from 'vue'
import Router from 'vue-router'
//使用懒加载的方式来引入,只有路由被访问的时候才加载
import home from '@/components/home'
import index from '@/components/HelloWorld'
import loginpage from '@/components/Login'
// const loginpage = resolve => require(['@/components/Login'],resolve)

Vue.use(Router)
    let router =  new Router({
  routes: [
        {
            path:'/',
            name :'login',
            component:loginpage
        },
        {
            path:'/login',
            name :'login',
            component:loginpage
        },
        {
            path:'/home',
            name :'home',
            component:home
        },
        {
            path:'/index',
            name :'index',
            component:index
        }
  ]
})
    //对每次访问之前都要先看是否已经登录
    router.beforeEach((to,from,next)=>{
        if(to.path.startsWith('/login')){
            window.sessionStorage.removeItem('access-token');
            next();
        }else{
            let token = window.sessionStorage.getItem('access-token');
            if(!token){
                //未登录  跳回主页面
                next({path:'/login'});
            }else{
                next();
            }
        }

    });


export default router