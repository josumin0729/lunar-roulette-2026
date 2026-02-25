# 세뱃돈 룰렛 🧧

> 설날에 친척 어른께 룰렛 결과를 보여드리면 그대로 세뱃돈 주시는 **MZ세대 설날 이벤트 시뮬레이터**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://lunar-roulette-2026.vercel.app/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

<br>

## 🎯 프로젝트 소개

설날마다 반복되는 "세뱃돈 얼마 드려야 하지?" 고민을 룰렛으로 해결!  
MZ세대가 직접 룰렛을 돌려 어른께 결과를 보여주면, 그 금액대로 세뱃돈을 받는 설날 한정 인터랙티브 이벤트 페이지입니다.

### ✨ 주요 기능

- 🎰 **가중치 기반 랜덤 룰렛** - 5천원(30%)~50만원(2%) 확률 설정
- 💬 **결과별 맞춤 메시지** - 금액에 따른 재치 있는 반응 문구
- 📤 **공유 기능** - UTM 자동 삽입된 공유 링크 생성
- 📊 **A/B 테스트** - GA4 이벤트 추적을 통한 소재별 성과 분석
- 📱 **모바일 최적화** - 명절 이동 중 스마트폰 환경 최적화

<br>

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Analytics**: Google Analytics 4, Amplitude
- **Ads**: Google Ads (디스플레이 캠페인)
- **Deployment**: GitHub Pages

<br>

## 📂 프로젝트 구조

```
seollal-roulette/
├── index.html        # 메인 페이지 (시작/룰렛/결과 화면)
├── style.css         # 스타일시트
├── script.js         # 룰렛 로직 & 이벤트 추적
└── README.md
```

<br>

## 📊 데이터 분석

### GA4 + Amplitude 이벤트 추적

| 이벤트 | 설명 |
|--------|------|
| `roulette_start` | 룰렛 시작 버튼 클릭 |
| `roulette_spin` | 룰렛 회전 완료 |
| `result_viewed` | 결과 화면 노출 (금액 포함) |
| `share_clicked` | 공유 버튼 클릭 |
| `retry_clicked` | 다시 돌리기 클릭 |

### 주요 분석 지표
- 🎰 룰렛 완료율 (시작 → 결과 확인)
- 📤 공유율 (바이럴 계수 측정)
- 🔄 재시도율 (재참여 의향)

<br>

## 🚀 로컬 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/josumin0729/seollal-roulette.git

# 2. 디렉토리 이동
cd seollal-roulette

# 3. 로컬 서버 실행 (Python)
python -m http.server 8000

# 4. 브라우저에서 접속
# http://localhost:8000
```

<br>

## 📱 사용 방법

1. **룰렛 시작** - 화면의 룰렛 돌리기 버튼 클릭
2. **결과 확인** - 금액 및 맞춤 메시지 확인
3. **어른께 보여드리기** - 화면을 그대로 보여드리면 완성 😄
4. **공유** - 친구들에게 링크 공유

<br>

## 🎰 룰렛 확률 설정

| 금액 | 확률 |
|------|------|
| 5천원 🧧 | 30% |
| 1만원 🧧 | 25% |
| 3만원 🧧 | 20% |
| 5만원 🧧 | 15% |
| 10만원 🧧 | 8% |
| 50만원 🧧 | 2% |

> ⚠️ 재미를 위한 시뮬레이션입니다. 실제 현금을 지급하지 않습니다.

<br>

## 📈 마케팅 캠페인

### Google Ads (디스플레이 캠페인)
- **기간**: 2025.02.14 ~ 02.17 (설 연휴)
- **예산**: 일 15,000~20,000원
- **타겟**: 18~34세 / 명절·가족 관심사
- **소재**: A/B 테스트 (2종)

### 성과 요약
- 노출수: 약 50,000회
- CTR: 2.5% (업계 평균 0.8% 대비 약 3배)
- CPA: 약 267원
- 바이럴 계수: 약 5%

### 주요 인사이트
- 게임 앱 게재위치 유입 → 이탈률 85% 원인 분석
- 타겟-소재-게재위치 일치의 중요성 확인
- 다음 개선 방향: URL 배치 직접 지정 (커뮤니티 타겟)

<br>

## 🔧 개선 계획

### 1차 캠페인 후 개선사항
- [ ] 게재위치 직접 지정 (인스티즈, 더쿠, 에브리타임)
- [ ] 게임 앱 카테고리 제외 설정
- [ ] 구글 태그 전환 추적 사전 설치
- [ ] 공유 후 재방문 유도 플로우 추가

### 시즌 확장 가능성
- [ ] 추석 버전 (용돈 룰렛)
- [ ] 생일 버전 (선물 금액 룰렛)

<br>

## 💬 피드백

개선 아이디어나 다음 시즌 아이디어가 있으신가요?

👉 [피드백 남기기](https://docs.google.com/forms/d/e/1FAIpQLSdtndkAyHAOxu8W3596eG4YEr4GFajUZuvhyv2q_2FsJ-OBRg/viewform)

<br>

## 📄 라이선스

MIT License - 자유롭게 사용 및 수정 가능합니다.

<br>

## 👤 제작자

**조수민**
- GitHub: [@josumin0729](https://github.com/josumin0729)
- LinkedIn: https://www.linkedin.com/in/jsm0729
- 포트폴리오: 그로스 PM / PM 준비 중

<br>

## 🙏 감사의 말

이 프로젝트는 Claude (Anthropic)의 도움으로 제작되었습니다.

---

<div align="center">

**Made with 🧧 for 설날**

[🔗 Live Demo](https://josumin0729.github.io/seollal-roulette/) | [📝 Feedback](https://docs.google.com/forms/d/e/1FAIpQLSdtndkAyHAOxu8W3596eG4YEr4GFajUZuvhyv2q_2FsJ-OBRg/viewform)

</div>
