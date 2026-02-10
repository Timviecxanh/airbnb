
# AirBnB Clone - CyberSoft

Dự án này là một ứng dụng web mô phỏng nền tảng AirBnB, được xây dựng với Next.js, TypeScript, React, Redux, và các công nghệ hiện đại. Dự án phục vụ cho mục đích học tập, thực hành kỹ năng Front end và quản lý hệ thống đặt phòng.

## Tính năng nổi bật

- Đăng nhập, đăng ký, quên mật khẩu, cập nhật hồ sơ cá nhân
- Tìm kiếm phòng, xem chi tiết phòng, đặt phòng, lịch sử đặt phòng
- Quản lý bình luận, đánh giá phòng
- Quản trị viên: quản lý người dùng, phòng, địa điểm, booking
- Giao diện responsive, tối ưu cho desktop và mobile

## Cấu trúc thư mục

```
src/
	app/
		(pages)/
			admin/         # Trang quản trị: user, room, location, booking
			login/         # Đăng nhập
			signup/        # Đăng ký
			profile/       # Hồ sơ cá nhân
			rooms/         # Danh sách phòng, chi tiết phòng
			history/       # Lịch sử đặt phòng
			forgot-password/ # Quên mật khẩu
		components/      # Các component UI: Header, Footer, Menu, RoomCard, BookingCard, CommentSection...
		hooks/           # Custom hooks (ví dụ: useAuth)
		libs/            # Cấu hình API, axios
		services/        # Xử lý logic gọi API: booking, comment, room, user, admin...
		store/           # Redux store, provider
		types/           # Định nghĩa kiểu dữ liệu TypeScript
```

## Công nghệ sử dụng

- Next.js (App Router)
- React, TypeScript
- Redux Toolkit
- Axios
- SCSS/CSS Modules
- ESLint, Prettier

## Hướng dẫn khởi động

1. Cài đặt dependencies:
	 ```bash
	 npm install
	 ```
2. Chạy server phát triển:
	 ```bash
	 npm run dev
	 ```
3. Truy cập [http://localhost:3000](http://localhost:3000)

## Đóng góp & phát triển

Mọi ý kiến đóng góp, cải tiến hoặc báo lỗi vui lòng gửi về repo hoặc liên hệ trực tiếp.

## Tài liệu tham khảo

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TypeScript](https://www.typescriptlang.org/)

---
Dự án thuộc chương trình đào tạo FullStack Developer tại CyberSoft Academy.
