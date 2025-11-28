# Giscus 설정 가이드

Giscus는 GitHub Discussions를 기반으로 한 댓글 시스템입니다. 이 가이드에서는 블로그에 Giscus를 설정하는 방법을 설명합니다.

## 📋 사전 요구사항

1. GitHub 저장소가 있어야 합니다 (`cheongiho.github.io`)
2. 저장소에 Discussions가 활성화되어 있어야 합니다
3. Giscus 앱이 저장소에 설치되어 있어야 합니다

## 🔧 설정 단계

### 1단계: Discussions 활성화

1. GitHub 저장소 페이지로 이동: https://github.com/cheongiho/cheongiho.github.io
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **General** → **Features** 섹션으로 이동
4. **Discussions** 체크박스를 활성화
5. **Save changes** 클릭

### 2단계: Giscus 앱 설치

1. https://giscus.app/ 웹사이트로 이동
2. **Repository** 섹션에서:
   - Repository: `cheongiho/cheongiho.github.io` 선택
   - Discussion category: `Announcements` 또는 `General` 선택
3. **Enable giscus** 버튼 클릭
4. GitHub 인증 및 권한 승인
5. Giscus 앱이 저장소에 설치되었는지 확인

### 3단계: Giscus 설정 정보 확인

Giscus 설정 페이지에서 다음 정보를 확인하세요:

- **Repository ID** (예: `R_kgDO...`)
- **Category ID** (예: `DIC_kwDO...`)

이 정보는 다음 단계에서 사용됩니다.

### 4단계: 코드에 Giscus 정보 적용

`js/post-loader.js` 파일을 열고 다음 부분을 찾아주세요:

```javascript
script.setAttribute('data-repo', 'cheongiho/cheongiho.github.io');
script.setAttribute('data-repo-id', ''); // 여기에 Repository ID 입력
script.setAttribute('data-category', 'Announcements');
script.setAttribute('data-category-id', ''); // 여기에 Category ID 입력
```

**수정 방법:**

1. `data-repo-id` 값에 Giscus에서 확인한 **Repository ID** 입력
2. `data-category-id` 값에 Giscus에서 확인한 **Category ID** 입력
3. `data-category` 값이 Giscus 설정과 일치하는지 확인

**예시:**

```javascript
script.setAttribute('data-repo', 'cheongiho/cheongiho.github.io');
script.setAttribute('data-repo-id', 'R_kgDOAbc123'); // 실제 Repository ID
script.setAttribute('data-category', 'Announcements');
script.setAttribute('data-category-id', 'DIC_kwDOXyz456'); // 실제 Category ID
```

### 5단계: 테마 설정 (선택사항)

Giscus는 다크/라이트 모드를 자동으로 감지합니다. `js/post-loader.js`에서 다음 코드가 이미 포함되어 있습니다:

```javascript
script.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
```

이 코드는 블로그의 현재 테마에 맞춰 Giscus 테마를 자동으로 설정합니다.

### 6단계: 커밋 및 배포

1. 변경사항 저장
2. Git 커밋 및 푸시:

```bash
git add js/post-loader.js
git commit -m "Giscus 설정 추가"
git push
```

3. GitHub Actions가 자동으로 배포합니다
4. 배포 완료 후 블로그에서 댓글 기능 확인

## ✅ 확인 사항

설정이 완료되면 다음을 확인하세요:

- [ ] Discussions가 저장소에 활성화되어 있음
- [ ] Giscus 앱이 저장소에 설치되어 있음
- [ ] `data-repo-id`에 올바른 Repository ID가 입력되어 있음
- [ ] `data-category-id`에 올바른 Category ID가 입력되어 있음
- [ ] 게시글 페이지에서 Giscus 댓글 위젯이 표시됨
- [ ] 댓글 작성 및 표시가 정상적으로 작동함

## 🔍 문제 해결

### 댓글이 표시되지 않는 경우

1. **Discussions 활성화 확인**
   - 저장소 Settings → Features → Discussions가 활성화되어 있는지 확인

2. **Giscus 앱 설치 확인**
   - 저장소 Settings → Integrations → Installed GitHub Apps에서 Giscus 확인

3. **Repository ID 및 Category ID 확인**
   - Giscus 설정 페이지에서 올바른 ID를 다시 확인
   - `js/post-loader.js`의 ID 값이 정확한지 확인

4. **브라우저 콘솔 확인**
   - F12를 눌러 개발자 도구 열기
   - Console 탭에서 오류 메시지 확인

### 댓글이 다크 모드에서 보이지 않는 경우

- `js/post-loader.js`의 테마 설정 코드가 올바른지 확인
- Giscus 테마를 `dark` 또는 `light`로 명시적으로 설정할 수 있습니다

## 📚 추가 리소스

- [Giscus 공식 문서](https://giscus.app/)
- [GitHub Discussions 가이드](https://docs.github.com/en/discussions)
- [Giscus GitHub 저장소](https://github.com/giscus/giscus)

## 💡 팁

- 첫 번째 댓글을 작성하면 Discussions에 자동으로 생성됩니다
- 각 게시글은 고유한 URL을 기반으로 댓글을 구분합니다
- 댓글은 GitHub Discussions에서도 확인할 수 있습니다

---

**작성일**: 2024년 11월 28일  
**업데이트**: 필요시 이 문서를 업데이트하세요

