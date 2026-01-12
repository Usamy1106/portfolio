// 3分間（180秒）スクロールがない場合にstart.htmlに遷移
(function () {
    let timeoutId;
    const TIMEOUT_DURATION = 3 * 60 * 1000; // 3分をミリ秒で表現
    const REDIRECT_URL = 'index.html';

    // タイマーをリセットする関数
    function resetTimer() {
        // 既存のタイマーをクリア
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // 新しいタイマーを設定
        timeoutId = setTimeout(() => {
            console.log('3分間スクロールがなかったため、index.htmlに遷移します');
            window.location.href = REDIRECT_URL;
        }, TIMEOUT_DURATION);
    }

    // スクロールイベントリスナー
    function handleScroll() {
        resetTimer();
    }

    // イベントリスナーを追加（パッシブモードで最適化）
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 初期タイマーを開始
    resetTimer();

    // デバッグ用（オプション）：残り時間を表示
    setInterval(() => {
        console.log('タイマーが動作中...');
    }, 30000); // 30秒ごとに動作確認

    console.log('自動遷移スクリプトが開始されました（3分間の非活動で index.html に遷移）');
})();