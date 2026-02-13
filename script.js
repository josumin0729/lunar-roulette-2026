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
    { amount: 5000, weight: 30, message: '새해 스타트 버프 획득 ✨' },
    { amount: 10000, weight: 25, message: '새해 행운 포인트 적립 완료 💰' },
    { amount: 30000, weight: 20, message: '새해 난이도 이지 모드 확정 🎮' },
    { amount: 50000, weight: 15, message: '새해부터 인생 난이도 내려간 느낌입니다 /n감사합니다 😄' },
    { amount: 100000, weight: 8, message: '새해 시작하자마자 /n인생 그래프 급상승했습니다 /n감사합니다 📈' },
    { amount: 500000, weight: 2, message: '새해부터 가문 위상 상승했습니다 /n정말 감사합니다 🙇‍♀️🔥' }
];

// 금액 인덱스 (룰렛 순서와 매칭)
const sliceMapping = [5000, 10000, 30000, 50000, 100000, 500000];

// 세션 데이터 추적
let sessionData = {
    pageLoadTime: Date.now(),
    spinCount: 0,
    currentPrize: null,
    resultViewTime: null
};

// Amplitude 이벤트 전송 함수
function sendEvent(eventName, params = {}) {
    if (typeof amplitude !== 'undefined') {
        amplitude.track(eventName, params);
        console.log('Amplitude Event:', eventName, params);
    }
}

// UTM 파라미터 추출 함수
function getUtmParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        utm_source: urlParams.get('utm_source') || 'direct',
        utm_medium: urlParams.get('utm_medium') || 'none',
        utm_campaign: urlParams.get('utm_campaign') || 'none'
    };
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
    // 현재 시간 기록
    const clickTime = Date.now();
    const timeToClick = Math.round((clickTime - sessionData.pageLoadTime) / 1000);
    
    // 스핀 횟수 증가
    sessionData.spinCount++;
    
    // 1️⃣ roulette_start 이벤트
    sendEvent('roulette_start', {
        button_location: 'above_fold',
        time_to_click: timeToClick,
        spin_number: sessionData.spinCount
    });
    
    // 화면 전환
    showScreen(rouletteScreen);
    
    // 당첨 금액 결정
    const winner = weightedRandom();
    sessionData.currentPrize = winner.amount;
    
    // 2️⃣ roulette_spin 이벤트
    sendEvent('roulette_spin', {
        spin_number: sessionData.spinCount,
        prize_amount: winner.amount
    });
    
    // 해당 금액의 룰렛 인덱스 찾기 (0-5)
    const sliceIndex = sliceMapping.indexOf(winner.amount);
    
    // 각 섹터는 60도 (360/6)
    const degreesPerSlice = 360 / 6;
    
    // 목표 각도 계산 (해당 섹터의 중앙)
    const targetDegree = sliceIndex * degreesPerSlice + (degreesPerSlice / 2);
    
    // 최소 5바퀴 + 목표 위치
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
    resultAmount.textContent = winner.amount.toLocaleString() + '원';
    resultMessage.textContent = winner.message;
    
    // 결과 표시 시간 기록
    sessionData.resultViewTime = Date.now();
    
    // 3️⃣ result_view 이벤트
    sendEvent('result_view', {
        prize_amount: winner.amount,
        spin_number: sessionData.spinCount
    });
    
    // 화면 전환
    showScreen(resultScreen);
}

// 공유하기
function shareResult() {
    // reaction_time 계산
    const reactionTime = sessionData.resultViewTime 
        ? Math.round((Date.now() - sessionData.resultViewTime) / 1000) 
        : 0;
    
    const currentUrl = window.location.href.split('?')[0];
    const shareUrl = currentUrl + '?utm_source=share&utm_medium=organic&utm_campaign=lunar_new_year_2026';
    
    // 4️⃣ share_click 이벤트
    sendEvent('share_click', {
        share_platform: 'link_copy',
        prize_amount: sessionData.currentPrize,
        reaction_time: reactionTime,
        spin_number: sessionData.spinCount
    });
    
    // 클립보드에 복사
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('링크가 복사되었습니다!\n친구에게 공유해보세요 🎉');
        }).catch(() => {
            prompt('이 링크를 복사해서 공유하세요:', shareUrl);
        });
    } else {
        prompt('이 링크를 복사해서 공유하세요:', shareUrl);
    }
}

// 다시 돌리기
function retry() {
    // reaction_time 계산
    const reactionTime = sessionData.resultViewTime 
        ? Math.round((Date.now() - sessionData.resultViewTime) / 1000) 
        : 0;
    
    // retry 이벤트
    sendEvent('retry_click', {
        previous_prize: sessionData.currentPrize,
        reaction_time: reactionTime,
        total_spins: sessionData.spinCount
    });
    
    // 룰렛 회전 초기화
    roulette.style.transition = 'none';
    roulette.style.transform = 'rotate(0deg)';
    
    void roulette.offsetHeight;
    
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
    const utmParams = getUtmParams();
    
    // 1️⃣ page_view 이벤트
    sendEvent('page_view', {
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        page_title: document.title,
        page_location: window.location.href,
        referrer: document.referrer || 'direct'
    });
});
