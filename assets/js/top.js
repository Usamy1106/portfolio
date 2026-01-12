gsap.registerPlugin(ScrollTrigger);

const blurTarget = document.getElementById('top-hero');

gsap.to(blurTarget, {
    filter: "blur(24px)",
    ease: "none",
    scrollTrigger: {
        trigger: "body",   // ページ全体をトリガーに
        start: "top top",  // スクロール開始時
        end: "5000px top", // 5000pxスクロールしたところで最大値（既存のspeed 0.005相当）
        scrub: true,
    }
});