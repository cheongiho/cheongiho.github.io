# Next.js 15의 새로운 기능과 주요 업데이트

Next.js 15가 2024년 10월에 정식 릴리스되었으며, React 19 완전 지원, 안정적인 서버 액션, 더 빠른 빌드, 개선된 SEO 도구 등 강력한 기능들을 제공합니다. 이 게시글에서는 Next.js 15의 주요 기능과 업데이트를 살펴봅니다.

## 개요

Next.js 15는 React 19와 완전히 통합되어 있으며, 개발자 경험과 성능을 크게 향상시켰습니다. Turbopack이 기본 개발 서버로 채택되었고, 캐싱 전략이 개선되었으며, 서버 액션이 안정화되었습니다. 이번 업데이트는 프로덕션 환경에서 사용할 준비가 완료되었습니다.

## 주요 기능

### 1. React 19 완전 지원

Next.js 15는 React 19의 모든 기능을 완전히 지원합니다:

- **서버 컴포넌트**: 서버에서 렌더링되는 컴포넌트로 클라이언트 번들 크기를 줄입니다
- **서버 액션**: API 라우트 없이 서버 사이드 로직을 처리할 수 있습니다
- **새로운 훅**: `useActionState`, `useOptimistic`, `use` 등 새로운 훅 지원
- **자동 배칭**: 성능 최적화를 위한 자동 배칭 개선

### 2. Turbopack이 기본 개발 서버

Next.js 15부터 Turbopack이 기본 개발 서버로 사용됩니다:

- **10배 빠른 핫 리로딩**: 개발 중 변경사항이 즉시 반영됩니다
- **스마트 리빌드 캐싱**: 변경된 부분만 다시 빌드합니다
- **CSS Modules 및 Tailwind 완전 지원**: 개발 모드에서 모든 스타일링 옵션 지원
- **더 이상 `--turbo` 플래그 불필요**: 자동으로 활성화됩니다

```bash
# Next.js 15에서는 자동으로 Turbopack 사용
npm run dev
# 또는
next dev
```

### 3. 개선된 캐싱 전략

Next.js 15는 캐싱에 대한 더 명확한 제어를 제공합니다:

#### 기본 동작 변경

**중요**: Next.js 15에서는 기본적으로 **아무것도 캐시되지 않습니다**. 이전 버전과 달리 명시적으로 캐싱을 활성화해야 합니다.

```javascript
// Next.js 15: 명시적 캐싱 필요
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'force-cache' // 명시적으로 캐싱 지정
  });
  return res.json();
}

// 캐싱 없이 사용하려면
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // 캐싱 비활성화
  });
  return res.json();
}
```

#### 새로운 캐싱 API

- **`revalidatePath`**: 특정 경로의 캐시 무효화
- **`revalidateTag`**: 태그 기반 캐시 무효화
- **`cache()` API**: 향상된 온디맨드 ISR (Incremental Static Regeneration)

```javascript
import { revalidatePath, revalidateTag } from 'next/cache';

// 특정 경로 재검증
revalidatePath('/blog');

// 태그 기반 재검증
revalidateTag('posts');
```

### 4. 안정적인 서버 액션

서버 액션이 이제 안정화되어 프로덕션에서 사용할 수 있습니다:

```javascript
'use server';

export async function createPost(formData) {
  await db.post.create({ 
    data: formData 
  });
}
```

**장점:**
- API 라우트(`/api/...`) 불필요
- `useFormAction()` 및 `<form>`과 함께 작동
- 파일 업로드 네이티브 지원
- 타입 안전성 향상

### 5. Partial Prerendering (PPR)

PPR은 점진적인 사전 렌더링을 도입합니다:

- **정적 + 동적 렌더링 결합**: 같은 페이지에서 정적과 동적 섹션을 함께 사용
- **Suspense 경계**: 동적 섹션을 Suspense로 감싸 개별적으로 사전 렌더링
- **성능 최적화**: 전체 페이지를 재작성하지 않고도 최적화 가능

```javascript
// next.config.js
module.exports = {
  experimental: {
    ppr: true
  }
};
```

### 6. 새로운 폼 컴포넌트

Next.js 15는 향상된 폼 처리를 제공합니다:

