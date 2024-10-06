import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Thay đổi host tại đây
    port: 3001, // Thay đổi port nếu cần thiết
    open: true, // Tự động mở trình duyệt khi chạy
  },
})
