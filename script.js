const iconPlay = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8 5v14l11-7z"/></svg>`;
const iconPause = `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

// TẠO HIỆU ỨNG HOA ANH ĐÀO
function createSakuraPetals() {
    const container = document.getElementById('sakura-container');
    if (!container) return;
    setInterval(() => {
        const petal = document.createElement('div');
        petal.classList.add('sakura-petal');
        petal.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 8 + 6; // 6px to 14px
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.animationDuration = (Math.random() * 5 + 6) + 's'; // 6s to 11s
        container.appendChild(petal);
        setTimeout(() => petal.remove(), 12000);
    }, 400); 
}
createSakuraPetals();

function getInitials(name) {
    return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
}

// DỮ LIỆU BẠN BÈ
const rawDataList =[
    { fullName: "Trần Hà Minh Anh", dob: "06/01/2008", password: "minhanh0601", songTitle: "Bình yên", artistName: "Vũ", message: "", hashtags:["#TrachNhiem", "#NoiTam", "#NhayCam"] },
    { fullName: "Hồ Trần Diệp Ngân", dob: "18/01/2008", password: "diepngan1801", songTitle: "Chưa cập nhật", artistName: "Chưa cập nhật", message: "", hashtags:["#DeThuong", "#VuiVe", "#Ngau"] },
    { fullName: "Nguyễn Thị Hà Linh", dob: "12/07/2008", password: "halinh1207", songTitle: "2AM", artistName: "Justatee, BigDaddy", message: "", hashtags:["#OnAo", "#HoatBat", "#TruaNayAnGi"] },
    { fullName: "Nguyễn Thị Mai Phương", dob: "07/08/2008", password: "maiphuong0708", songTitle: "Swim", artistName: "Chase Atlantic", message: "", hashtags:["#BietLangNghe", "#LinhHoat", "#ThanThien"] },
    { fullName: "Lê Trần Thảo Nguyên", dob: "20/11/2008", password: "thaonguyen2011", songTitle: "Chưa cập nhật", artistName: "Chưa cập nhật", message: "", hashtags:["#NangNo", "#ChuDong", "#ThamVong"] },
    { fullName: "Lê Ngọc Đài Cát", dob: "03/01/2008", password: "daicat0301", songTitle: "fashion killa", artistName: "asap rocky", message: "", hashtags:["#Lowkey", "#Niche", "#BrainRot"] },
    { fullName: "Phạm Nguyễn Gia Linh", dob: "12/03/2008", password: "gialinh1203", songTitle: "Wind", artistName: "Akeboshi", message: "", hashtags:["#CoolNgau", "#LanhLung"] },
    { fullName: "Phạm Bảo Linh", dob: "03/11/2008", password: "baolinh0311", songTitle: "toronto 2014", artistName: "daniel caesar", message: "", hashtags:["#AmAp", "#AmTham", "#NgheSi"] },
    { fullName: "Thái Trần Bảo Châu", dob: "26/11/2008", password: "baochau2611", songTitle: "chẳng nói nên lời", artistName: "Hoàng Dũng", message: "", hashtags:["#DiemDam", "#ChanThanh", "#HoaDong"] },
    { fullName: "Hà Thị Ánh Dương", dob: "27/01/2008", password: "anhduong2701", songTitle: "Tumblr Girls", artistName: "G-Eazy", message: "", hashtags:["#VuiVe", "#ThanThien"] },
    { fullName: "Nguyễn Ngọc Như Hiếu", dob: "22/01/2008", password: "nhuhieu2201", songTitle: "thằng điên", artistName: "justatee", message: "", hashtags:["#SangNangChieuMua", "#HatCaNgay"] },
    { fullName: "Lê Nhã Thi", dob: "23/04/2008", password: "nhathi2304", songTitle: "Gam màu tím ở rìa thế giới", artistName: "Tùng", message: "", hashtags:["#HoaDong", "#VuiVe"] },
    { fullName: "Nguyễn Trần Minh Uyên", dob: "27/11/2008", password: "minhuyen2711", songTitle: "what if we?", artistName: "emi choi", message: "", hashtags:["#BungChay", "#AmTham", "#HoatNao"] },
    { fullName: "Lê Nguyễn Khánh Tiên", dob: "18/09/2008", password: "khanhtien1809", songTitle: "vạn vật như muốn ta bên nhau", artistName: "RIO", message: "", hashtags:["#DepGai", "#ThauHieu", "#YNghia"] },
    { fullName: "Huỳnh Nguyễn Thanh Xuân", dob: "07/05/2008", password: "thanhxuan0705", songTitle: "Mastermind", artistName: "Taylor Swift", message: "", hashtags:["#CaiDauLanh", "#BinhTinh", "#KienNhan"] },
    { fullName: "Hồ Bảo Ngọc", dob: "23/11/2008", password: "baongoc2311", songTitle: "Mình gặp lại được không", artistName: "LEZII x MINH HUY x BIKAY", message: "", hashtags:["#LacQuan", "#DaChieu", "#SangTao"] },
    { fullName: "Đào Thị Phương Thảo", dob: "23/02/2008", password: "phuongthao2302", songTitle: "Daylight", artistName: "Taylor Swift", message: "", hashtags:["#NangLuong", "#NhietTinh", "#NhayCam"] },
    { fullName: "Trần Huyền Trang", dob: "07/01/2008", password: "huyentrang0701", songTitle: "XO (Only If You Say Yes)", artistName: "ENHYPEN", message: "", hashtags:["#CoiMo", "#HoanHi", "#KiemSoat"] },
    { fullName: "Nguyễn Quỳnh Lam", dob: "06/07/2008", password: "quynhlam0607", songTitle: "Join Me In Death", artistName: "HIM", message: "", hashtags:["#VuiVe", "#MongManh", "#HanhTrinhTruongThanh"] },
    { fullName: "Trần Hoàng Anh Thư", dob: "03/01/2008", password: "anhthu0301", songTitle: "Chưa cập nhật", artistName: "Chưa cập nhật", message: "", hashtags:["#NangDong", "#HoatBat", "#VuiVe"] },
    { fullName: "Cù Hoàn Mỹ", dob: "06/06/2008", password: "hoanmy0606", songTitle: "Chưa cập nhật", artistName: "Chưa cập nhật", message: "", hashtags:["#LucNayLucKia", "#NghiemTuc", "#HeHuoc"] },
    { fullName: "Nguyễn Thanh Thảo", dob: "28/01/2008", password: "thanhthao2801", songTitle: "嗚呼メクラ", artistName: "鮮血A子ちゃん", message: "", hashtags:["#AntiSocial", "#FreePalestine"] },
    { fullName: "Đặng An Ninh", dob: "14/07/2008", password: "anninh1407", songTitle: "Chưa cập nhật", artistName: "Chưa cập nhật", message: "", hashtags:["#VuiVe", "#HoaDong", "#TotBung"] },
    { fullName: "Nguyễn Như Tâm", dob: "05/02/2008", password: "nhutam0502", songTitle: "With you", artistName: "Hoaprox", message: "", hashtags:["#Chaebol", "#ChiBayGa"] },
    { fullName: "Thân Thị Phương Trang", dob: "19/01/1984", password: "phuongtrang1901", songTitle: "Chưa cập nhật", artistName: "Chưa cập nhật", message: "", hashtags:["#Mathetics", "#12A2", "#Sức khỏe"] }
];

const playground = document.getElementById('playground');
const bottomBar = document.getElementById('bottom-bar');
const cardsData =[];
const numCards = rawDataList.length;
let CARD_SIZE = 0;

function calculateCardSize() {
    const bbHeight = bottomBar.offsetHeight || 80;
    const screenArea = window.innerWidth * (window.innerHeight - bbHeight);
    const areaPerCard = (screenArea * 0.45) / numCards;
    let newSize = Math.sqrt(areaPerCard);
    return Math.max(80, Math.min(newSize, 160));
}

function getFilledRingsLayout() {
    CARD_SIZE = calculateCardSize();
    const bbHeight = bottomBar.offsetHeight || 80;
    const w = window.innerWidth;
    const h = window.innerHeight - bbHeight;
    const cx = w / 2;
    const cy = h / 2;

    let availW = Math.max(0, w - CARD_SIZE * 1.2);
    let availH = Math.max(0, h - CARD_SIZE * 1.2);
    let rings =[];
    let step = CARD_SIZE * 1;

    while (availW > 0 && availH > 0) {
        let perimeter = 2 * availW + 2 * availH;
        rings.push({ w: availW, h: availH, perimeter: perimeter });
        availW -= step * 2;
        availH -= step * 2;
    }

    if (rings.length === 0) rings.push({ w: 0, h: 0, perimeter: 1 });
    let totalPerimeter = rings.reduce((sum, r) => sum + r.perimeter, 0);
    let targets =[];
    let cardsLeft = numCards;

    function getPointOnRect(cx, cy, width, height, progress) {
        if (width <= 0 && height <= 0) return { x: cx, y: cy };
        let perimeter = 2 * width + 2 * height;
        let d = progress * perimeter;
        if (d <= width) return { x: cx - width / 2 + d, y: cy - height / 2 };
        d -= width;
        if (d <= height) return { x: cx + width / 2, y: cy - height / 2 + d };
        d -= height;
        if (d <= width) return { x: cx + width / 2 - d, y: cy + height / 2 };
        d -= width;
        return { x: cx - width / 2, y: cy + height / 2 - d };
    }

    rings.forEach((ring, index) => {
        let count = (index === rings.length - 1) ? cardsLeft : Math.round(numCards * (ring.perimeter / totalPerimeter));
        if (count === 0 && cardsLeft > 0 && index === rings.length - 1) count = cardsLeft;

        for (let i = 0; i < count; i++) {
            let progress = count > 1 ? i / count : 0.5;
            let pt = getPointOnRect(cx, cy, ring.w, ring.h, progress);
            targets.push({
                x: pt.x - CARD_SIZE / 2 + (Math.random() - 0.5) * CARD_SIZE * 0.4,
                y: pt.y - CARD_SIZE / 2 + (Math.random() - 0.5) * CARD_SIZE * 0.4,
                angle: (Math.random() - 0.5) * 60
            });
        }
        cardsLeft -= count;
    });
    return targets.sort(() => Math.random() - 0.5);
}

// KHỞI TẠO CÁC THẺ 
let initialTargets = getFilledRingsLayout();
const bbHeight = bottomBar ? bottomBar.offsetHeight : 80;
const startCenterX = window.innerWidth / 2;
const startCenterY = (window.innerHeight - bbHeight) / 2;

for (let i = 0; i < numCards; i++) {
    const user = rawDataList[i];
    const userId = getInitials(user.fullName);

    const mainImg = `image/cartoon/${userId}_main.jpg`;
    const avtImg = `image/avatar/${userId}.jpg`;
    const audioSrc = `music/${userId}.mp3`;
    const coverImg = `image/music_cover/${userId}_cover.jpg`;

    const sq = document.createElement('div');
    sq.className = 'card';
    sq.style.width = CARD_SIZE + 'px';
    sq.style.height = CARD_SIZE + 'px';
    sq.style.backgroundImage = `url('${mainImg}')`;

    const imgCheck = new Image();
    imgCheck.src = mainImg;
    imgCheck.onerror = () => { sq.style.backgroundImage = `url('https://picsum.photos/seed/${userId}/300/300')`; };

    let baseZ = numCards - i;
    sq.style.zIndex = baseZ;
    playground.appendChild(sq);

    let startX = startCenterX - (CARD_SIZE / 2) + (Math.random() - 0.5) * 15;
    let startY = startCenterY - (CARD_SIZE / 2) + (Math.random() - 0.5) * 15;
    let startAngle = (Math.random() - 0.5) * 20;

    cardsData.push({
        id: userId, element: sq,
        password: user.password, fullName: user.fullName, dob: user.dob,
        songTitle: user.songTitle || `Bài hát của ${userId}`,
        artistName: user.artistName || `Ca sĩ ${userId}`,
        message: user.message,
        hashtags: user.hashtags ||["#KyNiem", "#ThanhXuan", "#YeuThuong"],
        paths: { mainImg, avtImg, audioSrc, coverImg },
        x: startX, y: startY, angle: startAngle,
        targetX: initialTargets[i].x,
        targetY: initialTargets[i].y,
        targetAngle: initialTargets[i].angle,
        baseZIndex: baseZ,
        isHovered: false, currentScale: 1,
        delay: i * 6
    });

    sq.addEventListener('mouseenter', () => {
        if (!isModalOpen) { cardsData[i].isHovered = true; sq.style.zIndex = 1000; }
    });
    sq.addEventListener('mouseleave', () => {
        if (!isModalOpen) { cardsData[i].isHovered = false; sq.style.zIndex = cardsData[i].baseZIndex; }
    });
    sq.addEventListener('click', () => openModal(i));
}

if (bottomBar) setTimeout(() => { bottomBar.classList.add('show'); }, 2500);

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        let newTargets = getFilledRingsLayout();
        cardsData.forEach((data, i) => {
            data.element.style.width = CARD_SIZE + 'px';
            data.element.style.height = CARD_SIZE + 'px';
            data.targetX = newTargets[i].x;
            data.targetY = newTargets[i].y;
            data.targetAngle = (Math.random() - 0.5) * 60;
        });
    }, 200);
});

let currentClickedIndex = null;
let isModalOpen = false;
let frameCount = 0;

function animate() {
    frameCount++;
    if (!isModalOpen) {
        cardsData.forEach(data => {
            let targetScale = (data.isHovered) ? 1.15 : 1;
            data.currentScale += (targetScale - data.currentScale) * 0.15;

            if (data.isHovered) {
                data.element.style.borderColor = "#ffffff";
                data.element.style.boxShadow = "0 0 25px 8px rgba(255, 255, 255, 0.7)";
            } else {
                data.element.style.borderColor = "rgba(255, 255, 255, 0.8)";
                data.element.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.6)";
            }

            if (frameCount > data.delay) {
                let speed = 0.05;
                data.x += (data.targetX - data.x) * speed;
                data.y += (data.targetY - data.y) * speed;
                data.angle += (data.targetAngle - data.angle) * Math.max(0.02, speed * 0.5);
            }
            data.element.style.transform = `translate(${data.x}px, ${data.y}px) rotate(${data.angle}deg) scale(${data.currentScale})`;
        });
    }
    requestAnimationFrame(animate);
}
animate();

const modal = document.getElementById('dynamic-modal');
const overlay = document.getElementById('modal-overlay');
const stepPass = document.getElementById('step-password');
const stepContent = document.getElementById('step-content');
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const musicCover = document.getElementById('music-cover');

function openModal(index) {
    currentClickedIndex = index;
    isModalOpen = true;
    const data = cardsData[index];
    const rect = data.element.getBoundingClientRect();

    stepPass.style.opacity = '0'; stepPass.style.display = 'none';
    stepContent.style.opacity = '0'; stepContent.style.display = 'none';
    document.getElementById('pwd-input').value = '';
    document.getElementById('error-msg').style.display = 'none';

    let normalizedAngle = data.angle % 360;
    if (normalizedAngle > 180) normalizedAngle -= 360;
    else if (normalizedAngle < -180) normalizedAngle += 360;

    modal.style.transition = 'none';
    modal.style.top = rect.top + 'px';
    modal.style.left = rect.left + 'px';
    modal.style.width = CARD_SIZE + 'px';
    modal.style.height = CARD_SIZE + 'px';
    modal.style.transform = `translate(0, 0) rotate(${normalizedAngle}deg) scale(${data.currentScale})`;
    modal.style.backgroundImage = data.element.style.backgroundImage;
    modal.style.backgroundColor = 'transparent';
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
    modal.style.borderRadius = '15px';

    overlay.style.pointerEvents = 'auto';
    overlay.style.opacity = '1';

    void modal.offsetWidth;

    modal.style.transition = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1)';
    modal.style.width = '350px';
    modal.style.height = '280px';
    modal.style.backgroundImage = 'none';
    modal.style.backgroundColor = '#ffffff';
    modal.style.borderRadius = '12px';

    setTimeout(() => {
        stepPass.style.display = 'block';
        setTimeout(() => stepPass.style.opacity = '1', 50);
        document.getElementById('pwd-input').focus();
    }, 500);
}

function checkPassword() {
    const data = cardsData[currentClickedIndex];
    const pwdInput = document.getElementById('pwd-input').value;

    if (pwdInput === data.password) {
        stepPass.style.opacity = '0';
        document.getElementById('error-msg').style.display = 'none';

        document.getElementById('display-name').innerText = data.fullName;
        document.getElementById('display-dob').innerText = data.dob;
        document.getElementById('display-text').innerHTML = data.message;
        document.getElementById('song-title').innerText = data.songTitle;
        document.getElementById('artist-name').innerText = data.artistName;

        const hashtagsContainer = document.getElementById('display-hashtags');
        hashtagsContainer.innerHTML = '';
        if (data.hashtags && data.hashtags.length > 0) {
            data.hashtags.forEach(tag => {
                let span = document.createElement('span');
                span.className = 'hashtag';
                span.innerText = tag;
                hashtagsContainer.appendChild(span);
            });
        }

        const avt = document.getElementById('display-avatar');
        avt.src = data.paths.avtImg;
        avt.onerror = () => { avt.src = `https://picsum.photos/seed/${data.id}avt/200/200`; };

        musicCover.src = data.paths.coverImg;
        musicCover.onerror = () => { musicCover.src = `https://picsum.photos/seed/${data.id}cover/100/100`; };
        audio.src = data.paths.audioSrc;

        const musicContainer = document.getElementById('music-player-container');
        if (data.songTitle === "Chưa cập nhật" || !data.songTitle) {
            musicContainer.style.display = 'none';
        } else {
            musicContainer.style.display = 'flex';
        }

        // --- BẮT ĐẦU ANIMATION BAY LÊN VÀ PHÓNG TO (KHÔNG LẬT) ---
        setTimeout(() => {
            stepPass.style.display = 'none';
            
            // 1. Thu nhỏ khung lại thành kích thước phong bì
            modal.style.width = '350px'; 
            modal.style.height = '230px'; 
            modal.style.backgroundColor = 'transparent';
            modal.classList.remove('custom-paper-bg');

            // 2. Hiện Hộp thư bay lên (mất 600ms)
            const envWrapper = document.getElementById('envelope-wrapper');
            const envelope3D = document.getElementById('envelope-3d');
            envWrapper.style.display = 'block';
            envelope3D.classList.remove('flip', 'fade-out');
            
            // 3. Giữ mặt trước lâu hơn (600ms bay lên + 800ms ngắm = 1400ms)
            setTimeout(() => {
                // Áp nền giấy vào khung modal ngay lúc này
                modal.classList.add('custom-paper-bg');

                // Làm mờ phong bì mặt trước và hơi zoom nhẹ lên
                envelope3D.classList.add('fade-out');

                // 4. Chờ phong bì mờ gần xong thì bắt đầu mở rộng tờ giấy ra
                setTimeout(() => {
                    envWrapper.style.display = 'none'; // Giấu hẳn đi cho nhẹ máy

                    // NẾU LÀ ĐIỆN THOẠI THÌ CHO THƯ DÀI RA (85vh), NẾU LÀ PC THÌ GIỮ NGUYÊN 430px
                    if (window.innerWidth <= 768) {
                        modal.style.width = '92vw';
                        modal.style.height = '85vh'; 
                    } else {
                        modal.style.width = '800px'; 
                        modal.style.height = '430px'; 
                    }
                    
                    modal.style.maxWidth = '95vw';
                    modal.style.maxHeight = '90vh';

                    // 5. Sau khi giấy mở rộng ra, hiện nội dung chữ lên
                    setTimeout(() => {
                        stepContent.style.display = 'flex';
                        setTimeout(() => stepContent.style.opacity = '1', 100);
                    }, 500); 
                    
                }, 400); // Đợi mờ dần

            }, 1400); // Tổng thời gian từ lúc nhập đúng pass đến lúc bắt đầu tan biến thư

        }, 300); // Đợi stepPass mờ hẳn
    } else {
        document.getElementById('error-msg').style.display = 'block';
    }
}

