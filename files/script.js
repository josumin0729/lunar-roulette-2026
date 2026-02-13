// 화면 요소
const startScreen = document.getElementById('startScreen');
const rouletteScreen = document.getElementById('rouletteScreen');
const resultScreen = document.getElementById('resultScreen');

// 버튼
const startBtn = document.getElementById('startBtn');
const shareBtn = document.getElementById('shareBtn');
const retryBtn = document.getElementById('retryBtn');

// 룰렛 & 결과
const roulette = document.getElementById('roulette');
const resultAmount = document.getElementById('resultAmount');
const resultMessage = document.getElementById('resultMessage');

// 금액별 확률 설정 (총 100%)
const prizes = [
    { amount: 5000, weight: 30, message: '이것도 사랑입니다 ❤️' },
    { amount: 10000, weight: 25, message: '뭐라도 챙겨먹어요 🍜' },
    { amount: 30000, weight: 20, message: '헐 대박!! 🎉' },
    { amount: 50000, weight: 15, message: '새해 복 많이 받으세요 🙇🙏' },
    { amount: 100000, weight: 8, message: '!!!잭팟!!! 💰💰💰' },
    { amount: 500000, weight: 2, message: '🚨 전설의 50만 福✨ 🚨\n이거 보여주고 안 주시면...' }
];

// 금액 인덱스 (룰렛 순서와 매칭)
const sliceMapping = [5000, 10000, 30000, 50000, 100000, 500000];

// Amplitude 이벤트 전송 함수
function sendEvent(eventName, params = {}) {
    if (typeof amplitude !== 'undefined') {
        amplitude.track(eventName, params);
        console.log('Amplitude Event:', eventName, params);
    }
}

// 가중치 기반 랜덤 선택
function weightedRandom() {
    const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let prize of prizes) {
        if (random < prize.weight) {
            return prize;
        }
        random -= prize.weight;
    }
    return prizes[0];
}

// 화면 전환
function showScreen(screen) {
    [startScreen, rouletteScreen, resultScreen].forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// 룰렛 돌리기
function spinRoulette() {
    // Amplitude: 룰렛 시작
    sendEvent('spin_start');
    
    // 화면 전환
    showScreen(rouletteScreen);
    
    // 당첨 금액 결정
    const winner = weightedRandom();
    
    // 해당 금액의 룰렛 인덱스 찾기 (0-5)
    const sliceIndex = sliceMapping.indexOf(winner.amount);
    
    // 각 섹터는 60도 (360/6)
    const degreesPerSlice = 360 / 6;
    
    // 목표 각도 계산 (해당 섹터의 중앙)
    const targetDegree = sliceIndex * degreesPerSlice + (degreesPerSlice / 2);
    
    // 최소 5바퀴 + 목표 위치 (포인터가 위를 가리키므로 반대로 회전)
    const spins = 5;
    const finalRotation = (360 * spins) + (360 - targetDegree);
    
    // 룰렛 회전
    roulette.style.transform = `rotate(${finalRotation}deg)`;
    
    // 3초 후 결과 화면
    setTimeout(() => {
        showResult(winner);
    }, 3000);
}

// 결과 표시
function showResult(winner) {
    // 금액 포맷팅
    resultAmount.textContent = winner.amount.toLocaleString() + '福✨';
    resultMessage.textContent = winner.message;
    
    // Amplitude: 결과 조회
    sendEvent('result_view', {
        amount: winner.amount,
        amount_formatted: winner.amount.toLocaleString() + '福✨'
    });
    
    // 화면 전환
    showScreen(resultScreen);
}

// 공유하기
function shareResult() {
    const currentUrl = window.location.href.split('?')[0];
    const shareUrl = currentUrl + '?utm_source=share&utm_medium=organic&utm_campaign=seollal2025';
    
    // Amplitude: 공유 클릭
    sendEvent('share_click', {
        method: 'link_copy'
    });
    
    // 클립보드에 복사
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('링크가 복사되었습니다!\n친구에게 공유해보세요 🎉');
        }).catch(() => {
            // 클립보드 실패시 프롬프트로 대체
            prompt('이 링크를 복사해서 공유하세요:', shareUrl);
        });
    } else {
        // 구형 브라우저 대응
        prompt('이 링크를 복사해서 공유하세요:', shareUrl);
    }
}

// 다시 돌리기
function retry() {
    // Amplitude: 재시도
    sendEvent('retry_click');
    
    // 룰렛 회전 초기화
    roulette.style.transition = 'none';
    roulette.style.transform = 'rotate(0deg)';
    
    // 브라우저 리플로우 강제
    void roulette.offsetHeight;
    
    // 트랜지션 복원
    roulette.style.transition = 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    
    // 시작 화면으로
    showScreen(startScreen);
}

// 이벤트 리스너
startBtn.addEventListener('click', spinRoulette);
shareBtn.addEventListener('click', shareResult);
retryBtn.addEventListener('click', retry);

// 페이지 로드시 Amplitude 이벤트
window.addEventListener('load', () => {
    sendEvent('landing_view', {
        page_title: document.title,
        page_location: window.location.href
    });
});
