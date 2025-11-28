# GitHub Pages 정적 블로그 구축하기

이 게시글은 GitHub Pages를 사용하여 정적 블로그를 구축하는 방법에 대해 설명합니다.

## 개요

GitHub Pages는 GitHub에서 제공하는 무료 정적 웹사이트 호스팅 서비스입니다. Jekyll을 사용하지 않고도 순수 HTML, CSS, JavaScript로 블로그를 만들 수 있습니다.

## 주요 기능

- **마크다운 지원**: `marked.js`를 사용하여 마크다운을 HTML로 변환
- **코드 하이라이팅**: `Prism.js`로 코드 블록을 아름답게 표시
- **다크 모드**: 사용자 선호도에 따라 다크/라이트 모드 전환
- **검색 기능**: 게시글 제목, 내용, 태그로 검색
- **댓글 시스템**: Giscus를 통한 GitHub Discussions 기반 댓글

## 기술 스택

```javascript
// 사용된 주요 라이브러리
const libraries = {
  markdown: 'marked.js',
  codeHighlight: 'Prism.js',
  comments: 'Giscus',
  deployment: 'GitHub Actions'
};
```

## 디렉토리 구조

```
/
├── index.html          # 메인 페이지
├── post.html           # 게시글 상세 페이지
├── css/                # 스타일시트
├── js/                 # JavaScript 파일
├── pages/              # 마크다운 게시글
└── .github/workflows/  # GitHub Actions 설정
```

## 코드 예제

다음은 간단한 JavaScript 예제입니다:

```javascript
// 게시글 로드 함수
async function loadPost(slug) {
  const response = await fetch(`pages/${slug}.md`);
  const markdown = await response.text();
  const html = marked.parse(markdown);
  return html;
}
```

## Python 예제

```python
# 간단한 Python 스크립트
def greet(name):
    return f"Hello, {name}!"

print(greet("GitHub Pages"))
```

## HTML 예제

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>블로그</title>
</head>
<body>
    <h1>안녕하세요!</h1>
</body>
</html>
```

## CSS 예제

```css
/* 다크 모드 변수 */
:root {
    --bg-color: #ffffff;
    --text-color: #333333;
}

[data-theme="dark"] {
    --bg-color: #1a1a1a;
    --text-color: #e0e0e0;
}
```

## 마크다운 문법

### 제목

```markdown
# H1
## H2
### H3
```

### 리스트

- 순서 없는 리스트 항목 1
- 순서 없는 리스트 항목 2
  - 중첩 항목

1. 순서 있는 리스트 항목 1
2. 순서 있는 리스트 항목 2

### 강조

**굵게**, *기울임*, ~~취소선~~, `인라인 코드`

### 링크와 이미지

[링크 텍스트](https://example.com)

![이미지 설명](https://example.com/image.png)

### 인용문

> 이것은 인용문입니다.
> 여러 줄로 작성할 수 있습니다.

### 표

| 열 1 | 열 2 | 열 3 |
|------|------|------|
| 데이터 1 | 데이터 2 | 데이터 3 |
| 데이터 4 | 데이터 5 | 데이터 6 |

## 결론

GitHub Pages를 사용하면 무료로 정적 블로그를 호스팅할 수 있습니다. 마크다운으로 게시글을 작성하고, GitHub Actions로 자동 배포하는 워크플로우를 구축하면 매우 편리합니다.

## 참고 자료

- [GitHub Pages 공식 문서](https://docs.github.com/pages)
- [Marked.js 문서](https://marked.js.org/)
- [Prism.js 문서](https://prismjs.com/)
- [Giscus 문서](https://giscus.app/)

---

**작성일**: 2024년 11월 28일  
**태그**: GitHub, 블로그, 웹개발, 정적사이트

