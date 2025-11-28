# 웹 성능 최적화 기법

웹 애플리케이션의 성능을 향상시키는 것은 사용자 경험과 비즈니스 성과에 직접적인 영향을 미칩니다. 이 게시글에서는 2024년 최신 웹 성능 최적화 기법들을 소개합니다.

## 개요

웹 성능 최적화는 페이지 로딩 속도, 응답 시간, 리소스 사용량 등을 개선하여 사용자에게 더 나은 경험을 제공하는 것을 목표로 합니다. Core Web Vitals와 같은 웹 성능 지표가 SEO에도 영향을 미치기 때문에, 성능 최적화는 현대 웹 개발에서 필수적인 요소입니다.

## 주요 최적화 기법

### 1. 리소스 최적화

- **이미지 최적화**: WebP, AVIF 같은 최신 이미지 포맷 사용, 적절한 크기로 리사이징, lazy loading 적용
- **코드 최소화(Minification)**: CSS, JavaScript 파일을 압축하여 파일 크기 감소
- **트리 쉐이킹(Tree Shaking)**: 사용하지 않는 코드 제거
- **번들 최적화**: 코드 스플리팅, 동적 임포트를 통한 초기 로딩 시간 단축

### 2. 캐싱 전략

- **브라우저 캐싱**: HTTP 헤더를 통한 정적 리소스 캐싱 설정
- **CDN 활용**: 전 세계에 분산된 서버를 통한 콘텐츠 전송
- **Service Worker**: 오프라인 지원 및 캐시 관리
- **HTTP/2 및 HTTP/3**: 멀티플렉싱을 통한 효율적인 리소스 전송

### 3. 렌더링 최적화

- **Critical CSS**: 초기 렌더링에 필요한 CSS만 인라인으로 포함
- **코드 스플리팅**: 라우트별 또는 컴포넌트별 코드 분할
- **지연 로딩(Lazy Loading)**: 필요할 때만 리소스 로드
- **가상 스크롤링**: 대용량 리스트 렌더링 최적화

### 4. 네트워크 최적화

- **리소스 우선순위**: `preload`, `prefetch`, `preconnect` 활용
- **DNS 프리페치**: 도메인 해석 시간 단축
- **HTTP/2 Server Push**: 서버에서 클라이언트로 리소스 푸시
- **압축**: Gzip 또는 Brotli 압축 적용

### 5. JavaScript 최적화

- **비동기 처리**: Promise, async/await를 통한 논블로킹 처리
- **디바운싱/스로틀링**: 이벤트 핸들러 최적화
- **메모이제이션**: 반복 계산 결과 캐싱
- **가상 DOM 활용**: React, Vue 같은 프레임워크의 효율적인 업데이트

## 프론트엔드 최적화 예제

### 이미지 최적화

```html
<!-- WebP 포맷 사용 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="설명" loading="lazy">
</picture>

<!-- Lazy loading -->
<img src="image.jpg" loading="lazy" decoding="async">
```

### 코드 스플리팅 (React)

```javascript
// 동적 임포트를 통한 코드 스플리팅
import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 리소스 우선순위 설정

```html
<!-- Critical CSS 인라인 -->
<style>
  /* 초기 렌더링에 필요한 CSS */
</style>

<!-- 중요 리소스 preload -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="critical.js" as="script">

<!-- DNS 프리페치 -->
<link rel="dns-prefetch" href="https://api.example.com">
```

### Service Worker 캐싱

```javascript
// Service Worker 캐시 전략
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시에 있으면 반환, 없으면 네트워크 요청
      return response || fetch(event.request).then((response) => {
        // 캐시에 저장
        const responseClone = response.clone();
        caches.open('v1').then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    })
  );
});
```

## 백엔드 최적화 기법

### 데이터베이스 최적화

```sql
-- 인덱스 생성
CREATE INDEX idx_user_email ON users(email);

-- 쿼리 최적화: 서브쿼리 대신 JOIN 사용
-- 비효율적
SELECT * FROM users WHERE id IN (SELECT user_id FROM orders);

-- 효율적
SELECT u.* FROM users u
INNER JOIN orders o ON u.id = o.user_id;
```

### API 응답 최적화

```javascript
// 응답 압축 (Express.js 예제)
const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression());

// 캐싱 헤더 설정
app.get('/api/data', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600');
  res.json({ data: '...' });
});
```

### 메모이제이션 패턴

```javascript
// 함수 메모이제이션
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// 사용 예제
const expensiveFunction = memoize((n) => {
  // 복잡한 계산
  return n * n;
});
```

## 성능 측정 도구

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: 최대 콘텐츠 렌더링 시간 (2.5초 이하 목표)
- **FID (First Input Delay)**: 첫 입력 지연 시간 (100ms 이하 목표)
- **CLS (Cumulative Layout Shift)**: 누적 레이아웃 이동 (0.1 이하 목표)

### 측정 도구

```javascript
// Web Vitals 측정
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

### 성능 프로파일링

```javascript
// Performance API 활용
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.duration);
  }
});

observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
```

## 최적화 체크리스트

- [ ] 이미지 최적화 (WebP, 적절한 크기, lazy loading)
- [ ] CSS/JavaScript 파일 최소화 및 압축
- [ ] 브라우저 캐싱 설정
- [ ] CDN 사용
- [ ] 코드 스플리팅 적용
- [ ] Critical CSS 인라인
- [ ] 리소스 우선순위 설정 (preload, prefetch)
- [ ] HTTP/2 또는 HTTP/3 사용
- [ ] Gzip/Brotli 압축 활성화
- [ ] 데이터베이스 쿼리 최적화
- [ ] API 응답 캐싱
- [ ] Service Worker 구현

## 결론

웹 성능 최적화는 단일 기법보다는 여러 기법을 조합하여 적용할 때 가장 큰 효과를 볼 수 있습니다. 사용자 경험과 비즈니스 지표를 지속적으로 모니터링하고, Core Web Vitals 같은 표준 지표를 기준으로 최적화를 진행하는 것이 중요합니다. 또한 최신 웹 표준과 도구들을 활용하여 효율적으로 성능을 개선할 수 있습니다.

## 참고 자료

- [Web.dev - Performance](https://web.dev/performance/)
- [MDN - Web Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Web Vitals](https://web.dev/vitals/)

---

**작성일**: 2024년 11월 28일  
**태그**: 웹개발, 성능최적화, 프론트엔드, 백엔드, Core Web Vitals

