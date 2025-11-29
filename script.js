const playBtn = document.getElementById('playBtn');
const revealBtn = document.getElementById('revealBtn');
const bgAudio = document.getElementById('bgAudio');
const secret = document.getElementById('secret');
const gallery = document.getElementById('gallery');
const mainPhoto = document.getElementById('mainPhoto');

// Play / pause lagu
playBtn.addEventListener('click', ()=>{
  if(bgAudio.paused){
    bgAudio.play().catch(()=> alert('Tekan play manual jika audio disekat.'));
    playBtn.textContent = 'Pause 🎵';
  } else {
    bgAudio.pause();
    playBtn.textContent = 'Mainkan Lagu 🎵';
  }
});

// Reveal surprise
revealBtn.addEventListener('click', ()=>{
  secret.classList.remove('hidden');
  revealBtn.disabled = true;
  runConfetti();
});

// Gallery click change main photo
gallery.addEventListener('click', (e)=>{
  if(e.target.tagName === 'IMG'){
    mainPhoto.src = e.target.src;
  }
});

// Confetti animation
function runConfetti(){
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  resize();
  window.addEventListener('resize', resize);
  const pieces = [];
  const colors = ['#ff758f','#ffd1dc','#ffd7e2','#ffe6f0','#ffb3c6'];
  for(let i=0;i<120;i++){
    pieces.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height - canvas.height,
      r: Math.random()*6+4,
      d: Math.random()*30+10,
      tilt: Math.random()*10-10,
      color: colors[Math.floor(Math.random()*colors.length)],
      tiltAngleIncrement: Math.random() * 0.07 + 0.05
    });
  }
  let angle = 0;
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    angle += 0.01;
    for(let i=0;i<pieces.length;i++){
      const p = pieces[i];
      p.tilt += p.tiltAngleIncrement;
      p.x += Math.sin(angle) * 1 + 0.5;
      p.y += (Math.cos(angle) + p.d + 2) * 0.5;
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.r, 2+p.tilt);
      ctx.closePath();
      if(p.y > canvas.height + 20) { p.y = -10; p.x = Math.random()*canvas.width; }
    }
    confettiAnim = requestAnimationFrame(animate);
  }
  animate();
  setTimeout(()=>{ cancelAnimationFrame(confettiAnim); ctx.clearRect(0,0,canvas.width,canvas.height); }, 6000);

  function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
}
