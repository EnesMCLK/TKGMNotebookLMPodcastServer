// -----------------------------------------------------------
// Geliştirilmiş Podcast Oynatıcı Script'i (Otomatik Geçişli)
// -----------------------------------------------------------

// SES DOSYASI LİSTESİ
const audioFiles = [
    "audio\\Türkiye'de Tapu ve Mülkiyetin Güvencesi Harita ve Planların Yapımı, Kontrolü ve Yanılma Sınırı Sırları.m4a",
    "audio\\Kadastro, Mülkiyet ve Memuriyet Türkiye'de Arazi Yönetiminin Teknik ve Hukuki Labirenti.m4a",
    "audio\\Medeni Kanunun Temel Taşları Hak Ehliyetinden Mülkiyete, Dijital Dünyanın Yeni Sorunlarına (TMK 4721'in İlkeleri).m4a",
    "audio\\Tapu ve Kadastro Haritalarının Şifreleri 4 Nolu Kararname ve 2025/4 Sayılı Genelge ile Mülkiyet Güvenliğinizin Anatomisi.m4a",
    "audio\\Tapu, Kadastro ve İmar Labirenti Harita, Mülkiyet ve Teknik Mevzuatın Derinlemesine İncelemesi.m4a",
    "audio\\Türkiye'de Arazi ve Mülkiyetin Sınırları Orman, Mera ve Kadastro Kanunlarının Gizemli Dünyası.m4a",
    "audio\\Türkiye'de Arazi ve Orman Sınırları Kadastro, 2B Alanları ve Hukuki Güvenceyi Sağlayan Çetrefilli Süreçler.m4a",
    "audio\\Türkiye'de Arazi ve Orman Sınırları Kadastro, 2B, Mera ve Tapu Güvencesinin Teknik Altyapısı (BÖHHBÜY'den LİHKAB'a).m4a",
    "audio\\Türkiye'de Tapu ve Mülkiyetin Güvencesi Harita ve Planların Yapımı, Kontrolü ve Yanılma Sınırı Sırları.m4a",
    "audio\\Türkiye'de Tapu, Kadastro ve Mülkiyetin Güvencesi BÖHHBÜY'den 657 Sayılı Memur Kanununa Mevzuatın Anatomisi.m4a",
    "audio\\Tapu ve Kadastro'nun Röntgeni Cumhurbaşkanlığı Kararnamesi ile Mülkiyet, Dijitalleşme ve Uluslararası Güç.m4a",
    "audio\\Türk Medeni Kanunu'nun Temelleri Başlangıç Hükümleri, Kişilik ve Mülkiyet Kodları.m4a",
    "audio\\Milyonların Kaderini Belirleyen Kanun 657 Sayılı Devlet Memurları Kanunu'nun Özü, Hakları ve Kariyer Yolları.m4a",
    "audio\\Tapudan Zilyetliğe Türkiye'deki Mülkiyetin Haritası ve Kilit Rolü (3402 Sayılı Kadastro Kanunu Derinlemesine İnceleme).m4a",
    "audio\\TKGM'nin Krizi Merkeziyetçi Yapı, Mülkiyet Güvenliği ve Operasyonel Esneklik Dengesi (4 Nolu Kararname Analizi).m4a",
    "audio\\Türk Medeni Kanunu'nda Birey ve Toplum Dengesi Kişilik ve Mülkiyet Haklarının Sınırları Üzerine Kritik Tartışma.m4a",
    "audio\\657 Sayılı Kanun'un Kalbi Tehlikede mi 4B Sözleşmeli Personel İstihdamı Esneklik mi, Liyakati Törpüleyen Bir İstisna mı.m4a"
];

