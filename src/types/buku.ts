export type kategori = "komik" | "novel" | "majalah";
export type status = "available" | "borrowed";

export interface Buku {
    id?: number;
    judul: string;
    deskripsi: string;
    tahun: string;
    kategori: kategori;
    status?: status;
    peminjam?: string;
    imageUrl?: string;
}