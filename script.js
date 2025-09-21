const envelope = document.getElementById('envelope');
const envelopeWrapper = document.getElementById('envelope-wrapper');
const letter = document.querySelector('.letter');
const mainContent = document.getElementById('main-content');
let pageChanged = false;

// Step 1: Klik amplop untuk membukanya
envelope.addEventListener('click', function() {
    if (this.classList.contains('close')) {
        this.classList.add('open');
        this.classList.remove('close');
    }
});

// Step 2: Klik surat untuk mengganti halaman
letter.addEventListener('click', function(event) {
    event.stopPropagation(); // Mencegah klik menyebar ke amplop
    if (pageChanged || !envelope.classList.contains('open')) return;
    
    pageChanged = true;

    // Mulai fade out untuk amplop.
    envelopeWrapper.style.opacity = '0';

    // Tunggu animasi fade out selesai sebelum mengganti konten.
    setTimeout(() => {
        envelopeWrapper.style.display = 'none';
        mainContent.style.display = 'block';
        
        // Delay singkat agar properti display sempat diterapkan sebelum fade in.
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 50);
    }, 1000); // Durasi fade out
});

document.addEventListener('DOMContentLoaded', () => {
    const musicBtn = document.getElementById('music-btn');
    const music = document.getElementById('bg-music');
    const playIcon = document.getElementById('music-icon-play');
    const pauseIcon = document.getElementById('music-icon-pause');
    const envelope = document.getElementById('envelope');

    // Fungsi switch ikon
    function updateMusicIcon() {
        if (music.paused) {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        } else {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        }
    }

    // Saat klik amplop
    envelope.addEventListener('click', () => {
        musicBtn.classList.remove('hidden');
        music.play().catch(err => {
            console.log("Autoplay dicegah browser, user harus tekan tombol musik.");
        });
    }, { once: true });

    // Klik tombol musik
    musicBtn.onclick = () => {
        if (music.paused) {
            music.play();
        } else {
            music.pause();
        }
        updateMusicIcon();
    };

    // Sync status audio
    music.addEventListener('play', updateMusicIcon);
    music.addEventListener('pause', updateMusicIcon);

    // Set ikon awal
    updateMusicIcon();
});

                        const images = document.querySelectorAll('.carousel-img');
                        const dots = document.querySelectorAll('.carousel-dot');
                        let current = 0;
                        let intervalId = null;
                        let isTransitioning = false;

                        function showImage(idx) {
                            if (isTransitioning || idx === current) return;
                            isTransitioning = true;
                            const prev = current;
                            const next = idx;

                            // Fade out current
                            images[prev].style.opacity = '0';
                            // Fade in next
                            images[next].style.opacity = '1';

                            dots.forEach((dot, i) => {
                                dot.classList.toggle('bg-rose-400', i === next);
                                dot.classList.toggle('bg-rose-200', i !== next);
                            });

                            setTimeout(() => {
                                current = next;
                                isTransitioning = false;
                            }, 500);
                        }

                        function nextImage() {
                            let nextIdx = (current + 1) % images.length;
                            showImage(nextIdx);
                        }

                        function prevImage() {
                            let prevIdx = (current - 1 + images.length) % images.length;
                            showImage(prevIdx);
                        }

                        document.getElementById('prev-btn').onclick = () => {
                            prevImage();
                            resetAutoSlide();
                        };
                        document.getElementById('next-btn').onclick = () => {
                            nextImage();
                            resetAutoSlide();
                        };
                        dots.forEach((dot, i) => {
                            dot.onclick = () => {
                                showImage(i);
                                resetAutoSlide();
                            };
                        });

                        // Auto slide
                        function startAutoSlide() {
                            intervalId = setInterval(nextImage, 3500);
                        }
                        function resetAutoSlide() {
                            clearInterval(intervalId);
                            startAutoSlide();
                        }

                        // Popup logic
                        const popupModal = document.getElementById('popup-modal');
                        const popupImg = document.getElementById('popup-img');
                        const closePopup = document.getElementById('close-popup');
                        images.forEach((img) => {
                            img.onclick = () => {
                                popupImg.src = img.src;
                                popupModal.classList.remove('hidden');
                            };
                        });
                        closePopup.onclick = () => {
                            popupModal.classList.add('hidden');
                            popupImg.src = '';
                        };
                        popupModal.onclick = (e) => {
                            if (e.target === popupModal) {
                                popupModal.classList.add('hidden');
                                popupImg.src = '';
                            }
                        };

                        // Initialize: show only the first image
                        images.forEach((img, i) => {
                            img.style.opacity = i === 0 ? '1' : '0';
                        });
                        dots.forEach((dot, i) => {
                            dot.classList.toggle('bg-rose-400', i === 0);
                            dot.classList.toggle('bg-rose-200', i !== 0);
                        });

                        startAutoSlide();