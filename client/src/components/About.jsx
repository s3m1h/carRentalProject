import React from 'react';

const About = () => {
    return (
        <section className="py-3 py-md-5">
            <br />
            <div className="container p-5">
                <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
                    <div className="col-12 col-lg-6 col-xl-5">
                        <img className="img-fluid rounded" loading="lazy" src="about.jpeg" alt="About 1" />
                    </div>
                    <div className="col-12 col-lg-6 col-xl-7">
                        <div className="row justify-content-xl-center">
                            <div className="col-12 col-xl-11">
                                <h2 className="mb-3">Biz Kimiz?</h2>
                                <p className="lead fs-4 text-secondary mb-3">Yolculuğunuz bizim için önemli. Bu yüzden, araç kiralama sürecinizi mümkün olduğunca rahat ve keyifli hale getirmek için buradayız. Geniş araç filomuzla, her türlü ihtiyaca uygun çözümler sunuyoruz. İster iş ister tatil için olsun, size en uygun aracı bulmanıza yardımcı olmak için buradayız..</p>
                                <p className="mb-5">Kurulduğumuz günden bu yana, müşteri memnuniyetini her şeyin üzerinde tutuyoruz. Güvenilir ve kaliteli hizmet anlayışımızla, siz değerli müşterilerimizin beklentilerini karşılamak için çalışıyoruz. Araçlarımızın her biri, sizlere en iyi deneyimi sunmak için özenle seçilmiş ve bakımdan geçirilmiştir.

                                    Misyonumuz, seyahat etme özgürlüğünüzü en üst düzeye çıkarmak. Vizyonumuz, sürdürülebilir ve yenilikçi çözümlerle sektörde öncü olmak.

                                    Siz de araç kiralama deneyiminizi bizimle yaşamak istiyorsanız, hemen rezervasyon yapın ve farkı hissedin!

                                    Yol Arkadaşınız Olmaktan Gurur Duyuyoruz!.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </section>

    );
}

export default About;
