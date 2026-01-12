// main.js

// ハンバーガーメニュー
const hamburger = document.querySelector('.js-hamburger'); // c-hamburger js-hamburger
const gNav = document.getElementById('g-nav'); // p-gnav

if (hamburger && gNav) {
    hamburger.addEventListener('click', function () {
        // 状態の変化は is-active に統一
        this.classList.toggle('is-active');
        gNav.classList.toggle('is-active');
    });

    // メニュー内リンククリックで閉じる
    const navLinks = gNav.querySelectorAll('a');
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            gNav.classList.remove('is-active');
        });
    });
}

// マウスストーカー (GSAP版)
const mouse = document.querySelector(".c-mouse");

if (mouse) {
    // デバイス判定: マウス操作が可能（fine pointer）かつ、タッチデバイスではない
    const isPC = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(pointer: coarse)").matches;

    if (isPC) {
        window.addEventListener("mousemove", (e) => {
            gsap.to(mouse, {
                x: e.clientX,
                y: e.clientY,
                xPercent: -50,
                yPercent: -50,
                duration: 0.6,
                ease: "power2.out"
            });
        });
    } else {
        // スマホ・タブレットの場合は要素を非表示にする（任意）
        mouse.style.display = "none";
    }
}