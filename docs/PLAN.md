# GitHub Pages 정적 블로그 구축 계획

## 📋 프로젝트 개요

- 배포: cheongiho.github.io
- 기술: HTML, CSS, Vanilla JavaScript
- 마크다운 파싱: marked.js (CDN)
- 코드 하이라이팅: Prism.js
- 댓글: Giscus (GitHub Discussions)
- 빌드: GitHub Actions (자동)

## 📁 디렉토리 구조

```sh
/
├── .nojekyll # Jekyll 비활성화 (필수!)
├── index.html # 메인 페이지 (게시글 목록)
├── post.html # 게시글 상세 페이지
├── css/
│ ├── style.css # 메인 스타일 (다크/라이트 모드)
│ └── prism.css # 코드 하이라이팅 테마
├── js/
│ ├── app.js # 메인 애플리케이션 로직
│ ├── post-loader.js # 마크다운 로딩 및 파싱
│ ├── search.js # 검색 기능
│ └── theme.js # 다크/라이트 모드 토글
├── pages/ # 마크다운 게시글 폴더
│ └── example.md
├── .github/
│ ├── workflows/
│ │ └── deploy.yml # GitHub Pages 배포
│ └── scripts/
│   └── generate-posts.js # posts.json 생성 스크립트
└── posts.json # 게시글 메타데이터 (배포 시 자동 생성)
```

## 🔧 구현 단계

### 1단계: 기본 HTML 구조

- index.html: 게시글 목록, 검색창, 태그 필터
- post.html: 게시글 본문, Giscus 댓글

### 2단계: CSS 스타일링

- 미니멀 디자인 (여백 중심, 타이포그래피 강조)
- CSS 변수 기반 다크/라이트 모드
- 반응형 레이아웃

### 3단계: JavaScript 기능

- marked.js로 마크다운 → HTML 변환
- Prism.js로 코드 하이라이팅
- posts.json 기반 게시글 목록 렌더링
- 검색 및 태그 필터링 기능
- 다크/라이트 모드 토글

### 4단계: GitHub Actions 설정

- posts.json 자동 생성 스크립트
- GitHub Pages 자동 배포 워크플로우
- 마크다운 파일 변경 시 자동 빌드

### 5단계: Giscus 댓글 통합

- GitHub Discussions 연동
- 게시글별 댓글 위젯 설정

### 6단계: 최종 테스트 및 배포

- 로컬 테스트
- GitHub Pages 배포 확인
- 반응형 디자인 검증