```javascript
import { Form } from 'next/form';

export default function ContactForm() {
  return (
    <Form action={submitForm}>
      <input name="email" type="email" />
      <button type="submit">제출</button>
    </Form>
  );
}
```

**특징:**
- 자동 프리페칭 및 점진적 향상
- JavaScript 없이도 작동 (우아한 저하)
- 자동 검증 및 낙관적 업데이트
- 에러 처리 내장

### 7. TypeScript 개선

Next.js 15.5부터 App Router에 대한 주요 TypeScript 개선사항:

- **Typed Routes (안정화)**: 타입 안전한 라우팅
- **Turbopack 완전 호환**: TypeScript와 Turbopack 완벽 통합
- **향상된 타입 추론**: 더 나은 자동완성 및 타입 체크

### 8. ESLint 9 지원

Next.js 15는 ESLint 9를 지원하면서 ESLint 8과의 하위 호환성을 유지합니다:

- **자동 마이그레이션**: 새로운 설정 형식으로 자동 변환
- **`eslint-plugin-react-hooks` v5**: React 훅 사용에 대한 더 나은 지원
- **명시적 설정 파일**: `eslint.config.mjs` 파일 생성

## 마이그레이션 가이드

### 자동 업그레이드

Next.js는 자동 업그레이드 도구를 제공합니다:

```bash
# 자동 업그레이드 CLI 사용
npx @next/codemod@canary upgrade latest

# 또는 수동 업그레이드
npm install next@latest react@rc react-dom@rc
```

### 주요 변경사항

1. **캐싱 동작 변경**: 기본적으로 캐시되지 않으므로 명시적 설정 필요
2. **Turbopack 기본 활성화**: `--turbo` 플래그 제거
3. **서버 액션 안정화**: `'use server'` 지시어 사용
4. **React 19 필수**: React 19로 업그레이드 필요

## 성능 개선

### 빌드 성능

- **Turbopack 빌드 (베타)**: `next build --turbopack`으로 더 빠른 빌드
- **스마트 캐싱**: 변경된 부분만 재빌드
- **병렬 처리**: 여러 작업 동시 처리

### 런타임 성능

- **서버 컴포넌트**: 클라이언트 번들 크기 감소
- **자동 코드 스플리팅**: 필요한 코드만 로드
- **이미지 최적화**: 향상된 이미지 처리

## 코드 예제

### 서버 액션 사용

```javascript
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { db } from './db';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  await db.post.create({
    data: { title, content }
  });
  
  revalidatePath('/blog');
}
```

### 클라이언트에서 서버 액션 사용

```javascript
// app/components/PostForm.tsx
'use client';

import { createPost } from '../actions';
import { useActionState } from 'react';

export default function PostForm() {
  const [state, formAction] = useActionState(createPost, null);
  
  return (
    <form action={formAction}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">게시</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

### 캐싱 전략 예제

```javascript
// app/api/posts/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://api.example.com/posts', {
    next: { 
      revalidate: 3600, // 1시간마다 재검증
      tags: ['posts'] // 태그 기반 캐시
    }
  });
  
  const posts = await res.json();
  return NextResponse.json(posts);
}
```

## 결론

Next.js 15는 React 19와의 완전한 통합, Turbopack의 기본 채택, 개선된 캐싱 전략, 안정적인 서버 액션 등 많은 개선사항을 제공합니다. 이러한 업데이트는 개발자 경험을 향상시키고 애플리케이션 성능을 최적화합니다.

프로덕션 환경에서 사용할 준비가 완료되었으며, 기존 프로젝트를 업그레이드하거나 새로운 프로젝트를 시작할 때 Next.js 15를 고려해볼 가치가 있습니다.

## 참고 자료

- [Next.js 15 공식 블로그](https://nextjs.org/blog/next-15)
- [Next.js 15.5 릴리스 노트](https://nextjs.org/blog/next-15-5)
- [React 19 공식 문서](https://react.dev/blog/2024/12/05/react-19)
- [Next.js 마이그레이션 가이드](https://nextjs.org/docs/app/building-your-application/upgrading)
- [Turbopack 문서](https://nextjs.org/docs/app/api-reference/next-config-js/turbopack)

---

**작성일**: 2024년 11월 28일  
**태그**: Next.js, React, 웹개발, 프레임워크, 서버 컴포넌트

