function hatimOlustur() {}

new Vue({
  el: "#app",
  data: {
    eshas: [
      "1.Kişi ",
      "2.Kişi ",
      "3.Kişi ",
      "4.Kişi ",
      "5.Kişi ",
      "6.Kişi ",
      "7.Kişi ",
      "8.Kişi ",
      "9.Kişi ",
      "10.Kişi "
    ],
    eshasSahifeler: [],
    sahifeAdedi: 10,
    ilkTarih: new Date(2019, 0, 1),
    nihaiTarih: new Date(2019, 3, 31),
    hatimSahifeleri: [],
    eshasIkiTarihArasi: []
  },
  methods: {
    formatDate: function(stringDate) {
      var date = new Date(stringDate);
      return (
        ("0" + date.getDate()).slice(-2) +
        "." +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "." +
        date.getFullYear()
      );
    },
    hesabEt: function() {
      this.sahifeDuzeniHesabEt();
      this.sahifeleriDagit();
    },
    //Javascript loop between date ranges
    ilkTarihGetir: function() {
      return new Date(this.ilkTarih.getTime());
    },
    hatimSahifeMusiriArtir: function(pArtirilacak) {
      let netice;
      if (pArtirilacak == this.hatimSahifeleri.length - 1) {
        netice = 0;
      } else {
        netice = pArtirilacak + 1;
      }
      return netice;
    },
    sahifeleriDagit: function() {
      let sahisIkiTarihArasi = [];
      let sahislarIkiTarihArasi = [];
      let eshasMusir;
      let eshasHatimSahifeMusiri = 0,
        sahisHatimSahifeMusiri = 0;
      let tarih;
      //this.eshas.forEach(function(entry) {});
      for (eshasMusir = 0; eshasMusir < this.eshas.length; eshasMusir++) {
        tarih = this.ilkTarihGetir();
        sahisIkiTarihArasi = [];
        sahisHatimSahifeMusiri = eshasHatimSahifeMusiri;
        eshasHatimSahifeMusiri = this.hatimSahifeMusiriArtir(
          eshasHatimSahifeMusiri
        );
        for (; tarih <= this.nihaiTarih; tarih.setDate(tarih.getDate() + 1)) {
          sahisIkiTarihArasi.push({
            Tarih: this.formatDate(tarih),
            Sahifeler: this.hatimSahifeleri[sahisHatimSahifeMusiri]
          });
          sahisHatimSahifeMusiri = this.hatimSahifeMusiriArtir(
            sahisHatimSahifeMusiri
          );
        }
        sahislarIkiTarihArasi.push([
          this.eshas[eshasMusir],
          sahisIkiTarihArasi
        ]);
      }
      this.eshasIkiTarihArasi = sahislarIkiTarihArasi;
    },
    sagaYasla: function(pYaslanacak, pBosluk, pAdet) {
      let netice = "";
      netice = (pBosluk + pYaslanacak).slice(-1 * pAdet);
      return netice;
    },
    sahifeDuzeniHesabEt: function() {
      let sahife = 0;
      let sahifeBitis;
      let araNetice = [];
      let siraNo = 0;
      while (sahife <= 604) {
        siraNo += 1;
        sahifeBitis = sahife + this.sahifeAdedi - 1;
        if (sahifeBitis > 604) {
          sahifeBitis = 604;
        }
        araNetice.push(
          this.sagaYasla(sahife, "00", 3) +
            "-" +
            this.sagaYasla(sahifeBitis, "00", 3)
        );
        sahife += this.sahifeAdedi;
      }
      this.hatimSahifeleri = araNetice;
    }
  }
});

let tarih = new Date();
tarih.setDate(tarih.getDate() + 1);
