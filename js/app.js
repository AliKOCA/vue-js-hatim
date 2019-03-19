"use strict";

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
    nihaiTarih: new Date(2019, 4, 2),
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
    yazdir: function() {
      var pdf = new jsPDF("p", "pt", "letter");
      var divRapor = document.getElementById("divRapor");
      pdf.html(divRapor, {
        callback: function(pdf) {
          var iframe = document.createElement("iframe");
          iframe.setAttribute(
            "style",
            "position:absolute;right:0; top:0; bottom:0; height:100%; width:500px"
          );
          document.body.appendChild(iframe);
          iframe.src = pdf.output("datauristring");
        }
      });
    },
    satirCizgisiOlustur(pAded, pSatirCizgisi) {
      let netice = "";
      for (let intA = 1; intA < pAded; intA++) {
        netice += pSatirCizgisi;
      }
      return netice;
    },
    satirCizgisiGetir(pAded) {
      let netice = " " + this.satirCizgisiOlustur(pAded, "——————————————");
      netice += this.satirCizgisiOlustur(pAded - 2, "—");
      return netice;
    },
    yatayCizgiCiz(pDoc, pSutun, pSatir, pSatirdakiSutunAdedi) {
      pDoc.setLineWidth(0.1);
      pDoc.line(pSutun, pSatir, pSutun + pSatirdakiSutunAdedi * 33, pSatir);
    },
    dikeyCizgiCiz(pDoc, pSutun, pSatir, pBoy) {
      pDoc.setLineWidth(0.1);
      pDoc.line(pSutun, pSatir, pSutun, pSatir + pBoy);
    },
    yazdir2: function() {
      //var doc = new jsPDF("landscape");
      const satirdakiSutunAdedi = 5;
      const satirCizgisi = this.satirCizgisiGetir(satirdakiSutunAdedi);
      const sutunNo = 10;
      var doc = new jsPDF();
      this.eshasIkiTarihArasi.forEach(sahisIkiTarihArasi => {
        let satirNo = 0;
        doc.setFontSize(14);
        doc.text(sutunNo, 10, sahisIkiTarihArasi[0]);
        let sutunBiriktir = "| ";
        let birikenSutun = 0;
        let yazilacakSatirPoz = 12;
        doc.setFontSize(8);
        doc.text(sutunNo, yazilacakSatirPoz + 2, satirCizgisi);
        sahisIkiTarihArasi[1].forEach(satir => {
          doc.setFontSize(8);
          satirNo++;
          sutunBiriktir += satir["Tarih"] + " " + satir["Sahifeler"] + " | ";
          if (birikenSutun === satirdakiSutunAdedi) {
            yazilacakSatirPoz += 4;
            doc.text(sutunNo, yazilacakSatirPoz, sutunBiriktir);
            doc.text(sutunNo, yazilacakSatirPoz + 2, satirCizgisi);
            console.log(sutunBiriktir);
            sutunBiriktir = "| ";
            birikenSutun = -1;
          }
          birikenSutun++;
        });
        doc.addPage();
      });
      doc.save("Test.pdf");
    },
    yazdir3: function() {
      this.hesabEt();
      //var doc = new jsPDF("landscape");
      const satirdakiSutunAdedi = 5;
      const sutunNo = 10;
      var doc = new jsPDF();
      this.eshasIkiTarihArasi.forEach(sahisIkiTarihArasi => {
        //Üst forEach
        let satirNo = 0;
        doc.setFontSize(14);
        doc.text(sutunNo, 10, sahisIkiTarihArasi[0]);
        let birikenSutun = 0;
        let yazilacakSatirPoz = 12;
        let yazilacakSutunPoz = 0;
        let dikeyCizgiBoyu = 4;
        doc.setFontSize(8);
        yazilacakSutunPoz = sutunNo;
        yazilacakSatirPoz += 3;
        sahisIkiTarihArasi[1].forEach(satir => {
          //Alt forEach
          doc.setFontSize(8);
          satirNo++;
          const yazilacakYazi = " " + satir["Tarih"] + " " + satir["Sahifeler"];
          this.dikeyCizgiCiz(
            doc,
            yazilacakSutunPoz,
            yazilacakSatirPoz - 3,
            dikeyCizgiBoyu
          );
          yazilacakSutunPoz =
            sutunNo + birikenSutun * (yazilacakYazi.length + 8);
          doc.text(yazilacakSutunPoz, yazilacakSatirPoz, yazilacakYazi);
          // yazilacakSutunPoz += yazilacakYazi.length;

          if (birikenSutun === satirdakiSutunAdedi) {
            this.yatayCizgiCiz(
              doc,
              sutunNo,
              yazilacakSatirPoz + 1,
              satirdakiSutunAdedi
            );
            yazilacakSatirPoz += 4;
            birikenSutun = -1;
          }
          birikenSutun++;
        });
        doc.addPage();
      });
      doc.save("Test.pdf");
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
      let sahife = 1;
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
