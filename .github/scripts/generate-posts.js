// posts.json 생성 스크립트
// 마크다운 파일에서 메타데이터를 추출하여 posts.json 생성

const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../../pages');
const outputFile = path.join(__dirname, '../../posts.json');

// 마크다운 파일에서 프론트매터 추출
function extractFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (match) {
        const frontmatterText = match[1];
        const body = match[2];
        
        const frontmatter = {};
        frontmatterText.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();
                
                // 따옴표 제거
                if ((value.startsWith('"') && value.endsWith('"')) ||
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                
                // 배열 처리
                if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
                }
                
                frontmatter[key] = value;
            }
        });
        
        return { frontmatter, body };
    }
    
    return { frontmatter: {}, body: content };
}

// 파일명에서 slug 생성
function getSlugFromFilename(filename) {
    return path.basename(filename, path.extname(filename));
}

// 게시글 제목 추출 (첫 번째 H1 또는 파일명)
function extractTitle(content, filename) {
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) {
        return h1Match[1].trim();
    }
    return getSlugFromFilename(filename);
}

// 게시글 요약 추출 (첫 번째 문단)
function extractExcerpt(content) {
    // 프론트매터 제거
    const withoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
    
    // 첫 번째 H1 제거
    const withoutH1 = withoutFrontmatter.replace(/^#\s+.+$/m, '');
    
    // 첫 번째 문단 추출
    const firstParagraph = withoutH1.match(/^(.+)$/m);
    if (firstParagraph) {
        let excerpt = firstParagraph[1].trim();
        // 마크다운 문법 제거
        excerpt = excerpt.replace(/[#*_`\[\]()]/g, '');
        if (excerpt.length > 150) {
            excerpt = excerpt.substring(0, 150) + '...';
        }
        return excerpt;
    }
    
    return '게시글 내용이 없습니다.';
}

// 게시글 메타데이터 생성
function generatePostMetadata(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const filename = path.basename(filePath);
    const slug = getSlugFromFilename(filename);
    
    const { frontmatter, body } = extractFrontmatter(content);
    
    const stats = fs.statSync(filePath);
    const date = frontmatter.date || stats.mtime.toISOString().split('T')[0];
    
    const title = frontmatter.title || extractTitle(body, filename);
    const tags = frontmatter.tags || [];
    const excerpt = frontmatter.excerpt || extractExcerpt(body);
    
    return {
        slug,
        title,
        date,
        tags: Array.isArray(tags) ? tags : [tags].filter(Boolean),
        excerpt,
        file: filename
    };
}

// 메인 함수
function main() {
    try {
        // pages 디렉토리 확인
        if (!fs.existsSync(pagesDir)) {
            console.error(`Error: ${pagesDir} 디렉토리가 존재하지 않습니다.`);
            process.exit(1);
        }
        
        // 마크다운 파일 읽기
        const files = fs.readdirSync(pagesDir)
            .filter(file => file.endsWith('.md'))
            .map(file => path.join(pagesDir, file));
        
        if (files.length === 0) {
            console.warn('Warning: 마크다운 파일이 없습니다.');
            fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
            return;
        }
        
        // 게시글 메타데이터 생성
        const posts = files.map(file => generatePostMetadata(file));
        
        // 날짜순 정렬 (최신순)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // posts.json 저장
        fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2), 'utf-8');
        
        console.log(`✅ ${posts.length}개의 게시글 메타데이터를 생성했습니다.`);
        console.log(`📄 출력 파일: ${outputFile}`);
        
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();