// BÖLÜM BİLGİLERİ LİSTESİ
const podcastEpisodes = [
    { 
        title: "Bölüm 1:Kadastro, Mülkiyet ve Memuriyet Türkiye'de Arazi Yönetiminin Teknik ve Hukuki Labirenti", 
        file: "audio/Kadastro, Mülkiyet ve Memuriyet Türkiye'de Arazi Yönetiminin Teknik ve Hukuki Labirenti.m4a",
        description: "Türkiye'de tescile konu harita ve planların yapımından, kadastro çalışmalarından ve tüm bu süreçleri yürüten devlet memurları mevzuatından oluşan yoğun bir bilgi setini anlaşılır kılıyor." 
    },
    { 
        title: "Bölüm 2: Türkiye'de Tapu, Kadastro ve Mülkiyetin Güvencesi BÖHHBÜY'den 657 Sayılı Memur Kanununa Mevzuatın Anatomisi", 
        file: "audio/Türkiye'de Tapu, Kadastro ve Mülkiyetin Güvencesi BÖHHBÜY'den 657 Sayılı Memur Kanununa Mevzuatın Anatomisi.m4a",
        description: "Türkiye'deki tapu, kadastro ve mülkiyet güvenliğini düzenleyen teknik standartlar (BÖHHBÜY, TUREF) ile bu hassas sistemi yürüten kamu görevlilerinin hak, sorumluluk ve disiplinlerini belirleyen 657 Sayılı Devlet Memurları Kanunu arasındaki bütüncül ilişki bu özette incelenmektedir." 
    },            
    { 
        title: "Bölüm 3: Medeni Kanunun Temel Taşları Hak Ehliyetinden Mülkiyete, Dijital Dünyanın Yeni Sorunlarına (TMK 4721'in İlkeleri)", 
        file: "audio/Medeni Kanunun Temel Taşları Hak Ehliyetinden Mülkiyete, Dijital Dünyanın Yeni Sorunlarına (TMK 4721'in İlkeleri).m4a",
        description: "Türk Medeni Kanunu'nun temel ilkeleri (dürüstlük, iyiniyet), hak/fiil ehliyeti kavramları, mülkiyet hakkının kapsamı ve komşuluk hukukundaki sınırlandırmalar derinlemesine analiz edilmektedir." 
    },
    { 
         title: "Bölüm 4: Tapu ve Kadastro Haritalarının Şifreleri 4 Nolu Kararname ve 2025/4 Sayılı Genelge ile Mülkiyet Güvenliğinizin Anatomisi", 
         file: "audio/Tapu ve Kadastro Haritalarının Şifreleri 4 Nolu Kararname ve 2025/4 Sayılı Genelge ile Mülkiyet Güvenliğinizin Anatomisi.m4a",
         description: "4 Nolu Cumhurbaşkanlığı Kararnamesi ve 2025/4 Sayılı Genelge baz alınarak, Tapu ve Kadastro Genel Müdürlüğü'nün (TKGM) görevleri ve tapuya esas haritaların üretim, kontrol ve tescil süreçleri açıklanmaktadır." 
     },
     { 
         title: "Bölüm 5: Tapu, Kadastro ve İmar Labirenti Harita, Mülkiyet ve Teknik Mevzuatın Derinlemesine İncelemesi", 
         file: "audio/Tapu, Kadastro ve İmar Labirenti Harita, Mülkiyet ve Teknik Mevzuatın Derinlemesine İncelemesi.m4a",
         description: "Türkiye'deki harita, kadastro, kamulaştırma ve imar planlama işlemlerinin dayandığı teknik ve hukuki mevzuatın karmaşık ağı, temel kavramlar ve uygulamadaki detaylar üzerinden açıklanmaktadır." 
     },
     { 
         title: "Bölüm 6: Türkiye'de Arazi ve Mülkiyetin Sınırları Orman, Mera ve Kadastro Kanunlarının Gizemli Dünyası", 
         file: "audio/Türkiye'de Arazi ve Mülkiyetin Sınırları Orman, Mera ve Kadastro Kanunlarının Gizemli Dünyası.m4a",
         description: "Kadastro, Orman ve Mera Kanunlarının kesişiminde, orman ve mera sınırlarının nasıl belirlendiği, 2B alanlarının hukuki statüsü ve bu süreçlerdeki teknik/idari zorluklar ele alınmaktadır." 
     },
     { 
         title: "Bölüm 7: Türkiye'de Arazi ve Orman Sınırları Kadastro, 2B Alanları ve Hukuki Güvenceyi Sağlayan Çetrefilli Süreçler", 
         file: "audio/Türkiye'de Arazi ve Orman Sınırları Kadastro, 2B Alanları ve Hukuki Güvenceyi Sağlayan Çetrefilli Süreçler.m4a",
         description: " 2B alanları, mera ve orman sınırlarının tespiti gibi özel durumlarla birlikte, teknik hataların düzeltilmesi, eski kayıtların güncellenmesi ve kadastro süreçlerindeki hukuki mekanizmaların karmaşıklığını aydınlatmaktadır." 
     },
     { 
         title: "Bölüm 8: Türkiye'de Arazi ve Orman Sınırları Kadastro, 2B, Mera ve Tapu Güvencesinin Teknik Altyapısı (BÖHHBÜY'den LİHKAB'a)", 
         file: "audio/Türkiye'de Arazi ve Orman Sınırları Kadastro, 2B, Mera ve Tapu Güvencesinin Teknik Altyapısı (BÖHHBÜY'den LİHKAB'a).m4a",
         description: "Büyük Ölçekli Harita Yönetmeliği (BÖHHBÜY) ve Kadastro Kanunu çerçevesinde, orman/mera sınırlarının belirlenmesi, 2B alanlarının durumu ve özel büroların (LİHKAB) mülkiyet güvencesindeki rolü incelenmektedir." 
     },
     { 
         title: "Bölüm 9: Türkiye'de Tapu ve Mülkiyetin Güvencesi Harita ve Planların Yapımı, Kontrolü ve Yanılma Sınırı Sırları", 
         file: "audio/Türkiye'de Tapu ve Mülkiyetin Güvencesi Harita ve Planların Yapımı, Kontrolü ve Yanılma Sınırı Sırları.m4a",
         description: "Tapu ve mülkiyetin güvence altına alınması, harita ve planların hazırlanması, kontrolü ve yanılma sınırları konularında derinlemesine bir inceleme sunulmaktadır." 
     },
     { 
         title: "Bölüm 10: Tapu ve Kadastro'nun Röntgeni Cumhurbaşkanlığı Kararnamesi ile Mülkiyet, Dijitalleşme ve Uluslararası Güç", 
         file: "audio/Tapu ve Kadastro'nun Röntgeni Cumhurbaşkanlığı Kararnamesi ile Mülkiyet, Dijitalleşme ve Uluslararası Güç.m4a",
         description: "4 Nolu Cumhurbaşkanlığı Kararnamesi ışığında, Tapu ve Kadastro Genel Müdürlüğü'nün (TKGM) görevleri ve tapuya esas haritaların üretim, kontrol ve tescil süreçleri açıklanmaktadır." 
     },
     { 
         title: "Bölüm 11: Türk Medeni Kanunu'nun Temelleri Başlangıç Hükümleri, Kişilik ve Mülkiyet Kodları", 
         file: "audio/Türk Medeni Kanunu'nun Temelleri Başlangıç Hükümleri, Kişilik ve Mülkiyet Kodları.m4a",
         description: "Türk Medeni Kanunu'nun başlangıç hükümleri, hak ve fiil ehliyeti, kişilik haklarının korunması ve mülkiyetin içeriği ile sınırlandırmaları gibi temel kavramları analiz etmektedir." 
     },
     { 
         title: "Bölüm 12: Milyonların Kaderini Belirleyen Kanun 657 Sayılı Devlet Memurları Kanunu'nun Özü, Hakları ve Kariyer Yolları", 
         file: "audio/Milyonların Kaderini Belirleyen Kanun 657 Sayılı Devlet Memurları Kanunu'nun Özü, Hakları ve Kariyer Yolları.m4a",
         description: "657 Sayılı Devlet Memurları Kanunu'nun kapsamını, memurların temel haklarını, sorumluluklarını, uymaları gereken yasakları, sınıflandırmayı ve kariyer ilerleme sistemini detaylandırmaktadır." 
     },
     { 
         title: "Bölüm 13: Tapudan Zilyetliğe Türkiye'deki Mülkiyetin Haritası ve Kilit Rolü (3402 Sayılı Kadastro Kanunu Derinlemesine İnceleme)", 
         file: "audio/Tapudan Zilyetliğe Türkiye'deki Mülkiyetin Haritası ve Kilit Rolü (3402 Sayılı Kadastro Kanunu Derinlemesine İnceleme).m4a",
         description: "3402 Sayılı Kadastro Kanunu çerçevesinde bir arazinin kadastrosunun nasıl yapıldığını, mülkiyetin tespiti için zilliyetlik (fiili kullanım), eski belge ve zaman aşımı kurallarının nasıl uygulandığını açıklamaktadır." 
     },    
     { 
         title: "Bölüm 14: TKGM'nin Krizi Merkeziyetçi Yapı, Mülkiyet Güvenliği ve Operasyonel Esneklik Dengesi (4 Nolu Kararname Analizi)", 
         file: "audio/TKGM'nin Krizi Merkeziyetçi Yapı, Mülkiyet Güvenliği ve Operasyonel Esneklik Dengesi (4 Nolu Kararname Analizi).m4a",
         description: "4 Nolu Cumhurbaşkanlığı Kararnamesi üzerinden TKGM'nin merkeziyetçi yapısı, ulusal mülkiyet güvenliği hedefleri ile operasyonel esneklik ve yetki devri ihtiyacı arasındaki denge tartışılmaktadır." 
     },    
     { 
         title: "Bölüm 15: Türk Medeni Kanunu'nda Birey ve Toplum Dengesi Kişilik ve Mülkiyet Haklarının Sınırları Üzerine Kritik Tartışma", 
         file: "audio/Türk Medeni Kanunu'nda Birey ve Toplum Dengesi Kişilik ve Mülkiyet Haklarının Sınırları Üzerine Kritik Tartışma.m4a",
         description: "Türk Medeni Kanunu'ndaki kişilik hakları ve mülkiyet hakkı gibi temel ilkelerin, toplumsal düzen, iyi niyet ve komşuluk hukuku gibi soyut normlar karşısındaki bireysel özgürlük sınırlarını ne ölçüde koruduğu ele alınmaktadır." 
     },    
     { 
         title: "Bölüm 16: 657 Sayılı Kanun'un Kalbi Tehlikede mi 4B Sözleşmeli Personel İstihdamı Esneklik mi, Liyakati Törpüleyen Bir İstisna mı", 
         file: "audio/657 Sayılı Kanun'un Kalbi Tehlikede mi 4B Sözleşmeli Personel İstihdamı Esneklik mi, Liyakati Törpüleyen Bir İstisna mı.m4a",
         description: "657 Sayılı Devlet Memurları Kanunu'nun temelinde, sözleşmeli (4B) personel istihdamının kamu yönetiminin esneklik ihtiyacını karşılayıp karşılamadığı ve memuriyetin temel ilkelerini nasıl etkilediği tartışılmaktadır." 
     },
     
    /* Yeni özetlerinizi buraya ekleyin:

     { 
         title: "Bölüm x: Başlık", 
         file: "audio/yeni-ozet.m4a",
         description: "Yeni özetin kısa açıklaması." 
     },
    */
];


