export default class KelimeIslemleri {
    static duzeltilmisKelime(kelime) {
        if (typeof kelime !== 'string') {
            throw new Error('Parametre bir string olmalıdır.');
        }

        // Tüm harfleri büyük yap
        var buyukKelime = kelime.toUpperCase();

        // Sadece ilk harfi büyük yap, geri kalanını küçük yap
        var duzeltilmis = buyukKelime.charAt(0) + buyukKelime.slice(1).toLowerCase();

        return duzeltilmis;
    }
}