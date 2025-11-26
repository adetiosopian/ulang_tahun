<script setup>
import { ref, onMounted } from 'vue';
import hpyAudio from '../assets/hpy.mp3'

const bgm = ref(null)

onMounted(() => {
  if (localStorage.getItem('userClicked') === 'true') {
    bgm.value.play()
      .then(() => console.log('Audio berjalan!'))
      .catch(err => console.log('Audio diblokir browser:', err))
  }
})

const lapis = ref([
  { color: 'bg-gray-300 h-7' },
  { color: 'bg-yellow-300 h-7' },
  { color: 'bg-pink-400 h-7' },
  { color: 'bg-purple-400 h-7' },
]);

const layers = ref([]);
const lilin = ref(null);
const textEl = ref(null);
const textEl2 = ref(null);

onMounted(() => {
  setTimeout(() => {
    layers.value.forEach(el => el.classList.add('active'));
    lilin.value.classList.add('active');
    textEl.value.classList.add('active');
    textEl2.value.classList.add('active');
  }, 50);
});


onMounted(() => {
  const cards = document.querySelectorAll('.photo-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.2 } // 20% elemen terlihat → animasi mulai
  );

  cards.forEach(card => observer.observe(card));
});

</script>

<template>
  <div class="grid mb-10 justify-items-center w-screen h-[60vh] relative border border-gray-300 rounded-lg bg-gray-50 overflow-hidden">

    <div 
      v-for="(layer,i) in lapis"
      :key="i"
      class="absolute bottom-0 rounded-t-xl layer-drop"
      :class="layer.color"
      :style="{
        bottom: `${i * 27}px`,
        width: `${200 - i * 30}px`,
        transitionDelay: `${i * 250}ms`
      }"
      ref="layers"
    ></div>

    <img
      src="../assets/Untitled_design-removebg-preview.png"
      class="absolute left-1/2 -translate-x-1/2 w-[90px] layer-drop"
      :style="{
        bottom: `${lapis.length * 23}px`,
        transitionDelay: `${lapis.length * 250}ms`
      }"
      ref="lilin"
    />

    <!-- Tulisan melengkung -->
    <svg 
      class="absolute left-1/2 -translate-x-1/2 fade-slide"
      width="300" 
      height="120"
      :style="{
        top: '50px',
        transitionDelay: `${(lapis.length + 1) * 250}ms`
      }"
      ref="textEl"
    >
      <defs>
        <path id="curve" d="M 25 80 Q 150 -10 285 80" />
      </defs>

      <text font-size="22" font-weight="700" fill="#ec4899" text-anchor="middle">
        <textPath href="#curve" startOffset="50%">
          Selamat Ulang Tahun
        </textPath>
      </text>
    </svg>

    <!-- Tulisan lurus -->
    <div 
      class="absolute left-1/2 -translate-x-1/5  text-x font-semibold fade-slide w-screen text-pink-500"
      :style="{
        top: '140px',
        transitionDelay: `${(lapis.length + 2) * 250}ms`
      }"
      ref="textEl2"
    >
      Semoga Panjang Umur
    </div>

  </div>

    <body class="min-h-screen pt-12 pb-16 relative">
    
    <!-- Ornamen Mengambang (Diatur posisinya di body) -->
    <span class="ornament ornament-1">&#10024;</span> <!-- Sparkle Bintang -->
    <span class="ornament ornament-2">🎉</span> <!-- Confetti -->
    <span class="ornament ornament-3">✨</span> <!-- Kilauan -->
    <span class="ornament ornament-4">🎁</span> <!-- Hadiah -->

    <!-- Header Utama (Seperti Cover Surat) -->
    <header class="text-center mb-12 px-4 max-w-4xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-accent/20">
        <h1 class="text-3xl font-extrabold text-accent mb-4 tracking-tighter">
            Happy Birthday!
        </h1>
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            Sebuah Album Mini Untuk Naiska Putri Adi Widiya
        </h2>
        <p class="text-xl text-gray-600 italic">
            Mengenang dan merayakan setiap momen indah dari awal hingga hari ini.
        </p>
    </header>

    <!-- Kontainer Kolase Foto (Ganti Grid menjadi Flex Wrap) -->
    <main class="max-w-6xl mx-auto px-4 flex flex-wrap justify-center relative">
        <!-- Catatan: Untuk efek acak, kita gunakan utility rotation dan z-index pada setiap kartu, 
             serta margin/positioning yang bervariasi. -->
          
        <!-- FOTO 1: Kenangan Manis -->
         <div class="photo-card bg-white rounded-xl shadow-xl overflow-hidden m-4 rotate-3 z-20">
            <img 
                src="../assets/smp.jpg" 
                alt="Foto Kenangan 1" 
                class="w-full h-48 object-cover"
                onerror="this.onerror=null;this.src='https://placehold.co/600x400/94A3B8/ffffff?text=Foto+Gagal+Dimuat';"
            >
            <div class="p-4">
                <h3 class="text-lg font-bold text-accent mb-1">Babak Awal</h3>
                <p class="text-sm text-gray-600">
                    "Saat pertama kali kita bertemu dan saling mengenal, dari situlah awal perkenalan kita walaupun saat itu aku kurang mengenal. "
                </p>
            </div>
        </div>
        <!-- Rotasi: 1 derajat positif, Z-index: 20 (cukup di tengah) -->
        <div class="photo-card bg-white rounded-xl shadow-xl overflow-hidden m-4 rotate-1 z-20">
            <img 
                src="../assets/DSC07732.JPG" 
                alt="Foto Kenangan 1" 
                class="w-full h-48 object-cover"
                onerror="this.onerror=null;this.src='https://placehold.co/600x400/94A3B8/ffffff?text=Foto+Gagal+Dimuat';"
            >
            <div class="p-4">
                <h3 class="text-lg font-bold text-accent mb-1">Pertemuan Kembali</h3>
                <p class="text-sm text-gray-600">
                    "Saat pertama kali masuk hima, dari situlah awal pengembangan. "
                </p>
            </div>
        </div>

        <!-- FOTO 2: Momen Petualangan -->
        <!-- Rotasi: 3 derajat negatif, Z-index: 10 (agak di bawah), Margin-top negatif untuk overlapping -->
        <div class="photo-card bg-white rounded-xl shadow-xl overflow-hidden m-4 -rotate-3 z-10 -mt-8 sm:mt-0">
            <img 
                src="../assets/IMG_7731.JPG" 
                alt="Foto Kenangan 2" 
                class="w-full h-48 object-cover"
                onerror="this.onerror=null;this.src='https://placehold.co/600x400/94A3B8/ffffff?text=Foto+Gagal+Dimuat';"
            >
            <div class="p-4">
                <h3 class="text-lg font-bold text-accent mb-1">Si Paling Berani</h3>
                <p class="text-sm text-gray-600">
                    "Kamu berani maju sebagai juri, menunjukkan langkah yang nggak semua orang punya keberanian untuk mengambilnya."
                </p>
            </div>
        </div>

        <!-- FOTO 3: Kebersamaan Terbaik -->
        <!-- Rotasi: 6 derajat positif, Z-index: 30 (paling atas di baris ini), Margin-left positif di mobile -->
        <div class="photo-card bg-white rounded-xl shadow-xl overflow-hidden m-4 rotate-6 z-30 ml-8 sm:ml-0">
            <img 
                src="../assets/IMG_2546 (1).JPG" 
                alt="Foto Kenangan 3" 
                class="w-full h-48 object-cover"
                onerror="this.onerror=null;this.src='https://placehold.co/600x400/94A3B8/ffffff?text=Foto+Gagal+Dimuat';"
            >
            <div class="p-4">
                <h3 class="text-lg font-bold text-accent mb-1">Si Paling Dekdok</h3>
                <p class="text-sm text-gray-600">
                    "Si paling dekdok, sosok andalan di dunia editing yang selalu siap ketika diminta tolong membuat video maupun gambar."
                </p>
            </div>
        </div>

        <!-- FOTO 4: Momen Prestasi/Pencapaian -->
        <!-- Rotasi: 1 derajat negatif, Z-index: 20, Margin-top negatif kuat untuk overlapping vertikal -->
        <div class="photo-card bg-white rounded-xl shadow-xl overflow-hidden m-4 -rotate-1 z-20 -mt-10 sm:mt-0">
            <img 
                src="../assets/IMG_2831.JPG" 
                alt="Foto Kenangan 4" 
                class="w-full h-48 object-cover"
                onerror="this.onerror=null;this.src='https://placehold.co/600x400/94A3B8/ffffff?text=Foto+Gagal+Dimuat';"
            >
            <div class="p-4">
                <h3 class="text-lg font-bold text-accent mb-1">Pencapaian Hebat</h3>
                <p class="text-sm text-gray-600">
                    "Kamu Tak pernah lelah untuk menjalankan tugas dan mengapai impian mu, dan selalau progresif "
                </p>
            </div>
        </div>

        <!-- FOTO 5: Teks Penuh Harapan -->
        <!-- Rotasi: 3 derajat positif, Z-index: 10, Margin-left positif untuk sedikit dorongan horizontal -->
        <div class="photo-card bg-white rounded-xl shadow-xl flex items-center justify-center p-6 m-4 rotate-3 z-10 ml-6 sm:ml-0">
            <div class="text-center">
                 <h3 class="text-xl font-extrabold text-accent mb-3">Harapan Baru</h3>
                 <p class="text-md text-gray-700 italic leading-relaxed">
                    "Semoga tahun ini menjadi babak terbaikmu. Diberkahi kesehatan, dikelilingi orang-orang baik, dan penuh tawa."
                 </p>
            </div>
        </div>
        
        <!-- FOTO 6: Foto Terbaru/Terbaik -->
        <!-- Rotasi: 6 derajat negatif, Z-index: 40 (paling atas), Margin-top negatif untuk overlapping -->
        <div class="photo-card bg-white rounded-xl shadow-xl overflow-hidden m-4 -rotate-6 z-40 -mt-8 sm:mt-0">
            <img 
                src="../assets/DSC00380.JPG" 
                alt="Foto Kenangan 6" 
                class="w-full h-48 object-cover"
                onerror="this.onerror=null;this.src='https://placehold.co/600x400/94A3B8/ffffff?text=Foto+Gagal+Dimuat';"
            >
            <div class="p-4">
                <h3 class="text-lg font-bold text-accent mb-1">Kamu yang Sekarang</h3>
                <p class="text-sm text-gray-600">
                    "Terima kasih telah selalu membantuku baik kecil maupun besar, terimaksih sudah hadir dalam ceritaku. Inilah kamu, sosok yang luar biasa, hari ini. Selamat ulang tahun sekali lagi😊!"
                </p>
            </div>
        </div>
        
    </main>

    <!-- Penutup/Pesan Akhir -->
    <footer class="mt-16 text-center px-4 max-w-xl mx-auto">
        <div class="border-t-2 border-accent/50 pt-6">
            <p class="text-2xl font-bold text-gray-800 mb-2">Dari Temanmu yang lucu ini,</p>
            <p class="text-xl font-semibold text-accent">[Ade Tio Sopian]</p>
            <p class="text-sm text-gray-500 mt-4">Terima kasih sudah menjadi hadiah terindah bagi kami.</p>
        </div>
    </footer>
    <audio ref="bgm" :src="hpyAudio" loop></audio>