// Sayfa tamamen yüklendiğinde tüm script'i çalıştır.
document.addEventListener('DOMContentLoaded', () => {

    const player = document.getElementById('podcast-player');
    const currentTitle = document.getElementById('current-episode-title');
    const episodeList = document.getElementById('episodes');

    // --- OYNATICI OLAY DİNLEYİCİLERİ ---
    
    // Oynatma başladığında başlığı güncelle
    player.addEventListener('play', function() {
        const playingTitle = this.dataset.playingTitle;
        if (playingTitle) {
            currentTitle.textContent = "🔊 Şimdi Oynatılıyor: " + playingTitle;
        }
    });

    // Duraklatıldığında başlığı güncelle
    player.addEventListener('pause', function() {
        const pausedTitle = this.dataset.playingTitle;
        if (pausedTitle) {
            currentTitle.textContent = "⏸️ Durduruldu: " + pausedTitle;
        }
    });
    
    // *** YENİ: Bölüm bittiğinde rastgele yeni bir bölüm başlat ***
    player.addEventListener('ended', function() {
        const endedTitle = this.dataset.playingTitle;
        currentTitle.innerHTML = `🎧 ${endedTitle} bitti. <br>⏳ Yeni bölüm yükleniyor...`;
        
        // Kısa bir bekleme süresi sonrası yeni bölümü başlatmak daha iyi bir kullanıcı deneyimi sunabilir.
        setTimeout(() => {
            initializeRandomPlayback();
        }, 1500); // 1.5 saniye bekle
    });

    // --- RASTGELE BÖLÜM OYNATMA FONKSİYONU ---
    function initializeRandomPlayback() {
        if (audioFiles.length === 0) {
            currentTitle.textContent = "Hata: Ses dosyası listesi boş!";
            return;
        }
        
        let randomIndex = Math.floor(Math.random() * audioFiles.length);
        let randomFile = audioFiles[randomIndex];
        
        // O an çalan bölümün tekrar seçilmesini engelle
        const currentSrc = player.src.split('/').pop();
        const randomFileName = randomFile.split('\\').pop();
        
        // Eğer aynı dosya seçildiyse, liste uzunluğu 1'den büyükse yeni bir tane seç
        if (audioFiles.length > 1 && decodeURI(currentSrc) === randomFileName) {
            // Farklı bir index bulana kadar tekrar dene
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * audioFiles.length);
            } while (newIndex === randomIndex);
            randomIndex = newIndex;
            randomFile = audioFiles[randomIndex];
        }

        const fileName = randomFile.split('\\').pop().replace(/\.[^/.]+$/, "").replace(/_/g, ' ');
        
        player.src = randomFile;
        // Oynatıcıya mevcut bölümün adını bir 'data' attribute olarak ekle
        player.dataset.playingTitle = fileName; 
        
        currentTitle.textContent = "Rastgele Bölüm Yükleniyor: " + fileName;
        
        player.play()
            .then(() => {
                // Başarılı oynatma durumunda 'play' olayı başlığı zaten güncelleyecektir.
                console.log("Otomatik oynatma başarılı.");
            })
            .catch(error => {
                // Otomatik oynatma tarayıcı tarafından engellendiğinde
                console.warn("Otomatik oynatma engellendi.", error);
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
            const title = this.getAttribute('data-title');
            
            player.src = filePath;
            // Oynatıcıya seçilen bölümün adını 'data' attribute olarak ata
            player.dataset.playingTitle = title;
            
            currentTitle.textContent = "Yükleniyor: " + title;
            
            player.play();
            
            player.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- BAŞLANGIÇ ---
    // Sayfa yüklendiğinde rastgele bir bölümü başlatmayı dene
    initializeRandomPlayback();

});