// Global Listeners
document.getElementById('pwd-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
});

function closeModal() {
    if (!isModalOpen) return;
    audio.pause();
    audio.currentTime = 0;
    playBtn.innerHTML = iconPlay;

    overlay.style.opacity = '0';
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    overlay.style.pointerEvents = 'none';

    setTimeout(() => {
        isModalOpen = false;
        cardsData.forEach((data) => {
            data.isHovered = false;
            data.element.style.zIndex = data.baseZIndex;
        });

        const envWrapper = document.getElementById('envelope-wrapper');
        const envelope3D = document.getElementById('envelope-3d');
        if(envWrapper) envWrapper.style.display = 'none';
        if(envelope3D) envelope3D.classList.remove('flip', 'fade-out');
        modal.classList.remove('custom-paper-bg');
        modal.style.backgroundColor = '#ffffff';
    }, 400);
}

function downloadMainImage() {
    if (currentClickedIndex === null) return;
    const imgPath = cardsData[currentClickedIndex].paths.mainImg;
    const a = document.createElement('a');
    a.href = imgPath;
    a.download = `${cardsData[currentClickedIndex].id}_main.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function togglePlay() {
    if (audio.paused) {
        let playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => { playBtn.innerHTML = iconPause; })
                .catch(err => { console.error("Audio error:", err); });
        }
    } else {
        audio.pause(); playBtn.innerHTML = iconPlay;
    }
}

if (audio) {
    audio.addEventListener('timeupdate', () => {
        if (!isNaN(audio.duration)) {
            progressBar.max = audio.duration; progressBar.value = audio.currentTime;
            let curMins = Math.floor(audio.currentTime / 60);
            let curSecs = Math.floor(audio.currentTime % 60);
            document.getElementById('curr-time').innerText = `${curMins}:${curSecs < 10 ? '0' : ''}${curSecs}`;
        }
    });
    audio.addEventListener('loadedmetadata', () => {
        let totMins = Math.floor(audio.duration / 60);
        let totSecs = Math.floor(audio.duration % 60);
        document.getElementById('total-time').innerText = `${totMins}:${totSecs < 10 ? '0' : ''}${totSecs}`;
    });
    audio.addEventListener('ended', () => { playBtn.innerHTML = iconPlay; audio.currentTime = 0; });
}

if (progressBar) {
    progressBar.addEventListener('input', () => { audio.currentTime = progressBar.value; });
}
