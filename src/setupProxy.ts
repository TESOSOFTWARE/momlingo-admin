// import { createProxyMiddleware } from 'http-proxy-middleware';
// import { Application } from 'express';

// export default function (app: Application) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'https://api.momlingo.com/',
//       changeOrigin: true,
//     })
//   );
// }

import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

export default function setupProxy(app: Application): void {
  app.use(
    '/api', // Tiền tố cho các yêu cầu API
    createProxyMiddleware({
      target: 'https://api.momlingo.com', // API đích
      changeOrigin: true, // Đổi origin của request để tránh lỗi CORS
      pathRewrite: {
        '^/api': '', // Loại bỏ tiền tố `/api` nếu không cần thiết
      },
      secure: false, // Bỏ qua kiểm tra SSL nếu API sử dụng chứng chỉ tự ký
    })
  );
}
