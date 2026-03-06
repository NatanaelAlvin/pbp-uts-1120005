// import { useEffect, useState } from "react";
// import MenuList from "./components/MenuList";
// import MenuForm from "./components/MenuForm";
// import type{ Menu } from "./types/Menu";

// function App() {
//   const [menus, setMenus] = useState<Menu[]>([]);
//   const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

//   const fetchMenus = async (): Promise<void> => {
//     try {
//       const res = await fetch(
//         "/api/list-menu"
//       );
//       const data: Menu[] = await res.json();
//       setMenus(data);
//     } catch (error) {
//       console.error("Error fetching menus:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMenus();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Manajemen Menu</h1>

//       <MenuForm
//         fetchMenus={fetchMenus}
//         selectedMenu={selectedMenu}
//         setSelectedMenu={setSelectedMenu}
//       />

//       <MenuList
//         menus={menus}
//         fetchMenus={fetchMenus}
//         setSelectedMenu={setSelectedMenu}
//       />
//     </div>
//   );
// }

// export default App;


import { useState } from "react";
import ListBuku from "./components/listBuku";
import BukuForm from "./components/bukuForm";
import type { Buku } from "./types/buku";

function App() {
  const [bukus, setBukus] = useState<Buku[]>([]);
  const [bukuById, setBukuById] = useState<Buku[]>([]);
  const [selectedBuku, setSelectedBuku] = useState<Buku | null>(null);
  const [showBuku, setShowBuku] = useState(false);
  const [showBukuById, setShowBukuById] = useState(false);
  const [bukuId, setBukuId] = useState("");

  const fetchBukus = async (): Promise<void> => {
  try {
    const res = await fetch("/api/buku");
    const data = await res.json();

    setBukus(data.data);
    setShowBuku(true);

  } catch (error) {
    console.error("Error fetching bukus:", error);
  }
};



  const fetchBukuById = async () => {

  if (!bukuId) {
    alert("Masukkan ID terlebih dahulu");
    return;
  }

  try {
    const res = await fetch(`/api/buku/${bukuId}`);
    const data = await res.json();

    setBukuById([data.data]);
    setShowBukuById(true);

  } catch (error) {
    console.error("Error fetching buku by id:", error);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manajemen Buku</h1>

      <BukuForm
        fetchBukus={fetchBukus}
        selectedBuku={selectedBuku}
        setSelectedBuku={setSelectedBuku}
      />
      <h3>Cari Buku Berdasarkan ID</h3>

      <input
        type="string"
        placeholder="Masukkan ID Buku"
        value={bukuId}
        onChange={(e) => setBukuId(e.target.value)}
      />

      <button onClick={fetchBukuById}>
        Cari Buku
      </button>

      {showBukuById && (
        <ListBuku
          bukus={bukuById}
          fetchBukus={fetchBukus}
          setSelectedBuku={setSelectedBuku}
        />
      )}

      <hr />

      <button onClick={fetchBukus}>
        {showBuku ? "Refresh Buku" : "Lihat Buku"}
      </button>

      {showBuku && (
        <ListBuku
          bukus={bukus}
          fetchBukus={fetchBukus}
          setSelectedBuku={setSelectedBuku}
        />
      )}
    </div>
  );
}

export default App;