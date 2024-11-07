// src/setupProxy.ts
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

export default function (app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://54.251.243.96:3000/', // Địa chỉ máy chủ API của bạn
      changeOrigin: true,
    })
  );
}
