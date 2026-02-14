// 요소
const spinBtn = document.getElementById('spinBtn');
const roulette = document.getElementById('roulette');
const resultArea = document.getElementById('resultArea');
const resultAmount = document.getElementById('resultAmount');
const resultMessage = document.getElementById('resultMessage');
const shareBtn = document.getElementById('shareBtn');

// 금액별 확률 설정
const prizes = [
    { amount: '5천福', weight: 30, message: '새해 스타트 버프 획득 ✨' },
    { amount: '1만福', weight: 25, message: '새해 행운 포인트 적립 완료 💰' },
    { amount: '3만福', weight: 20, message: '새해 난이도 이지 모드 확정 🎮' },
    { amount: '5만福', weight: 15, message: '새해부터 인생 난이도가 내려갔어요!\n감사합니다 😄' },
    { amount: '10만福', weight: 8, message: '새해 복이 상위 1% 구간이네요 \n감사합니다 😆' },
    { amount: '50만福', weight: 2, message: '새해부터 가문 위상 상승🎊⬆️\n정말 감사합니다 🙇‍♀️' }
];

const sliceMapping = ['5천福', '1만福', '3만福', '5만福', '10만福', '50만福'];

// 세션 데이터
let sessionData = {
    pageLoadTime: Date.now(),
    spinCount: 0,
    currentPrize: null,
    resultViewTime: null
};

// Amplitude 이벤트
function sendEvent(eventName, params = {}) {
    if (typeof amplitude !== 'undefined') {
        amplitude.track(eventName, params);
        console.log('Amplitude Event:', eventName, params);
    }
}

// UTM 파라미터
function getUtmParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        utm_source: urlParams.get('utm_source') || 'direct',
        utm_medium: urlParams.get('utm_medium') || 'none',
        utm_campaign: urlParams.get('utm_campaign') || 'none'
    };
}

// 가중치 랜덤
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

// 룰렛 돌리기
function spinRoulette() {
    spinBtn.disabled = true;
    resultArea.classList.add('hidden');
    
    const clickTime = Date.now();
    const timeToClick = Math.round((clickTime - sessionData.pageLoadTime) / 1000);
    
    sessionData.spinCount++;
    
    sendEvent('roulette_start', {
        button_location: 'above_fold',
        time_to_click: timeToClick,
        spin_number: sessionData.spinCount
    });
    
    const winner = weightedRandom();
    sessionData.currentPrize = winner.amount;
    
    const sliceIndex = sliceMapping.indexOf(winner.amount);
    const degreesPerSlice = 360 / 6;
    const targetDegree = sliceIndex * degreesPerSlice + (degreesPerSlice / 2);
    
    // 매번 새로운 회전값 계산 (누적)
    const spins = 5;
    const totalRotation = (360 * spins) + (360 - targetDegree) + (360 * sessionData.spinCount * 10);
    
    roulette.style.transform = `rotate(${totalRotation}deg)`;
    
    setTimeout(() => {
        showResult(winner);
        spinBtn.disabled = false;
    }, 3000);
}

// 결과 표시
function showResult(winner) {
    resultAmount.textContent = winner.amount;
    resultMessage.innerHTML = winner.message.replace(/\n/g, '<br>');
    
    sessionData.resultViewTime = Date.now();
    
    sendEvent('result_view', {
        prize_amount: winner.amount,
        spin_number: sessionData.spinCount
    });
    
    resultArea.classList.remove('hidden');
}

// 공유하기
function shareResult() {
    const reactionTime = sessionData.resultViewTime 
        ? Math.round((Date.now() - sessionData.resultViewTime) / 1000) 
        : 0;
    
    const currentUrl = window.location.href.split('?')[0];
    const shareUrl = currentUrl + '?utm_source=share&utm_medium=organic&utm_campaign=lunar_new_year_2026';
    
    sendEvent('share_click', {
        share_platform: 'link_copy',
        prize_amount: sessionData.currentPrize,
        reaction_time: reactionTime,
        spin_number: sessionData.spinCount
    });
    
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

// 이벤트 리스너
spinBtn.addEventListener('click', spinRoulette);
shareBtn.addEventListener('click', shareResult);

// 페이지 로드
window.addEventListener('load', () => {
    const utmParams = getUtmParams();
    
    sendEvent('page_view', {
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        page_title: document.title,
        page_location: window.location.href,
        referrer: document.referrer || 'direct'
    });
});
