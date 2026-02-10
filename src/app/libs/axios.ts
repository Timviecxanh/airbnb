import axios from 'axios';

// Tạo instance axios với base URL
const api = axios.create({
  baseURL: 'https://airbnbnew.cybersoft.edu.vn/api',
  timeout: 10000,
});

// Request Interceptor - Tự động thêm token vào header
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    }
    
    // Set default headers
    config.headers['tokenCybersoft'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2OCIsIkhldEhhblN0cmluZyI6IjE1LzAyLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczOTU4NzIwMDAwMCIsIm5iZiI6MTcxMDUyMjAwMCwiZXhwIjoxNzM5NzM0ODAwfQ.qvs4kgn3DKAu13LJnl1gm-Q6v2AzRnWIhHKhkVN3IgE';
    config.headers['Content-Type'] = 'application/json';
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Xử lý response và error
api.interceptors.response.use(
  (response) => {
    // Trả về data content nếu có
    return response.data?.content || response.data;
  },
  (error) => {
    // Xử lý các lỗi phổ biến
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    } else if (error.response?.status === 403) {
      console.error('Không có quyền truy cập');
    } else if (error.response?.status === 500) {
      console.error('Lỗi server');
    }
    
    // Trả về error message từ API hoặc error mặc định
    return Promise.reject(error.response?.data?.message || error.message);
  }
);

export default api;