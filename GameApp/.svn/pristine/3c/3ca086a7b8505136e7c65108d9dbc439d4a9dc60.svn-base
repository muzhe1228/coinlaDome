import Vue from "vue";
import store from "./Store";
import Router from "vue-router";
import Home from "./views/Home";
import StartPage from "./views/StartPage";
import Header from "./components/Header";
import subHead from "./components/Header/subHead";
import Footer from "./components/Footer";
Vue.use(Router);

const router = new Router({
    //   mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "startPage",
            component: StartPage
        },
        {
            path: "/index",
            name: "home",
            components: {
                default: Home,
                mainheader: Header,
                mainfooter: Footer
            }
        },
        {
            path: "/hxjc",
            name: "Hxjc",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            components: {default: () => import("views/Hxjc")},
            meta: {
                requireAuth: true
            }
        },
        {
            path: "/yydb",
            name: "YYdbNew",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            components: {default: () => import("views/YYdbNew")},
            meta: {
                requireAuth: true
            }
        },
        {
            path: "/nn_room",
            name: "Hxnn",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            components: {
                default: () => import("views/Hxnn"),
                mainheader: subHead
            },
            meta: {
                requireAuth: true
            }
        },
        {
            path: "/user_info",
            name: "UserInfo",

            components: {
                default: () => import("views/User/UserInfo"),
                mainheader: subHead
            },
            meta: {
                requireAuth: true
            }
        },
        {
            path: "/task_center",
            name: "TaskCenter",

            components: {
                default: () => import("views/User/TaskCenter"),
                mainheader: subHead
            },
            meta: {
                requireAuth: true
            }
        },
        {
            path: "/payments",
            name: "Payments",
            components: {
                default: () => import("views/User/Payments"),
                mainheader: subHead
            },
            meta: {
                requireAuth: true
            }
        },
        {
            path: "/security_setting",
            name: "SecuritySetting",
            components: {
                default: () => import("views/User/SecuritySetting"),
                mainheader: subHead
            },
            meta: {
                requireAuth: true
            }
        },
        {
            path: "/msg_center",
            name: "MsgCenter",
            components: {
                default: () => import("views/User/MsgCenter"),
                mainheader: subHead
            },
            meta: {
                requireAuth: true
            }
        },
        {
            path: "/game_record",
            name: "GameRecord",
            components: {
                default: () => import("views/User/GameRecord"),
                mainheader: subHead
            },
            meta: {
                requireAuth: true
            }
        },

        {
            path: "/invite",
            name: "InviteDown",
            components: {default: () => import("views/InviteDown")},
            meta: {
                requireAuth: true
            }
        },
        {
            path: "/severChat",
            name: "ServerChat",
            components: {
                default: () => import("views/User/ServerChat")
            }
        },
        {
            path: "/rank",
            name: "Rank",
            components: {default: () => import("views/Rank")},
            meta: {
                requireAuth: true
            }
        },
        {
            path: "/my_bets",
            name: "myBets",
            components: {default: () => import("views/myBets")},
            meta: {
                requireAuth: true
            }
        },
        {
            path: "*", // 此处需特别注意至于最底部
            redirect: "/index"
        }
    ]
});

router.beforeEach((to, from, next) => {
    console.log("页面路由", to.fullPath);
    store.commit("setRouterPath", to.fullPath);
    if (to.matched.some(record => record.meta.requireAuth)) {
        // 判断该路由是否需要登录权限
        if (store.state.token) {
            next();
        } else {
            if (to.path != "/index" && to.path != "/") {
                next({path: "/index"});
                store.commit("SET_ISSHOWLOGIN", true);
            } else {
                next();
            }
        }
    } else {
        next();
    }
});
export default router;
