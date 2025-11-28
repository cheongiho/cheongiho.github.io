// 메인 애플리케이션 로직 - 게시글 목록 로드

(function() {
    const postsContainer = document.getElementById('posts-container');
    
    // posts.json 로드
    async function loadPosts() {
        try {
            const response = await fetch('posts.json');
            if (!response.ok) {
                throw new Error('게시글을 불러올 수 없습니다.');
            }
            
            const posts = await response.json();
            
            // 날짜순 정렬 (최신순)
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // 검색 모듈 초기화
            if (window.searchModule) {
                window.searchModule.init(posts);
            } else {
                // 검색 모듈이 아직 로드되지 않은 경우
                renderPosts(posts);
            }
        } catch (error) {
            console.error('게시글 로드 오류:', error);
            if (postsContainer) {
                postsContainer.innerHTML = `
                    <p class="loading">게시글을 불러오는 중 오류가 발생했습니다.</p>
                    <p class="loading" style="font-size: 0.875rem; margin-top: 0.5rem;">
                        posts.json 파일이 존재하는지 확인해주세요.
                    </p>
                `;
            }
        }
    }
    
    // 게시글 목록 렌더링 (검색 모듈이 없을 때 사용)
    function renderPosts(posts) {
        if (!postsContainer) return;
        
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p class="loading">게시글이 없습니다.</p>';
            return;
        }
        
        postsContainer.innerHTML = posts.map(post => `
            <a href="post.html?slug=${post.slug}" class="post-card">
                <h2>${post.title}</h2>
                <div class="post-meta">
                    ${post.date} ${post.tags.length > 0 ? '• ' + post.tags.join(', ') : ''}
                </div>
                <div class="post-excerpt">${post.excerpt}</div>
                ${post.tags.length > 0 ? `
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </a>
        `).join('');
    }
    
    // 페이지 로드 시 게시글 로드
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadPosts);
    } else {
        loadPosts();
    }
})();