</body>



</template>

<style scoped>
.layer-drop {
  transform: translateY(-200px);
  opacity: 0;
  transition: transform 0.6s ease-out, opacity 0.4s;
}

.layer-drop.active {
  transform: translateY(0);
  opacity: 1;
}

.fade-slide {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-slide.active {
  opacity: 1;
  transform: translateY(0);
}
</style>
<style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap');
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f0f4f8; /* Biru muda sangat lembut */
            overflow-x: hidden; /* Mencegah scroll horizontal dari elemen acak */
        }
        .text-accent {
            color: #A855F7; /* Ungu/Lavender */
        }
        .photo-card {
            /* Styling dasar untuk kartu foto */
            width: 300px; /* Lebar tetap untuk efek kolase */
            transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0.1s;
        }
        
        /* Efek hover disederhanakan: angkat dan beri bayangan kuat, pastikan z-index naik */
        .photo-card:hover {
            transform: scale(1.05); /* Sedikit membesar */
            box-shadow: 0 25px 50px -12px rgba(168, 85, 247, 0.5); /* Bayangan lebih kuat */
            z-index: 50; /* Naikkan di atas kartu lain saat di-hover */
        }

        /* --- Ornamen CSS --- */
        @keyframes float-ornament {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
            50% { transform: translateY(-10px) rotate(10deg); opacity: 1; }
            100% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
        }

        .ornament {
            position: absolute;
            font-size: 2rem;
            opacity: 0.8;
            pointer-events: none; /* Agar tidak menghalangi klik */
            animation: float-ornament 4s ease-in-out infinite;
        }

        .ornament-1 { top: 15%; left: 5%; transform: rotate(15deg); animation-delay: 0s; color: #D8B4FE; }
        .ornament-2 { top: 10%; right: 10%; transform: rotate(-10deg); animation-delay: 1.5s; color: #A855F7; font-size: 2.5rem; }
        .ornament-3 { bottom: 20%; left: 15%; transform: rotate(5deg); animation-delay: 3s; color: #D8B4FE; }
        .ornament-4 { bottom: 10%; right: 5%; transform: rotate(-20deg); animation-delay: 0.5s; color: #A855F7; font-size: 2.5rem; }

        /* Untuk Mobile, kurangi ukuran ornamen */
        @media (max-width: 640px) {
            .ornament { font-size: 1.5rem; }
            .ornament-2, .ornament-4 { font-size: 2rem; }
        }
        .photo-card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.photo-card.visible {
  opacity: 1;
  transform: translateY(0);
}

    </style>
