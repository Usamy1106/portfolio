
const firstAnimation = () => {
    const logo = document.querySelector('.mainvisual_logo');
    logo.classList.add('action');
    const planet = document.querySelector('.mainvisual_planet');
    planet.classList.add('action');
    const stars = document.querySelector('.mainvisual_stars');
    stars.classList.add('action');
    const info = document.querySelector('.information');
    info.classList.add('action');
}

// 隕石を生成して、ランダムな位置に配置する関数
const createMeteor = () => {
    const container = document.querySelector('.meteor_container');

    const meteor = document.createElement('img');
    meteor.src = 'images/common/meteor.webp';
    meteor.classList.add('meteor');

    const maxX = container.clientWidth;
    const maxY = container.clientHeight;

    const randomX = window.innerWidth + 10;
    const randomY = Math.floor(Math.random() * maxY);

    meteor.style.left = `${randomX}px`;
    meteor.style.top = `${randomY}px`;

    container.appendChild(meteor);

    // 隕石が画面外に出たら削除するタイマー
    setTimeout(() => {
        meteor.remove();
    }, 50000); // アニメーションの持続時間に合わせて削除
}
const createBigMeteor = () => {
    const container = document.querySelector('.meteor_container');

    const meteor = document.createElement('img');
    meteor.src = 'images/common/meteor.webp';
    meteor.classList.add('big_meteor');

    const maxX = container.clientWidth;
    const maxY = container.clientHeight;

    const randomX = window.innerWidth + 100;
    const randomY = Math.floor(Math.random() * maxY);

    meteor.style.left = `${randomX}px`;
    meteor.style.top = `${randomY}px`;

    container.appendChild(meteor);

    // 隕石が画面外に出たら削除するタイマー
    setTimeout(() => {
        meteor.remove();
    }, 50000); // アニメーションの持続時間に合わせて削除
}

window.onload = () => {
    firstAnimation();
    createMeteor();
    createBigMeteor();
    setInterval(createBigMeteor, 23000);
    setInterval(createMeteor, 11000);
};