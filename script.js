document.addEventListener('DOMContentLoaded', function() {

    // 1. Fungsi untuk menu hamburger di mobile
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Menutup menu jika user mengklik link navigasi
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Mengatasi kasus jika send-icon adalah link pertama
            if (event.target.closest('.send-icon')) {
                // Biarkan send-icon melakukan aksi defaultnya (misal: emailto)
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                }
                return;
            }

            // Untuk link navigasi biasa, scroll ke bagian yang sesuai
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                event.preventDefault(); // Mencegah perilaku default link
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }

            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
            }
        });
    });

    // Tambahan: Menutup navbar saat klik di luar
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !hamburger.contains(e.target) && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
        }
    });


    // 2. Fungsi animasi "reveal on scroll" untuk kartu proyek (jika ingin diaktifkan lagi)
    // Saat ini, kita tidak menggunakan animasi fade-in karena desain contoh tidak menunjukkannya.
    // Jika Anda ingin, bisa diaktifkan dengan menambahkan kelas 'reveal-on-scroll' di HTML
    // dan mengaktifkan kode JS di bawah:
    /*
    const revealElements = document.querySelectorAll('.experience-card, .portfolio-item, .commitment-card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Hentikan observasi setelah animasi berjalan jika hanya ingin sekali
            } else {
                // entry.target.classList.remove('visible'); // Hapus jika ingin animasi kembali saat scroll up
            }
        });
    }, {
        threshold: 0.1 // Animasi berjalan saat 10% elemen terlihat
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });
    */

    // Tambahan: Menyorot link navigasi aktif saat scroll
    const sections = document.querySelectorAll('section');
    const navA = document.querySelectorAll('.navbar a');
    const footerNavA = document.querySelectorAll('.footer-navbar a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) { // Offset untuk penyesuaian
                current = section.getAttribute('id');
            }
        });

        navA.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
        footerNavA.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

});