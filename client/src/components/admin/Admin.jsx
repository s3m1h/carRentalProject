import React, { useState } from "react";

import BallGame from "./Game";

const Admin = () => {

  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <section className=" rounded">
      <h2 className="text-black text-center ">Yönetim Panelimize Hoş Geldiniz!</h2>
      <hr />
      {!gameStarted ? (
        <div>
          <p>Biraz eğlenceye ne dersiniz? </p>
          <p> 1- Oyunu başlatmak için "Oyunu Başlat" butonuna tıklayınız</p>
          <p> 2- Eğer ekran boş görünüyorsa ekrana bir kez tıklayınız..</p>
          <button className="btn btn-success custom-button" onClick={startGame}>Oyunu Başlat</button>
        </div>
      ) : (
        <>
         <BallGame />
        </>
      )}
      
    </section>
  );
};

export default Admin;
