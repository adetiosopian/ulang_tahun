<template>
  <div class="w-full h-screen bg-white">
    <canvas ref="canvas" class="w-full h-full" @click="buka"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { useRouter } from 'vue-router'
import fotoImg from '../assets/IMG_1705.jpg'
import fotoImg1 from'../assets/pita.png'
const router = useRouter()


const canvas = ref(null)
let isopen = false

function buka() {
  if (!isopen) isopen = true
  localStorage.setItem('userClicked', 'true')
  return isopen
}

onMounted(() => {
  // ----- 1) Scene -----
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('skyblue')

  // ----- 2) Camera -----
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(3, 3, 3)

  // ----- 3) Renderer -----
  const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio || 1)

  // ----- 4) Cahaya luar -----
  const ambient = new THREE.AmbientLight(0xffffff, 0.7)
  const point = new THREE.PointLight(0xffffff, 1)
  point.position.set(3, 3, 3)
  scene.add(ambient, point)

  // ----- 5) Cahaya dalam kotak -----
  const lightInBox = new THREE.PointLight(0xffffff, 0, 5)
  lightInBox.position.set(0, 1, 0)
  scene.add(lightInBox)


// poto
const loader = new THREE.TextureLoader()
const fotoTexture = loader.load(fotoImg, () => {
  fotoTexture.flipY = false
  fotoTexture.minFilter = THREE.LinearFilter
  fotoTexture.magFilter = THREE.LinearFilter
  fotoTexture.generateMipmaps = false

  const maxAniso = renderer.capabilities.getMaxAnisotropy()
  fotoTexture.anisotropy = maxAniso
})

const stickerMaterial = new THREE.MeshBasicMaterial({
  map: fotoTexture,
  side: THREE.DoubleSide
})


const sticker = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1),
  stickerMaterial
)

// posisi aman + sedikit offset
sticker.rotation.x = -Math.PI / 2

// pastikan berada di atas bottom1 (0.25)
sticker.position.set(0, 0.30, 0)



const loader1 = new THREE.TextureLoader()
const fotoTexture1 = loader1.load(fotoImg1)
fotoTexture1.flipY = false

const stickerMaterial1 = new THREE.MeshStandardMaterial({
  map: fotoTexture1,
  side: THREE.DoubleSide
})

const sticker1 = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1.5),
  stickerMaterial1
)
// posisi aman + sedikit offset
sticker1.rotation.x = -Math.PI / 2

// pastikan berada di atas bottom1 (0.25)
sticker1.position.set(0, 0.27, 0)

const sticker2 = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 1.6),
  stickerMaterial1
)


// pastikan berada di atas bottom1 (0.25)
sticker2.position.set(0, 0.29, 0)
sticker2.rotation.x = -Math.PI / 2
sticker1.rotation.z = -Math.PI / 2



  // ----- 6) Kotak luar & tutup -----
  const bahan = new THREE.MeshStandardMaterial({ color: "black", side: THREE.DoubleSide })
  const bottom1 = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.2), bahan)
  bottom1.rotation.x = -Math.PI / 2
  bottom1.position.y = 0.25

  const side11 = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.5), bahan)
  side11.position.z = 1.1
  const side21 = side11.clone()
  side21.position.z = -1.1

  const side31 = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.5), bahan)
  side31.rotation.y = Math.PI / 2
  side31.position.x = 1.1
  const side41 = side31.clone()
  side41.position.x = -1.1

  const bahan_dalam = new THREE.MeshStandardMaterial({ color: "gray", side: THREE.DoubleSide })
  const bawah1 = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 2.1), bahan_dalam)
  bawah1.rotation.x = -Math.PI / 2
  bawah1.position.y = 0.2

  const depan1 = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 0.5), bahan_dalam)
  depan1.position.z = 1
  const belakang1 = depan1.clone()
  belakang1.position.z = -1

  const kanan1 = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 0.5), bahan_dalam)
  kanan1.rotation.y = Math.PI / 2
  kanan1.position.x = 1
  const kiri1 = kanan1.clone()
  kiri1.position.x = -1

  const tutup = new THREE.Group()
  tutup.add(sticker2, sticker1, sticker, bottom1, side11, side21, side31, side41)

  const tutup1 = new THREE.Group()
  tutup1.add(bawah1, depan1, belakang1, kanan1, kiri1)

  tutup.position.y = 1
  tutup1.position.y = 1
  scene.add(tutup)
  scene.add(tutup1)

  // kotak
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000, side: THREE.DoubleSide })
  const bottom = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
  bottom.rotation.x = -Math.PI / 2
  bottom.position.y = -1

  const side1 = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
  side1.position.z = 1
  const side2 = side1.clone()
  side2.position.z = -1

  const side3 = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
  side3.rotation.y = Math.PI / 2
  side3.position.x = 1
  const side4 = side3.clone()
  side4.position.x = -1

  const materiala = new THREE.MeshStandardMaterial({ color: "gray", side: THREE.DoubleSide })
  const bawah = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.9), materiala)
  bawah.rotation.x = -Math.PI / 2
  bawah.position.y = -0.9

  const depan = new THREE.Mesh(new THREE.PlaneGeometry(1.99, 2), materiala)
  depan.position.z = 0.99
  const belakang = depan.clone()
  belakang.position.z = -0.99

  const kanan = new THREE.Mesh(new THREE.PlaneGeometry(1.99, 2), materiala)
  kanan.rotation.y = Math.PI / 2
  kanan.position.x = 0.99
  const kiri = kanan.clone()
  kiri.position.x = -0.99

  const box = new THREE.Group()
  box.add(bottom, side1, side2, side3, side4)
  const box1 = new THREE.Group()
  box1.add(bawah, depan, belakang, kanan, kiri)
  scene.add(box1)
  scene.add(box)

  // ----- 7) Kontrol -----
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // ----- 8) Animasi -----
  let animStartTime = null
  const bukaDelay = 500 // 2 detik delay sebelum buka

  function animate(time) {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)

    if (isopen) {
      if (!animStartTime) animStartTime = time

      // kamera bergerak dulu
      const targetPos = new THREE.Vector3(0.2, 4, 2)
      camera.position.lerp(targetPos, 0.05)
      camera.lookAt(0, 0, 0)

      // rotasi kotak hanya sebelum animasi buka
      if (time - animStartTime < bukaDelay) {
        tutup.rotation.y += 0.01
        tutup1.rotation.y += 0.01
        box1.rotation.y += 0.01
        box.rotation.y += 0.01
      }

      if (time - animStartTime > bukaDelay) {
        // buka tutup
        if (tutup.position.y < 3) {
          tutup.position.y += 0.05
          tutup1.position.y += 0.05
          lightInBox.intensity = Math.min(lightInBox.intensity + 0.02, 1)
        } else {
          router.push('/tampilan')
        }
      }

    } else {
      // tutup kembali → rotasi tetap
      tutup.rotation.y += 0.01
      tutup1.rotation.y += 0.01
      box1.rotation.y += 0.01
      box.rotation.y += 0.01
      router.push('/')
        
      if (tutup.position.y > 1) {
        tutup.position.y -= 0.05
        tutup1.position.y -= 0.05
        lightInBox.intensity = Math.max(lightInBox.intensity - 0.02, 0)
      } else {
        animStartTime = null
      }
    }
  }
  animate()

  // ----- 9) Responsif -----
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})


</script>
