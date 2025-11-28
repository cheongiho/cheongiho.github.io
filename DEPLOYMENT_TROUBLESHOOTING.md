# 배포 문제 해결 가이드

## 🔍 확인해야 할 사항

### 1. GitHub Pages 설정 확인

**가장 흔한 문제**: GitHub Pages의 Source 설정이 잘못되어 있을 수 있습니다.

**확인 방법:**
1. https://github.com/cheongiho/cheongiho.github.io/settings/pages 접속
2. **Source** 섹션 확인
3. **GitHub Actions**가 선택되어 있어야 합니다 (Deploy from a branch가 아님!)

**해결 방법:**
- Source를 **"GitHub Actions"**로 변경
- 저장 후 워크플로우가 자동으로 실행됩니다

### 2. GitHub Actions 권한 확인

**확인 방법:**
1. https://github.com/cheongiho/cheongiho.github.io/settings/actions 접속
2. **Workflow permissions** 섹션 확인
3. **Read and write permissions**가 선택되어 있어야 합니다

**해결 방법:**
- "Read and write permissions" 선택
- 저장

### 3. 워크플로우 실행 확인

**확인 방법:**
1. https://github.com/cheongiho/cheongiho.github.io/actions 접속
2. "Deploy to GitHub Pages" 워크플로우가 있는지 확인
3. 최근 실행 기록 확인

**문제가 있다면:**
- 워크플로우가 보이지 않음 → `.github/workflows/deploy.yml` 파일이 제대로 푸시되었는지 확인
- 워크플로우가 실패함 → 로그를 확인하여 오류 메시지 확인

### 4. 브랜치 이름 확인

**확인 방법:**
```bash
git branch
```

**문제:**
- 로컬 브랜치가 `master`인데 워크플로우는 `main`을 감지하는 경우

**해결 방법:**
- 로컬 브랜치를 `main`으로 변경 (이미 완료됨)
- 또는 워크플로우의 `branches`를 `master`로 변경

### 5. 수동 배포 트리거

**방법:**
1. https://github.com/cheongiho/cheongiho.github.io/actions 접속
2. "Deploy to GitHub Pages" 워크플로우 선택
3. 오른쪽 상단의 **"Run workflow"** 버튼 클릭
4. 브랜치 선택 (main)
5. **"Run workflow"** 클릭

## 🛠️ 일반적인 오류 및 해결 방법

### 오류: "Workflow run failed"

**원인:**
- Node.js 스크립트 실행 오류
- 파일 경로 문제
- 권한 문제

**해결:**
- Actions 탭에서 로그 확인
- `.github/scripts/generate-posts.js` 파일이 올바른지 확인

### 오류: "Pages build failed"

**원인:**
- GitHub Pages 설정 문제
- 파일 구조 문제

**해결:**
- Source를 GitHub Actions로 변경
- `.nojekyll` 파일이 있는지 확인

### 오류: "Permission denied"

**원인:**
- GitHub Actions 권한 부족

**해결:**
- Settings → Actions → Workflow permissions에서 "Read and write permissions" 선택

## ✅ 체크리스트

배포 전 확인 사항:

- [ ] GitHub Pages Source가 "GitHub Actions"로 설정됨
- [ ] GitHub Actions 권한이 "Read and write permissions"로 설정됨
- [ ] `.github/workflows/deploy.yml` 파일이 존재함
- [ ] `.nojekyll` 파일이 존재함
- [ ] `main` 브랜치에 모든 파일이 푸시됨
- [ ] 워크플로우가 실행 중이거나 완료됨

## 📞 추가 도움

문제가 계속되면:
1. GitHub Actions 로그를 확인하세요
2. GitHub Pages 설정을 다시 확인하세요
3. 워크플로우 파일의 문법 오류를 확인하세요

---

**마지막 업데이트**: 2024년 11월 28일

