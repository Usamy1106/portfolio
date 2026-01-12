// GSAPとScrollTriggerを使用
gsap.registerPlugin(ScrollTrigger);

function ScrollTimelineAnime() {
    const timelineItems = document.querySelectorAll('.timeline li');

    timelineItems.forEach(item => {
        const borderLine = item.querySelector('.border-line');
        if (!borderLine) return;

        gsap.fromTo(borderLine,
            { height: "0%" },
            {
                height: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    start: "top 65%", // 画面の下から35%の位置（100-35）で開始
                    end: "bottom 65%", // 要素の終端がその位置に来たら終了
                    scrub: true,       // スクロール量に合わせて動かす
                    // markers: true,  // デバッグ時にコメントアウトを外すと開始位置が見えます
                }
            }
        );
    });
}

window.addEventListener('load', ScrollTimelineAnime);