// -----------------------------------------------------------
// Geliştirilmiş Podcast Oynatıcı Script'i
// -----------------------------------------------------------

// Sayfa tamamen yüklendiğinde tüm script'i çalıştır.
document.addEventListener('DOMContentLoaded', () => {

    const player = document.getElementById('podcast-player');
    const currentTitle = document.getElementById('current-episode-title');
    const episodeList = document.getElementById('episodes');
    const playerContainer = document.querySelector('.player-container');
    const modal = document.getElementById('mandatory-consent-modal');
    const acceptButton = document.getElementById('accept-button');

    // --- ZORUNLU ONAY MODAL İŞLEMLERİ ---
    if (modal && acceptButton) {
        modal.style.display = 'flex';
        acceptButton.addEventListener('click', function() {
            modal.style.display = 'none';
            playerContainer.classList.add('is-active');
        });
    } else {
        playerContainer.classList.add('is-active');
    }

    // --- OYNATICI OLAY DİNLEYİCİLERİ ---
    player.addEventListener('play', function() {
        const title = this.dataset.playingTitle;
        if (title) {
            currentTitle.textContent = "🔊 Şimdi Oynatılıyor: " + title;
        }
    });

    player.addEventListener('pause', function() {
        // HATA DÜZELTİLDİ: Değişken 'title' olarak yeniden tanımlandı.
        const title = this.dataset.playingTitle; 
        if (title) {
            currentTitle.textContent = "⏸️ Durduruldu: " + title;
        }
    });
    
    player.addEventListener('ended', function() {
        const endedTitle = this.dataset.playingTitle;
        currentTitle.innerHTML = `🎧 ${endedTitle} bitti. <br>⏳ Yeni bölüm yükleniyor...`;
        setTimeout(() => {
            initializeRandomPlayback();
        }, 1500);
    });

    // --- RASTGELE BÖLÜM OYNATMA FONKSİYONU ---
    function initializeRandomPlayback() {
        if (audioFiles.length === 0) {
            currentTitle.textContent = "❌ Hata: Ses dosyası listesi boş!";
            return;
        }
        
        let randomIndex = Math.floor(Math.random() * audioFiles.length);
        let randomFile = audioFiles[randomIndex];
        
        const currentSrc = player.src.split('/').pop();
        const randomFileName = randomFile.split('\\').pop();
        
        if (audioFiles.length > 1 && decodeURI(currentSrc) === randomFileName) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * audioFiles.length);
            } while (newIndex === randomIndex);
            randomIndex = newIndex;
            randomFile = audioFiles[randomIndex];
        }

        const fileName = randomFile.split('\\').pop().replace(/\.[^/.]+$/, "").replace(/_/g, ' ');
        
        player.src = randomFile;
        player.dataset.playingTitle = fileName; 
        currentTitle.textContent = "🔄 Rastgele Bölüm Yükleniyor: " + fileName;
        
        player.classList.add('is-visible');
        player.play().catch(error => {
            console.warn("🚫 Otomatik oynatma engellendi.", error);
            currentTitle.textContent = "▶️ Oynatmaya Hazır: " + fileName;
            player.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // --- BÖLÜM LİSTESİNİ OLUŞTURMA ---
    podcastEpisodes.forEach(episode => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${episode.title}</h3>
            <p>${episode.description}</p>
            <button class="play-btn" data-file="${episode.file}" data-title="${episode.title}">Oynat</button>
        `;
        episodeList.appendChild(listItem);
    });

    // --- TÜM "OYNAT" BUTONLARINA OLAY DİNLEYİCİSİ EKLEME ---
    document.querySelectorAll('.play-btn').forEach(button => {
        button.addEventListener('click', function() {
            const filePath = this.getAttribute('data-file');
            const fullTitle = this.getAttribute('data-title');

            // YENİ: "Bölüm X:" kısmını başlıktan kaldırıyoruz.
            const cleanTitle = fullTitle.replace(/Bölüm \d+:\s*/, '').trim();

            player.src = filePath;
            // Oynatıcıya 'Bölüm X:' olmadan, temizlenmiş başlığı atıyoruz.
            player.dataset.playingTitle = cleanTitle; 
            currentTitle.textContent = "⏳ Yükleniyor: " + cleanTitle;

            player.classList.add('is-visible');
            player.play();
            player.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// SES DOSYASI LİSTESİ
const audioFiles = [
    "audio\\Kadastro, Mülkiyet ve Memuriyet Türkiye'de Arazi Yönetiminin Teknik ve Hukuki Labirenti.m4a",
    "audio\\Türkiye'de Tapu, Kadastro ve Mülkiyetin Güvencesi BÖHHBÜY'den 657 Sayılı Memur Kanununa Mevzuatın Anatomisi.m4a",
    "audio\\Medeni Kanunun Temel Taşları Hak Ehliyetinden Mülkiyete, Dijital Dünyanın Yeni Sorunlarına (TMK 4721'in İlkeleri).m4a",
    "audio\\Tapu ve Kadastro Haritalarının Şifreleri 4 Nolu Kararname ve 2025/4 Sayılı Genelge ile Mülkiyet Güvenliğinizin Anatomisi.m4a",
    "audio\\Tapu, Kadastro ve İmar Labirenti Harita, Mülkiyet ve Teknik Mevzuatın Derinlemesine İncelemesi.m4a",
    "audio\\Türkiye'de Arazi ve Mülkiyetin Sınırları Orman, Mera ve Kadastro Kanunlarının Gizemli Dünyası.m4a",
    "audio\\Türkiye'de Arazi ve Orman Sınırları Kadastro, 2B Alanları ve Hukuki Güvenceyi Sağlayan Çetrefilli Süreçler.m4a",
    "audio\\Türkiye'de Arazi ve Orman Sınırları Kadastro, 2B, Mera ve Tapu Güvencesinin Teknik Altyapısı (BÖHHBÜY'den LİHKAB'a).m4a",
    "audio\\Türkiye'de Tapu ve Mülkiyetin Güvencesi Harita ve Planların Yapımı, Kontrolü ve Yanılma Sınırı Sırları.m4a",
    "audio\\Tapu ve Kadastro'nun Röntgeni Cumhurbaşkanlığı Kararnamesi ile Mülkiyet, Dijitalleşme ve Uluslararası Güç.m4a",
    "audio\\Türk Medeni Kanunu'nun Temelleri Başlangıç Hükümleri, Kişilik ve Mülkiyet Kodları.m4a",
    "audio\\Milyonların Kaderini Belirleyen Kanun 657 Sayılı Devlet Memurları Kanunu'nun Özü, Hakları ve Kariyer Yolları.m4a",
    "audio\\Tapudan Zilyetliğe Türkiye'deki Mülkiyetin Haritası ve Kilit Rolü (3402 Sayılı Kadastro Kanunu Derinlemesine İnceleme).m4a",
    "audio\\TKGM'nin Krizi Merkeziyetçi Yapı, Mülkiyet Güvenliği ve Operasyonel Esneklik Dengesi (4 Nolu Kararname Analizi).m4a",
    "audio\\Türk Medeni Kanunu'nda Birey ve Toplum Dengesi Kişilik ve Mülkiyet Haklarının Sınırları Üzerine Kritik Tartışma.m4a",
    "audio\\657 Sayılı Kanun'un Kalbi Tehlikede mi 4B Sözleşmeli Personel İstihdamı Esneklik mi, Liyakati Törpüleyen Bir İstisna mı.m4a",
    "audio\\Türk Medeni Kanunu'nun Temelleri Kişiler Hukuku, Ehliyet Şartları ve Kritik Yaş Sınırları (TMK İlk 55 Madde Analizi).m4a",
    "audio\\Türk Medeni Kanunu'nda Eşya Hukuku Mülkiyetin Sınırları, Kritik Süreler (10 Yıl, 2 Yıl, 15 Gün) ve Komşuluk Sırları (Madde 683-761).m4a",
    "audio\\Medeni Kanun'un Temelleri Kimliğimizden Mülkiyete; Dürüstlük Kuralı, Hakim Takdiri ve Komşuluk Hukuku Sırları.m4a",
    "audio\\E-KADASTRO ve MEGSİS'in Sırları Yüz Yıllık Tapu Verisi Nasıl Dijitalleşip E-İmza ile Onaylanıyor.m4a",
    "audio\\6831 Sayılı Orman Kanunu'nun Anatomisi Orman Ne Demek, 2B Tartışmaları, Yangın Cezaları ve Köylü Destekleri.m4a",
    "audio\\Türkiye'nin Görünmez Anayasası Harita Üretiminin Teknik Sırları, TUREF ve Kalite Kontrolün Önemi.m4a",
    "audio\\Çiftçiyi İlgilendiriyor Arazi Toplulaştırması Yönetmeliği ile Yeni Parsel ve Su Yolları Nasıl Belirleniyor.m4a",
    "audio\\Kadastro Sırasında Mülkiyetinizi Nasıl Paylaşırsınız Ayırma (İfraz) ve Birleştirme (Tevhit) Yönetmeliği Rehberi.m4a",
    "audio\\Mülkiyetin Teminatı 1987 Kadastro Bilirkişileri Yönetmeliği Neleri Değiştirdi, 40 Yıl Sonra Güncelliğini Koruyor Mu.m4a",
    "audio\\Kadastro Sınırı Nasıl Çekilir Arazi, Mülkiyet ve 7 Günlük İtirazın Perde Arkası.m4a",
    "audio\\Tapu Davası Kadastroya Karışırsa Ne Olur Teknik Bir Belgenin Adım Adım İncelenmesi Davalı Taşınmaz Mal Yönetmeliği.m4a",
    "audio\\Resmî Yazışmaların Dijital Dönüşümü Yönetmelik Neleri Değiştirdi (EBYS, E-İmza ve QR Kodun Resmi İletişimdeki Gücü).m4a",
    "audio\\Şehirlerimizi Şekillendiren Kurallar Mekânsal Planlar Yönetmeliği'nin Altın Kuralları ve Afet Direnci.m4a",
    "audio\\Tapu Planlarındaki Gizemli Hata Payı Yanılma Sınırı Yönetmeliği (2022) Ne Diyor ve Parselinizi Nasıl Etkiliyor.m4a",
    "audio\\Tapu Labirenti, Orman Sınırları ve Memuriyetin Kırmızı Çizgileri Türkiye Arazi Yönetiminin Hukuki ve Teknik Anatomisi.m4a",
    "audio\\Kadastro Yönetmeliği A'dan Z'ye Arazi Sınırları, Mülkiyet Tespiti ve Tapu Tescil Süreci Kılavuzu.m4a",
];

// BÖLÜM BİLGİLERİ LİSTESİ
const podcastEpisodes = [
    { 
        title: "Bölüm 1:Kadastro, Mülkiyet ve Memuriyet Türkiye'de Arazi Yönetiminin Teknik ve Hukuki Labirenti", 
        file: "audio\\Kadastro, Mülkiyet ve Memuriyet Türkiye'de Arazi Yönetiminin Teknik ve Hukuki Labirenti.m4a",
        description: "Türkiye'de tescile konu harita ve planların yapımından, kadastro çalışmalarından ve tüm bu süreçleri yürüten devlet memurları mevzuatından oluşan yoğun bir bilgi setini anlaşılır kılıyor." 
    },
    { 
        title: "Bölüm 2: Türkiye'de Tapu, Kadastro ve Mülkiyetin Güvencesi BÖHHBÜY'den 657 Sayılı Memur Kanununa Mevzuatın Anatomisi", 
        file: "audio\\Türkiye'de Tapu, Kadastro ve Mülkiyetin Güvencesi BÖHHBÜY'den 657 Sayılı Memur Kanununa Mevzuatın Anatomisi.m4a",
        description: "Türkiye'deki tapu, kadastro ve mülkiyet güvenliğini düzenleyen teknik standartlar (BÖHHBÜY, TUREF) ile bu hassas sistemi yürüten kamu görevlilerinin hak, sorumluluk ve disiplinlerini belirleyen 657 Sayılı Devlet Memurları Kanunu arasındaki bütüncül ilişki bu özette incelenmektedir." 
    },            
    { 
        title: "Bölüm 3: Medeni Kanunun Temel Taşları Hak Ehliyetinden Mülkiyete, Dijital Dünyanın Yeni Sorunlarına (TMK 4721'in İlkeleri)", 
        file: "audio\\Medeni Kanunun Temel Taşları Hak Ehliyetinden Mülkiyete, Dijital Dünyanın Yeni Sorunlarına (TMK 4721'in İlkeleri).m4a",
        description: "Türk Medeni Kanunu'nun temel ilkeleri (dürüstlük, iyiniyet), hak/fiil ehliyeti kavramları, mülkiyet hakkının kapsamı ve komşuluk hukukundaki sınırlandırmalar derinlemesine analiz edilmektedir." 
    },
    { 
         title: "Bölüm 4: Tapu ve Kadastro Haritalarının Şifreleri 4 Nolu Kararname ve 2025/4 Sayılı Genelge ile Mülkiyet Güvenliğinizin Anatomisi", 
         file: "audio\\Tapu ve Kadastro Haritalarının Şifreleri 4 Nolu Kararname ve 2025/4 Sayılı Genelge ile Mülkiyet Güvenliğinizin Anatomisi.m4a",
         description: "4 Nolu Cumhurbaşkanlığı Kararnamesi ve 2025/4 Sayılı Genelge baz alınarak, Tapu ve Kadastro Genel Müdürlüğü'nün (TKGM) görevleri ve tapuya esas haritaların üretim, kontrol ve tescil süreçleri açıklanmaktadır." 
     },
     { 
         title: "Bölüm 5: Tapu, Kadastro ve İmar Labirenti Harita, Mülkiyet ve Teknik Mevzuatın Derinlemesine İncelemesi", 
         file: "audio\\Tapu, Kadastro ve İmar Labirenti Harita, Mülkiyet ve Teknik Mevzuatın Derinlemesine İncelemesi.m4a",
         description: "Türkiye'deki harita, kadastro, kamulaştırma ve imar planlama işlemlerinin dayandığı teknik ve hukuki mevzuatın karmaşık ağı, temel kavramlar ve uygulamadaki detaylar üzerinden açıklanmaktadır." 
     },
     { 
         title: "Bölüm 6: Türkiye'de Arazi ve Mülkiyetin Sınırları Orman, Mera ve Kadastro Kanunlarının Gizemli Dünyası", 
         file: "audio\\Türkiye'de Arazi ve Mülkiyetin Sınırları Orman, Mera ve Kadastro Kanunlarının Gizemli Dünyası.m4a",
         description: "Kadastro, Orman ve Mera Kanunlarının kesişiminde, orman ve mera sınırlarının nasıl belirlendiği, 2B alanlarının hukuki statüsü ve bu süreçlerdeki teknik/idari zorluklar ele alınmaktadır." 
     },
     { 
         title: "Bölüm 7: Türkiye'de Arazi ve Orman Sınırları Kadastro, 2B Alanları ve Hukuki Güvenceyi Sağlayan Çetrefilli Süreçler", 
         file: "audio\\Türkiye'de Arazi ve Orman Sınırları Kadastro, 2B Alanları ve Hukuki Güvenceyi Sağlayan Çetrefilli Süreçler.m4a",
         description: " 2B alanları, mera ve orman sınırlarının tespiti gibi özel durumlarla birlikte, teknik hataların düzeltilmesi, eski kayıtların güncellenmesi ve kadastro süreçlerindeki hukuki mekanizmaların karmaşıklığını aydınlatmaktadır." 
     },
     { 
         title: "Bölüm 8: Türkiye'de Arazi ve Orman Sınırları Kadastro, 2B, Mera ve Tapu Güvencesinin Teknik Altyapısı (BÖHHBÜY'den LİHKAB'a)", 
         file: "audio\\Türkiye'de Arazi ve Orman Sınırları Kadastro, 2B, Mera ve Tapu Güvencesinin Teknik Altyapısı (BÖHHBÜY'den LİHKAB'a).m4a",
         description: "Büyük Ölçekli Harita Yönetmeliği (BÖHHBÜY) ve Kadastro Kanunu çerçevesinde, orman/mera sınırlarının belirlenmesi, 2B alanlarının durumu ve özel büroların (LİHKAB) mülkiyet güvencesindeki rolü incelenmektedir." 
     },
     { 
         title: "Bölüm 9: Türkiye'de Tapu ve Mülkiyetin Güvencesi Harita ve Planların Yapımı, Kontrolü ve Yanılma Sınırı Sırları", 
         file: "audio\\Türkiye'de Tapu ve Mülkiyetin Güvencesi Harita ve Planların Yapımı, Kontrolü ve Yanılma Sınırı Sırları.m4a",
         description: "Tapu ve mülkiyetin güvence altına alınması, harita ve planların hazırlanması, kontrolü ve yanılma sınırları konularında derinlemesine bir inceleme sunulmaktadır." 
     },
     { 
         title: "Bölüm 10: Tapu ve Kadastro'nun Röntgeni Cumhurbaşkanlığı Kararnamesi ile Mülkiyet, Dijitalleşme ve Uluslararası Güç", 
         file: "audio\\Tapu ve Kadastro'nun Röntgeni Cumhurbaşkanlığı Kararnamesi ile Mülkiyet, Dijitalleşme ve Uluslararası Güç.m4a",
         description: "4 Nolu Cumhurbaşkanlığı Kararnamesi ışığında, Tapu ve Kadastro Genel Müdürlüğü'nün (TKGM) görevleri ve tapuya esas haritaların üretim, kontrol ve tescil süreçleri açıklanmaktadır." 
     },
     { 
         title: "Bölüm 11: Türk Medeni Kanunu'nun Temelleri Başlangıç Hükümleri, Kişilik ve Mülkiyet Kodları", 
         file: "audio\\Türk Medeni Kanunu'nun Temelleri Başlangıç Hükümleri, Kişilik ve Mülkiyet Kodları.m4a",
         description: "Türk Medeni Kanunu'nun başlangıç hükümleri, hak ve fiil ehliyeti, kişilik haklarının korunması ve mülkiyetin içeriği ile sınırlandırmaları gibi temel kavramları analiz etmektedir." 
     },
     { 
         title: "Bölüm 12: Milyonların Kaderini Belirleyen Kanun 657 Sayılı Devlet Memurları Kanunu'nun Özü, Hakları ve Kariyer Yolları", 
         file: "audio\\Milyonların Kaderini Belirleyen Kanun 657 Sayılı Devlet Memurları Kanunu'nun Özü, Hakları ve Kariyer Yolları.m4a",
         description: "657 Sayılı Devlet Memurları Kanunu'nun kapsamını, memurların temel haklarını, sorumluluklarını, uymaları gereken yasakları, sınıflandırmayı ve kariyer ilerleme sistemini detaylandırmaktadır." 
     },
     { 
         title: "Bölüm 13: Tapudan Zilyetliğe Türkiye'deki Mülkiyetin Haritası ve Kilit Rolü (3402 Sayılı Kadastro Kanunu Derinlemesine İnceleme)", 
         file: "audio\\Tapudan Zilyetliğe Türkiye'deki Mülkiyetin Haritası ve Kilit Rolü (3402 Sayılı Kadastro Kanunu Derinlemesine İnceleme).m4a",
         description: "3402 Sayılı Kadastro Kanunu çerçevesinde bir arazinin kadastrosunun nasıl yapıldığını, mülkiyetin tespiti için zilliyetlik (fiili kullanım), eski belge ve zaman aşımı kurallarının nasıl uygulandığını açıklamaktadır." 
     },    
     { 
         title: "Bölüm 14: TKGM'nin Krizi Merkeziyetçi Yapı, Mülkiyet Güvenliği ve Operasyonel Esneklik Dengesi (4 Nolu Kararname Analizi)", 
         file: "audio\\TKGM'nin Krizi Merkeziyetçi Yapı, Mülkiyet Güvenliği ve Operasyonel Esneklik Dengesi (4 Nolu Kararname Analizi).m4a",
         description: "4 Nolu Cumhurbaşkanlığı Kararnamesi üzerinden TKGM'nin merkeziyetçi yapısı, ulusal mülkiyet güvenliği hedefleri ile operasyonel esneklik ve yetki devri ihtiyacı arasındaki denge tartışılmaktadır." 
     },    
     { 
         title: "Bölüm 15: Türk Medeni Kanunu'nda Birey ve Toplum Dengesi Kişilik ve Mülkiyet Haklarının Sınırları Üzerine Kritik Tartışma", 
         file: "audio\\Türk Medeni Kanunu'nda Birey ve Toplum Dengesi Kişilik ve Mülkiyet Haklarının Sınırları Üzerine Kritik Tartışma.m4a",
         description: "Türk Medeni Kanunu'ndaki kişilik hakları ve mülkiyet hakkı gibi temel ilkelerin, toplumsal düzen, iyi niyet ve komşuluk hukuku gibi soyut normlar karşısındaki bireysel özgürlük sınırlarını ne ölçüde koruduğu ele alınmaktadır." 
     },    
     { 
         title: "Bölüm 16: 657 Sayılı Kanun'un Kalbi Tehlikede mi 4B Sözleşmeli Personel İstihdamı Esneklik mi, Liyakati Törpüleyen Bir İstisna mı", 
         file: "audio\\657 Sayılı Kanun'un Kalbi Tehlikede mi 4B Sözleşmeli Personel İstihdamı Esneklik mi, Liyakati Törpüleyen Bir İstisna mı.m4a",
         description: "657 Sayılı Devlet Memurları Kanunu'nun temelinde, sözleşmeli (4B) personel istihdamının kamu yönetiminin esneklik ihtiyacını karşılayıp karşılamadığı ve memuriyetin temel ilkelerini nasıl etkilediği tartışılmaktadır." 
     },
     { 
         title: "Bölüm 17: Türk Medeni Kanunu'nun Temelleri Kişiler Hukuku, Ehliyet Şartları ve Kritik Yaş Sınırları (TMK İlk 55 Madde Analizi)", 
         file: "audio\\Türk Medeni Kanunu'nun Temelleri Kişiler Hukuku, Ehliyet Şartları ve Kritik Yaş Sınırları (TMK İlk 55 Madde Analizi).m4a",
         description: "Türk Medeni Kanunu'nun (TMK) başlangıç hükümleri, hak ve fiil ehliyeti, ayırt etme gücü, erginlik ve kısıtlama gibi kişilik hukukunun temel kavramlarını ve kritik yaş sınırlarını analiz etmektedir." 
     },
     { 
         title: "Bölüm 18: Türk Medeni Kanunu'nda Eşya Hukuku Mülkiyetin Sınırları, Kritik Süreler (10 Yıl, 2 Yıl, 15 Gün) ve Komşuluk Sırları (Madde 683-761)", 
         file: "audio\\Türk Medeni Kanunu'nda Eşya Hukuku Mülkiyetin Sınırları, Kritik Süreler (10 Yıl, 2 Yıl, 15 Gün) ve Komşuluk Sırları (Madde 683-761).m4a",
         description: "TMK'daki mülkiyet hakkının geniş kapsamını (bütünleyici parça, eklenti), istihkak davası, komşuluk hukukundan doğan sınırlamalar ve mülkiyetle ilgili 10 yıl gibi kritik hak düşürücü süreleri incelemektedir." 
     },
     { 
         title: "Bölüm 19: Medeni Kanun'un Temelleri Kimliğimizden Mülkiyete; Dürüstlük Kuralı, Hakim Takdiri ve Komşuluk Hukuku Sırları", 
         file: "audio\\Medeni Kanun'un Temelleri Kimliğimizden Mülkiyete; Dürüstlük Kuralı, Hakim Takdiri ve Komşuluk Hukuku Sırları.m4a",
         description: "Türk Medeni Kanunu'nun başlangıç hükümlerinde yer alan dürüstlük kuralı, hakimin takdir yetkisi ve mülkiyet üzerindeki komşuluk hukukunun getirdiği temel yükümlülükleri incelemektedir." 
     },
     { 
         title: "Bölüm 20: E-KADASTRO ve MEGSİS'in Sırları Yüz Yıllık Tapu Verisi Nasıl Dijitalleşip E-İmza ile Onaylanıyor", 
         file: "audio\\E-KADASTRO ve MEGSİS'in Sırları Yüz Yıllık Tapu Verisi Nasıl Dijitalleşip E-İmza ile Onaylanıyor.m4a",
         description: "Tapu ve kadastro kayıtlarının (E-KADASTRO) dijital ortama aktarılması (sayısallaştırma), Mekansal Gayrimenkul Bilgi Sistemi (MEGSİS) ile entegrasyonu ve elektronik imza (E-İmza) ile onaylanma süreçlerini anlatmaktadır." 
     },
     { 
         title: "Bölüm 21: 6831 Sayılı Orman Kanunu'nun Anatomisi Orman Ne Demek, 2B Tartışmaları, Yangın Cezaları ve Köylü Destekleri", 
         file: "audio\\6831 Sayılı Orman Kanunu'nun Anatomisi Orman Ne Demek, 2B Tartışmaları, Yangın Cezaları ve Köylü Destekleri.m4a",
         description: "6831 Sayılı Orman Kanunu'nun orman tanımını, 2B arazileriyle ilgili karmaşık hukuki süreçleri, orman yangınlarına karşı uygulanan cezaları ve orman köylüsünü destekleme mekanizmalarını detaylıca incelemektedir." 
     },
     { 
         title: "Bölüm 22: Türkiye'nin Görünmez Anayasası Harita Üretiminin Teknik Sırları, TUREF ve Kalite Kontrolün Önemi", 
         file: "audio\\Türkiye'nin Görünmez Anayasası Harita Üretiminin Teknik Sırları, TUREF ve Kalite Kontrolün Önemi.m4a",
         description: "Türkiye'de büyük ölçekli harita üretiminin teknik standartlarını belirleyen yönetmelikleri, koordinat sistemlerinin (TUREF) rolünü ve kadastro işlemlerindeki kalite kontrol süreçlerinin hayati önemini açıklamaktadır." 
     },
     { 
         title: "Bölüm 23: Çiftçiyi İlgilendiriyor Arazi Toplulaştırması Yönetmeliği ile Yeni Parsel ve Su Yolları Nasıl Belirleniyor", 
         file: "audio\\Çiftçiyi İlgilendiriyor Arazi Toplulaştırması Yönetmeliği ile Yeni Parsel ve Su Yolları Nasıl Belirleniyor.m4a",
         description: " Arazi Toplulaştırması Yönetmeliği'nin temel amaçlarını, dağıtılacak yeni parselasyon alanlarının nasıl belirlendiğini, tarla içi geliştirme hizmetlerini ve sulama tesislerinin kurulma süreçlerini açıklamaktadır." 
     },
     { 
         title: "Bölüm 24: Kadastro Sırasında Mülkiyetinizi Nasıl Paylaşırsınız Ayırma (İfraz) ve Birleştirme (Tevhit) Yönetmeliği Rehberi", 
         file: "audio\\Kadastro Sırasında Mülkiyetinizi Nasıl Paylaşırsınız Ayırma (İfraz) ve Birleştirme (Tevhit) Yönetmeliği Rehberi.m4a",
         description: "Kadastro ve İmar Kanunları çerçevesinde bir taşınmazın parçalara ayrılması (ifraz) veya birden fazla taşınmazın birleştirilmesi (tevhit) işlemlerinin teknik ve hukuki usullerini anlatmaktadır." 
     },
     { 
         title: "Bölüm 25: Mülkiyetin Teminatı 1987 Kadastro Bilirkişileri Yönetmeliği Neleri Değiştirdi, 40 Yıl Sonra Güncelliğini Koruyor Mu", 
         file: "audio\\Mülkiyetin Teminatı 1987 Kadastro Bilirkişileri Yönetmeliği Neleri Değiştirdi, 40 Yıl Sonra Güncelliğini Koruyor Mu.m4a",
         description: "1987 tarihli Kadastro Bilirkişileri Yönetmeliği'nin kimleri bilirkişi olarak atadığını, görevlerini ve zamanın şartları karşısında güncel hukuki etki alanını tartışmaktadır." 
     },
     { 
         title: "Bölüm 26: Kadastro Sınırı Nasıl Çekilir Arazi, Mülkiyet ve 7 Günlük İtirazın Perde Arkası", 
         file: "audio\\Kadastro Sınırı Nasıl Çekilir Arazi, Mülkiyet ve 7 Günlük İtirazın Perde Arkası.m4a",
         description: "Kadastro tespit ekiplerinin sahada mülkiyet sınırlarını nasıl belirlediği, bu süreçte bilirkişi ve muhtarın rolü, teknik çizimler ile 7 günlük itiraz hakkının hukuki önemini açıklamaktadır." 
     },
     { 
         title: "Bölüm 27: Tapu Davası Kadastroya Karışırsa Ne Olur Teknik Bir Belgenin Adım Adım İncelenmesi Davalı Taşınmaz Mal Yönetmeliği", 
         file: "audio\\Tapu Davası Kadastroya Karışırsa Ne Olur Teknik Bir Belgenin Adım Adım İncelenmesi Davalı Taşınmaz Mal Yönetmeliği.m4a",
         description: "Kadastro süreci devam ederken açılan tapu davalarının nasıl yönetileceğini ve Davalı Taşınmaz Mal Yönetmeliği'nin teknik belgeleri, yargı süreçlerini ve mülkiyet tespitini adım adım nasıl etkilediğini incelemektedir." 
     },
     { 
         title: "Bölüm 28: Resmî Yazışmaların Dijital Dönüşümü Yönetmelik Neleri Değiştirdi (EBYS, E-İmza ve QR Kodun Resmi İletişimdeki Gücü)", 
         file: "audio\\Resmî Yazışmaların Dijital Dönüşümü Yönetmelik Neleri Değiştirdi (EBYS, E-İmza ve QR Kodun Resmi İletişimdeki Gücü).m4a",
         description: "Resmî yazışmaların kurallarını yeniden belirleyen yönetmeliğin, kurumlar arası evrak alışverişinde Elektronik Belge Yönetim Sistemlerinin (EBYS) zorunluluğunu, e-imza kullanımını ve QR kodun resmi iletişimdeki rolünü anlatmaktadır." 
     },
     { 
         title: "Bölüm 29: Şehirlerimizi Şekillendiren Kurallar Mekânsal Planlar Yönetmeliği'nin Altın Kuralları ve Afet Direnci", 
         file: "audio\\Şehirlerimizi Şekillendiren Kurallar Mekânsal Planlar Yönetmeliği'nin Altın Kuralları ve Afet Direnci.m4a",
         description: "Mekânsal Planlar Yapım Yönetmeliği'nin amaçlarını, planlama hiyerarşisini, planlama sürecinde gereken detaylı analizleri ve planların özellikle afet risklerine karşı dirençli olma gerekliliğini vurgulamaktadır." 
     },
     { 
         title: "Bölüm 30: Tapu Planlarındaki Gizemli Hata Payı Yanılma Sınırı Yönetmeliği (2022) Ne Diyor ve Parselinizi Nasıl Etkiliyor", 
         file: "audio\\Tapu Planlarındaki Gizemli Hata Payı Yanılma Sınırı Yönetmeliği (2022) Ne Diyor ve Parselinizi Nasıl Etkiliyor.m4a",
         description: "2022 tarihli Yanılma Sınırı Yönetmeliği'nin getirdiği teknik toleranslar, ölçüm hatalarından kaynaklanan küçük farkların hukuken hata sayılmama şartlarını ve bu durumun parselinizin yüzölçümünü nasıl etkilediğini açıklamaktadır." 
     },
     { 
         title: "Bölüm 31: Tapu Labirenti, Orman Sınırları ve Memuriyetin Kırmızı Çizgileri Türkiye Arazi Yönetiminin Hukuki ve Teknik Anatomisi", 
         file: "audio\\Tapu Labirenti, Orman Sınırları ve Memuriyetin Kırmızı Çizgileri Türkiye Arazi Yönetiminin Hukuki ve Teknik Anatomisi.m4a",
         description: "Türkiye'deki arazi yönetimi ve mülkiyet güvenliğinin temellerini, orman ve 2B sınırlarının hukuki belirlenme zorluklarını ve kamu görevlilerinin (657 Sayılı Kanun) uyması gereken etik ve teknik kuralları kapsamlı bir şekilde analiz etmektedir." 
     },
     { 
         title: "Bölüm 32: Kadastro Yönetmeliği A'dan Z'ye Arazi Sınırları, Mülkiyet Tespiti ve Tapu Tescil Süreci Kılavuzu", 
         file: "audio\\Kadastro Yönetmeliği A'dan Z'ye Arazi Sınırları, Mülkiyet Tespiti ve Tapu Tescil Süreci Kılavuzu.m4a",
         description: "Kadastro Yönetmeliği'nin tüm süreçlerini, kadastro ekiplerinin arazi sınırlarını ve mülkiyet durumunu nasıl tespit ettiğini, teknik kayıtların nasıl düzenlendiğini ve tapu siciline tescil işlemlerinin adım adım nasıl gerçekleştiğini anlatmaktadır." 
     },
     
    /* Yeni özetlerinizi buraya ekleyin:

     { 
         title: "Bölüm x: Başlık", 
         file: "audio/yeni-ozet.m4a",
         description: "Yeni özetin kısa açıklaması." 
     },
    */
];

// Oynatıcıyı görünür yap ve animasyonu başlat
document.querySelector('.player-container').classList.add('is-active');