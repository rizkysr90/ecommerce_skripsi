import React from "react";
import welcomeImg from "./../media/brooke-lark-pGM4sjt_BdQ-unsplash.jpg";
function Banner() {
  return (
    <div className="bg-base-100 h-96 flex flex-col items-center justify-center rounded-lg">
      <div
        className="hero min-h-screen bg-cover"
        style={{
          backgroundImage: `url(${welcomeImg})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-base-100">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Selamat Datang</h1>
            <p className="mb-5">
              <span className="font-bold">Di Toko Online Rizki Plastik</span>{" "}
              <br></br> Jl. Puri Cendana No.112, Sumberjaya, Kec. Tambun Sel.,
              Kabupaten Bekasi, Jawa Barat 17510
            </p>
            <button className="btn btn-secondary normal-case">
              Belanja Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
