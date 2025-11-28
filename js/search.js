// 검색 및 태그 필터 기능

(function() {
    let allPosts = [];
    let filteredPosts = [];
    let activeTag = null;
    
    const searchInput = document.getElementById('search-input');
    const tagFilter = document.getElementById('tag-filter');
    const postsContainer = document.getElementById('posts-container');
    
    // 검색 입력 이벤트
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterPosts(e.target.value, activeTag);
        });
    }
    
    // 태그 필터 함수
    function filterPosts(searchTerm = '', tag = null) {
        activeTag = tag;
        
        filteredPosts = allPosts.filter(post => {
            const matchesSearch = !searchTerm || 
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
            
            const matchesTag = !tag || post.tags.includes(tag);
            
            return matchesSearch && matchesTag;
        });
        
        renderPosts(filteredPosts);
        updateTagButtons();
    }
    
    // 태그 버튼 클릭 이벤트
    function handleTagClick(tag) {
        const newTag = activeTag === tag ? null : tag;
        filterPosts(searchInput?.value || '', newTag);
    }
    
    // 태그 버튼 업데이트
    function updateTagButtons() {
        if (!tagFilter) return;
        
        const buttons = tagFilter.querySelectorAll('.tag-btn');
        buttons.forEach(btn => {
            if (btn.dataset.tag === activeTag) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // 게시글 목록 렌더링
    function renderPosts(posts) {
        if (!postsContainer) return;
        
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p class="loading">검색 결과가 없습니다.</p>';
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
    
    // 태그 필터 UI 생성
    function createTagFilter(posts) {
        if (!tagFilter) return;
        
        const allTags = [...new Set(posts.flatMap(post => post.tags))].sort();
        
        if (allTags.length === 0) return;
        
        tagFilter.innerHTML = allTags.map(tag => `
            <button class="tag-btn" data-tag="${tag}">${tag}</button>
        `).join('');
        
        tagFilter.querySelectorAll('.tag-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                handleTagClick(btn.dataset.tag);
            });
        });
    }
    
    // 외부에서 사용할 수 있도록 export
    window.searchModule = {
        init: function(posts) {
            allPosts = posts;
            filteredPosts = [...posts];
            createTagFilter(posts);
            renderPosts(posts);
        },
        filterPosts: filterPosts
    };
})();

