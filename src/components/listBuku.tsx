import type{ Buku } from "../types/buku";

interface BukuListProps {
  bukus: Buku[];
  fetchBukus: () => Promise<void>;
  setSelectedBuku: (buku: Buku) => void;
}

const BukuList: React.FC<BukuListProps> = ({
  bukus,
  fetchBukus,
  setSelectedBuku,
}) => {
  const handleDelete = async (id?: number) => {
    if (!id) return;

    try {
      await fetch(
        `/api/delete-buku/${id}`,
        {
          method: "DELETE",
        }
      );
      fetchBukus();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <h2>Daftar Buku</h2>

      {bukus.map((buku) => (
      
    <div
      key={buku.id}
      style={{
        border: "1px solid gray",
        margin: "10px",
        padding: "10px",
      }}
    >
      <h3 style={{textAlign: "center"}}>  {buku.judul}</h3>
      <img src={buku.imageUrl} alt={buku.judul} style={{ width: "150px", height: "200px", objectFit: "cover", display: "block", margin: "0 auto 10px" }} />
      <p>deskripsi  : {buku.deskripsi}</p>
      <p>Kategori   : {buku.kategori}</p>

      <button onClick={() => setSelectedBuku(buku)}>Edit</button>
      <button onClick={() => handleDelete(buku.id)}>Pinjam</button>
    </div>
  ))}
    </div>
  );
};

export default BukuList;