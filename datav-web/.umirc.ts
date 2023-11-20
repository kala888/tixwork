export default {
    hash: true,
    npmClient: 'yarn',
    request: {},
    routes: [
        {path: "/", component: "./home"},
        {path: "/test", component: "./test"},
        {path: "/chengao", component: "./chengao"},
        {path: "/ggas/:scene", component: "./ggas"},
    ]
};
