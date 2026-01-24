import { DetailService } from "@/app/services/detail.service";
import AuthGuard from "@/app/components/Auth/Auth";
import BookingCard from "@/app/components/Booking/BookingCard"; // Import component vừa tạo

interface Props {
  params: { id: string };
}

export default async function RoomDetailPage({ params }: Props) {
  const { id } = await params;

  try {
    const roomDetail = await DetailService.getById(id);

    return (
      <AuthGuard>
        <div className="container mx-auto p-4 max-w-6xl">
          {/* Header */}
          <h1 className="text-3xl font-bold mb-4">{roomDetail.tenPhong}</h1>

          {/* Ảnh phòng */}
          <div className="rounded-xl overflow-hidden mb-8">
            <img
              src={roomDetail.hinhAnh}
              alt={roomDetail.tenPhong}
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Layout 2 cột */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Cột trái: Thông tin phòng */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-2">
                Chi tiết căn phòng
              </h2>
              <p className="text-gray-600 mb-4">{roomDetail.moTa}</p>
              <div className="flex gap-4 border-t pt-4">
                <span>
                  <strong>Giường:</strong> {roomDetail.giuong}
                </span>
                <span>
                  <strong>Phòng tắm:</strong> {roomDetail.phongTam}
                </span>
                <span>
                  <strong>Khách tối đa:</strong> {roomDetail.khach}
                </span>
              </div>
            </div>

            {/* Cột phải: Card Đặt phòng */}
            <div className="md:col-span-1">
              <BookingCard roomDetail={roomDetail} />
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  } catch (error) {
    return <div className="text-center mt-10">Lỗi tải dữ liệu phòng.</div>;
  }
}
