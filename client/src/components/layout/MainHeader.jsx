import React from "react";

const MainHeader = () => {
  return (
    <header className="header-banner">
      <div className="overlay"></div>
      <div className="animated-texts overlay-content text-center">
        <h1>
          Araç Kiralama Sayfamıza Hoş Geldiniz!
        </h1>
        <p className="p-4">Seyahatinizi unutulmaz kılmak için ihtiyacınız olan mükemmel aracı burada bulabilirsiniz. Güvenli, konforlu ve ekonomik seçeneklerimizle yola çıkmaya hazır olun. İster iş ister tatil için olsun, aradığınız aracı sizin için hazırlıyoruz.
        </p>
      </div>
    </header>
  );
};

export default MainHeader;
