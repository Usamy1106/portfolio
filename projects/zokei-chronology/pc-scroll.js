/**
 * PC横スクロール機能 & レスポンシブ対応版
 */

document.addEventListener('DOMContentLoaded', () => {
    let horizontalScrollEnabled = false;
    let scrollInitialized = false;
    let targetElements = [];

    // 間隔の設定 (svw単位)
    const baseTranslateValues = [10, 34, 62, 92, 124, 158, 190];

    /**
     * デバイスが横向きPCかどうかを判定
     */
    function isHorizontalPC() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        // PC判定: 幅1280px以上 かつ 横向き
        return width >= 1280 && width > height;
    }

    /**
     * body要素の高さを十分に確保してスクロール可能にする
     */
    function ensureScrollableHeight() {
        document.body.style.minHeight = `${window.innerHeight * 5}px`;
    }

    /**
     * ★追加機能：JSでつけたスタイルを削除してCSSに制御を戻す
     * タブレットやスマホになった時にこれを実行します
     */
    function resetStyles() {
        targetElements.forEach(el => {
            el.style.transform = '';   // JSによる変形を解除
            el.style.transition = '';  // JSによるtransition無効化を解除
        });
        document.body.style.minHeight = ''; // スクロール用の高さも解除
    }

    /**
     * スクロール位置に基づいて要素を移動
     */
    function updateElementPositions() {
        const zokeiLogo = document.querySelector('.zokei-logo');
        const hasActive = zokeiLogo ? zokeiLogo.classList.contains('active') : false;

        // PC以外、またはactiveじゃない、または許可されてない場合は何もしない
        if (!isHorizontalPC() || !hasActive || !horizontalScrollEnabled) {
            return;
        }

        if (targetElements.length === 0) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(scrollTop / Math.max(documentHeight, 1), 1);

        targetElements.forEach((el, index) => {
            const baseTranslate = baseTranslateValues[index] || 0;
            const maxScroll = 160;
            const scrollOffset = scrollProgress * maxScroll;
            const finalTranslate = baseTranslate - scrollOffset;

            // PC時はJSで強制的に位置を指定
            el.style.transform = `translate(-50%, -50%) translateX(${finalTranslate}svw)`;
            el.style.transition = 'none';
        });
    }

    /**
     * 横スクロールの初期化
     */
    function initHorizontalScroll() {
        // 対象要素を取得
        targetElements = document.querySelectorAll('.zokei-logo [class*="zokei-logo__line"]');

        if (isHorizontalPC()) {
            ensureScrollableHeight();
            updateElementPositions();
        }

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // PCのときだけ位置計算を行う
                    if (isHorizontalPC()) {
                        updateElementPositions();
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        // ★重要：リサイズ時の処理を修正
        window.addEventListener('resize', () => {
            if (isHorizontalPC()) {
                // PCサイズになったらスクロール機能を有効化
                ensureScrollableHeight();
                updateElementPositions();
            } else {
                // ★PCサイズじゃなくなったら（タブレット・スマホ）、JSのスタイルを消す！
                // これでCSS（メディアクエリ）の transform: translateY(...) が効くようになります
                resetStyles();
            }
        });

        // PC判定ならフラグを立てるが、初期化関数自体は一度走ればOK
        scrollInitialized = true;
    }

    /**
     * activeクラス監視
     */
    function watchForActiveClass() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.classList.contains('active')) {
                        setTimeout(() => {
                            horizontalScrollEnabled = true;
                            // まだ初期化してなければ初期化
                            if (!scrollInitialized) {
                                initHorizontalScroll();
                            } else if (isHorizontalPC()) {
                                // 既に初期化済みでPCなら位置更新
                                updateElementPositions();
                            }
                            observer.disconnect();
                        }, 1200);
                    }
                }
            });
        });

        const targets = document.querySelectorAll('.zokei-logo');
        targets.forEach(target => {
            observer.observe(target, { attributes: true, attributeFilter: ['class'] });
        });
    }

    // 開始
    watchForActiveClass();
});