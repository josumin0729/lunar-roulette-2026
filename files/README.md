# 🧧 2025 세뱃돈 룰렛 (Amplitude + Vercel)

설날 세뱃돈을 랜덤으로 뽑아주는 인터랙티브 웹 애플리케이션

## 📋 프로젝트 개요

**목적**: 그로스 PM 포트폴리오용 구글 애즈 + Amplitude 추적
**타겟**: 10-30대 MZ세대
**기간**: 2025.02.15(토) ~ 02.18(화) 설 연휴
**예산**: 40,000원

---

## 🚀 Vercel 배포 (5분 컷)

### Vercel 장점:
- ✅ GitHub push하면 자동 배포
- ✅ HTTPS 자동
- ✅ 속도 개빠름
- ✅ 무료

### 배포 방법:

**1. Vercel 가입**
- [vercel.com](https://vercel.com) 접속
- GitHub 계정으로 로그인

**2. 프로젝트 배포**
- "Add New..." → "Project"
- GitHub 저장소 선택
- "Deploy" 클릭
- 끝! → `https://프로젝트명.vercel.app`

**3. 파일 구조**
```
seollal-roulette/
├── index.html
├── style.css
├── script.js
├── vercel.json  ← 이미 포함됨
└── README.md
```

---

## 📊 Amplitude 설정

### 1. 계정 생성 (무료)
1. [amplitude.com](https://amplitude.com) 가입
2. 프로젝트 생성: "세뱃돈룰렛"
3. API Key 복사

### 2. API Key 입력
`index.html` 수정:
```javascript
amplitude.init('YOUR_AMPLITUDE_API_KEY');
↓
amplitude.init('실제_발급받은_키');
```

### 3. 이벤트 추적
| 이벤트 | 설명 |
|-------|------|
| landing_view | 페이지 방문 |
| spin_start | 룰렛 시작 |
| result_view | 결과 확인 |
| share_click | 공유 클릭 |
| retry_click | 다시하기 |

---

## 🎯 구글 애즈 설정

### 일정 & 예산
```
2/15 (토) - 10,000원 (외갓집 도착)
2/16 (일) - 10,000원 (설날 전날)
2/17 (월) - 12,000원 (설날 당일! ⭐)
2/18 (화) - 8,000원 (연휴 마지막)
```

### 캠페인 세팅
1. **유형**: 디스플레이 캠페인
2. **타겟**: 18-34세
3. **게재위치**: 
   - YouTube Shorts ⭐⭐⭐
   - YouTube 홈/검색
   - 모바일 게임 앱
4. **입찰**: 클릭수 최대화
5. **URL**: Vercel 배포 URL 입력

### 광고 소재
**제목**:
- `세뱃돈 얼마 받을까? 🧧`
- `5천원~50만원 뽑기`

**설명**:
- `설날 특집! 룰렛 돌려서 나온 금액 어르신께 보여드리세요`

---

## 📈 KPI

| 지표 | 목표 |
|-----|------|
| 룰렛 완료율 | 60%+ |
| 공유율 | 20%+ |
| CPA | 800원 이하 |

---

## ✅ 체크리스트

- [ ] Amplitude API Key 입력
- [ ] Vercel 배포
- [ ] URL 테스트
- [ ] Amplitude Live 확인
- [ ] 모바일 테스트
- [ ] 구글 애즈 생성

---

**제작**: 조수민 | 그로스 PM 포트폴리오
