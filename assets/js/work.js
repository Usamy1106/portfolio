gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    const containers = document.querySelectorAll('.js-scroll-container');

    containers.forEach((container) => {
        const section = container.querySelector('.js-scroll-section');
        if (!section) return;

        // --- 中央配置のための計算関数 ---
        const setInitialPadding = () => {
            const firstItem = section.firstElementChild;
            const lastItem = section.lastElementChild;

            if (!firstItem || !lastItem) return;

            // 最初の要素を中央にするための左余白： (画面幅 / 2) - (要素幅 / 2)
            const startPadding = (window.innerWidth / 2) - (firstItem.offsetWidth / 2);
            // 最後の要素を中央にするための右余白： (画面幅 / 2) - (要素幅 / 2)
            const endPadding = (window.innerWidth / 2) - (lastItem.offsetWidth / 2);

            section.style.paddingLeft = `${startPadding}px`;
            section.style.paddingRight = `${endPadding}px`;
        };

        // 初回実行
        setInitialPadding();

        // アニメーション設定
        gsap.to(section, {
            // 移動量：(全体の幅 - 画面幅) 分だけ左に動かす
            x: () => -(section.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                // スクロール距離（速度調整用：1.5倍）
                end: () => `+=${(section.scrollWidth - window.innerWidth) * 1.5}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                onRefresh: setInitialPadding // リサイズ時に余白を再計算
            }
        });
    });

    // --- パララックスセクションの修正 ---
    const parallaxTrigger = document.querySelector('.js-parallax-trigger');

    if (parallaxTrigger) {
        const items = parallaxTrigger.querySelectorAll('.js-parallax-item');
        const images = parallaxTrigger.querySelectorAll('.js-parallax-img');

        // メインのタイムライン作成
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: parallaxTrigger,
                start: "top top",
                // アイテム数に応じてスクロール量を調整（例: 1アイテムにつき100vh分）
                end: () => `+=${window.innerHeight * items.length}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        // 初期状態の設定：テキストを透明にして下にずらしておく
        gsap.set(items, { opacity: 0, y: 50 });

        // 最初のアイテムだけは最初から表示させる場合（お好みで調整）
        // gsap.set(items[0], { opacity: 1, y: 0 });

        items.forEach((item, index) => {
            // --- 1. テキストをフェードインさせる ---
            tl.to(item, {
                opacity: 1,
                y: 0,
                duration: 1,
                onStart: () => switchImage(index), // 登場時に画像を切り替え
                onReverseComplete: () => {
                    // 戻る時に前の画像に戻すための処理
                    if (index > 0) switchImage(index - 1);
                }
            });

            // --- 2. 少しの間、表示を維持させる（キープ） ---
            tl.to({}, { duration: 1 });

            // --- 3. 次のアイテムがある場合、今のアイテムをフェードアウト（上へ）させる ---
            if (index < items.length - 1) {
                tl.to(item, {
                    opacity: 0,
                    y: -50,
                    duration: 1
                }, "+=0.5"); // 少し間隔をあけてからフェードアウト開始
            } else {
                // 最後のアイテムは消さずに残す、あるいは最後に少し余白を持たせる
                tl.to({}, { duration: 1 });
            }
        });

        function switchImage(index) {
            images.forEach((img, i) => {
                img.classList.toggle('is-active', i === index);
            });
        }
    }

    // リサイズ対策
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 200);
    });
});

// プログレスバー（もしあれば）
const progressBar = document.querySelector('.c-progress-bar');
if (progressBar) {
    gsap.to(progressBar, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true
        }
    });
}