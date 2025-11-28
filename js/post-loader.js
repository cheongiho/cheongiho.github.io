// 게시글 상세 페이지 로더

(function() {
    const postContent = document.getElementById('post-content');
    const postTitle = document.getElementById('post-title');
    
    // URL에서 slug 파라미터 가져오기
    function getSlugFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('slug');
    }
    
    // 게시글 로드
    async function loadPost() {
        const slug = getSlugFromURL();
        
        if (!slug) {
            if (postContent) {
                postContent.innerHTML = '<p class="loading">게시글을 찾을 수 없습니다.</p>';
            }
            return;
        }
        
        try {
            // posts.json에서 게시글 메타데이터 가져오기
            const postsResponse = await fetch('posts.json');
            if (!postsResponse.ok) {
                throw new Error('게시글 목록을 불러올 수 없습니다.');
            }
            
            const posts = await postsResponse.json();
            const post = posts.find(p => p.slug === slug);
            
            if (!post) {
                throw new Error('게시글을 찾을 수 없습니다.');
            }
            
            // 마크다운 파일 로드
            const markdownResponse = await fetch(`pages/${post.file}`);
            if (!markdownResponse.ok) {
                throw new Error('마크다운 파일을 불러올 수 없습니다.');
            }
            
            const markdown = await markdownResponse.text();
            
            // 마크다운을 HTML로 변환
            const html = marked.parse(markdown);
            
            // 페이지 제목 업데이트
            if (postTitle) {
                postTitle.textContent = `${post.title} - cheongiho.github.io`;
            }
            
            // 게시글 렌더링
            if (postContent) {
                postContent.innerHTML = `
                    <h1>${post.title}</h1>
                    <div class="post-meta">
                        ${post.date} ${post.tags.length > 0 ? '• ' + post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join(' ') : ''}
                    </div>
                    <div class="post-body">
                        ${html}
                    </div>
                `;
            }
            
            // 코드 하이라이팅 적용 (Prism.js)
            if (window.Prism) {
                Prism.highlightAll();
            }
            
            // Giscus 댓글 로드
            loadGiscus(post);
            
        } catch (error) {
            console.error('게시글 로드 오류:', error);
            if (postContent) {
                postContent.innerHTML = `
                    <p class="loading">게시글을 불러오는 중 오류가 발생했습니다.</p>
                    <p class="loading" style="font-size: 0.875rem; margin-top: 0.5rem;">
                        ${error.message}
                    </p>
                `;
            }
        }
    }
    
    // Giscus 댓글 로드
    function loadGiscus(post) {
        const giscusContainer = document.getElementById('giscus-container');
        if (!giscusContainer) return;
        
        // Giscus 스크립트가 이미 로드되었는지 확인
        if (document.querySelector('script[src*="giscus"]')) {
            return;
        }
        
        // Giscus 설정
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', 'cheongiho/cheongiho.github.io');
        script.setAttribute('data-repo-id', ''); // GitHub에서 가져와야 함
        script.setAttribute('data-category', 'Announcements');
        script.setAttribute('data-category-id', ''); // GitHub에서 가져와야 함
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'bottom');
        script.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
        script.setAttribute('data-lang', 'ko');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;
        
        giscusContainer.appendChild(script);
    }
    
    // 페이지 로드 시 게시글 로드
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadPost);
    } else {
        loadPost();
    }
})();

