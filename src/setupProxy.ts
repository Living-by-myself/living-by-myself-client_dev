// // src/setupProxy.ts

// import { createProxyMiddleware } from 'http-proxy-middleware';

// module.exports = function (app: any) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'https://tracelover.shop',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api': '' // 경로에서 '/api'를 제거합니다.
//       }
//     })
//   );
// };
