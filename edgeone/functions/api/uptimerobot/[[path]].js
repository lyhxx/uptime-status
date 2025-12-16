/**
 * EdgeOne 边缘函数 - UptimeRobot API 代理
 * 用于解决浏览器跨域问题
 * 
 * 路径: /api/uptimerobot/*
 * 示例: /api/uptimerobot/v2/getMonitors
 */

const UPTIMEROBOT_API = 'https://api.uptimerobot.com';

// CORS 响应头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

export async function onRequest(context) {
  const { request } = context;
  
  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(request.url);
    
    // 提取路径参数
    const path = context.params.path ? context.params.path.join('/') : '';
    
    // 构建目标 URL
    const targetUrl = `${UPTIMEROBOT_API}/${path}${url.search}`;

    // 转发请求
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: request.method === 'POST' ? await request.text() : undefined,
    });

    // 获取响应内容
    const data = await response.text();

    // 返回带 CORS 头的响应
    return new Response(data, {
      status: response.status,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        stat: 'fail',
        error: { 
          message: error.message || '代理请求失败' 
        } 
      }), 
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
