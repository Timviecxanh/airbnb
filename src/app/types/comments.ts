export interface Comment {
  id: number;
  maPhong: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
}

export interface CommentRequest {
  maPhong: number;
  maNguoiBinhLuan: number;
  noiDung: string;
  saoBinhLuan: number;
}

export interface CommentUpdate {
  id: number;
  maPhong: number;
  maNguoiBinhLuan: number;
  noiDung: string;
  saoBinhLuan: number;
}