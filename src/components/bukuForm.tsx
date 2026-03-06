import { useEffect, useState } from "react";
import type { Buku } from "../types/buku";

interface BukuFormProps {
  fetchBukus: () => Promise<void>;
  selectedBuku: Buku | null;
  setSelectedBuku: (buku: Buku | null) => void;
}

const emptyForm: Buku = {
  judul: "",
  deskripsi: "",
  tahun: "",
  kategori: "komik",
};

const BukuForm: React.FC<BukuFormProps> = ({
  fetchBukus,
  selectedBuku,
  setSelectedBuku,
}) => {
  const [formData, setFormData] = useState<Buku>(emptyForm);

  useEffect(() => {
    if (selectedBuku) {
      setFormData(selectedBuku);
    } else {
      setFormData(emptyForm);
    }
  }, [selectedBuku]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:  value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();


    try {
      console.log("DATA DIKIRIM:", formData);

      let response;

      if (selectedBuku && selectedBuku.id) {

  const dataUpdate = {
    judul: formData.judul.trim(),
    deskripsi: formData.deskripsi.trim(),
    tahun: formData.tahun,
    kategori: formData.kategori,
    status: selectedBuku.status,
    peminjam: selectedBuku.peminjam,
    imageUrl: selectedBuku.imageUrl
  };

  console.log("DATA DIKIRIM:", dataUpdate);

  response = await fetch(`/api/buku/${selectedBuku.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUpdate),
  });

  setSelectedBuku(null);
} else {
        // CREATE - pastikan id tidak dikirim
        //const { id, ...dataWithoutId } = formData;

        // response = await fetch("/api/create-buku", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
            // judul: formData.judul.trim(),
            // deskripsi: formData.deskripsi.trim(),
            // tahun: Number(formData.tahun),
            // kategori: formData.kategori,
        //   }),
        // });
      }

    //   const result = await response.json();

    //   if (!response.ok) {
    //     console.error("SERVER ERROR DETAIL:", result);
    //     alert(JSON.stringify(result));
    //     return;
    //   }

    //   console.log("SUCCESS:", result);

      setFormData(emptyForm);
      fetchBukus();
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedBuku ? "Edit Buku" : "Tambah Buku"}</h2>

      <input
        name="judul"
        placeholder="Judul"
        value={formData.judul}
        onChange={handleChange}
        required
      />

      <input
        name="deskripsi"
        placeholder="Deskripsi"
        value={formData.deskripsi}
        onChange={handleChange}
        required
      />

      <input
        name="tahun"
        placeholder="Tahun"
        value={formData.tahun}
        onChange={handleChange}
        required
      />

      <select
        name="kategori"
        value={formData.kategori}
        onChange={handleChange}
        required
      >
        <option value="komik">Komik</option>
        <option value="novel">Novel</option>
        <option value="majalah">Majalah</option>
      </select>


      <button type="submit">
        {selectedBuku ? "Update" : "Tambah"}
      </button>
    </form>
  );
};

export default BukuForm;