// 🌟 단순화된 core.js - 확실한 상세 페이지 표시
// CSS 규칙 변경에 맞춰 JavaScript도 단순화

// 전역 앱 객체
window.App = {
  data: null,
  components: {},
  animations: {},
  utils: {}
};

// 유틸리티 함수들
App.utils = {
  // 데이터 로드
  async loadData() {
    try {
      if (window.websiteData) {
        App.data = window.websiteData;
        console.log('✅ 데이터 로딩 성공!', App.data);
        return App.data;
      } else {
        await new Promise(resolve => setTimeout(resolve, 100));
        if (window.websiteData) {
          App.data = window.websiteData;
          return App.data;
        }
        throw new Error('웹사이트 데이터를 찾을 수 없습니다');
      }
    } catch (error) {
      console.error('❌ 데이터 로드 실패:', error);
      return null;
    }
  },

  // URL 파라미터 파싱
  getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params.entries()) {
      result[key] = decodeURIComponent(value);
    }
    console.log('🔗 URL 파라미터:', result);
    return result;
  },

  // 현재 페이지 파일 이름
  getCurrentPage() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    console.log('📄 현재 페이지:', page);
    return page;
  },

  // 간단한 베이스 경로
  getBasePath() {
    return './';
  },
  
  // 페이지 전환
  navigateToPage(url) {
    console.log('🚀 페이지 이동:', url);
    window.location.href = url;
  },

  // 요소 생성 헬퍼
  createElement(tag, className = '', innerHTML = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
  }
};

// 컴포넌트 시스템
App.components = {
  // 기본 페이지 초기화
  initBasicPage() {
    console.log('📄 기본 페이지 초기화...');
    // CSS가 이미 보이도록 설정되어 있으므로 추가 작업 불필요
  },

  // 메인 페이지 초기화
  initMainPage() {
    console.log('🏠 메인 페이지 초기화...');
    // float 애니메이션은 CSS에서 처리됨
  },

  // Introduction 페이지 초기화
  initIntroPage() {
    console.log('📖 Introduction 페이지 초기화...');
    this.initBasicPage();
  },

  // World 페이지 초기화
  initWorldPage() {
    console.log('🌍 World 페이지 초기화...');
    this.initBasicPage();
  },

  // 배경 버블 생성 - 유지
  createBackgroundBubbles() {
    const container = document.createElement('div');
    container.id = 'background-bubbles';
    
    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      const size = Math.random() * 20 + 10;
      
      bubble.style.left = Math.random() * 100 + '%';
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.animationDuration = (Math.random() * 15 + 15) + 's';
      bubble.style.animationDelay = (Math.random() * -15) + 's';
      
      container.appendChild(bubble);
    }
    
    document.body.insertBefore(container, document.body.firstChild);
    console.log('🫧 물거품 효과 추가됨!');
  },

  // 네비게이션 생성
  createNavigation(activePage) {
    const nav = document.querySelector('.navbar');
    if (!nav || !App.data) return;
    
    const container = App.utils.createElement('div', 'nav-container');
    const links = App.utils.createElement('div', 'nav-links');

    App.data.site.navigation.forEach(item => {
      const link = App.utils.createElement('a', 'nav-btn', item.text);
      link.href = item.href;
      if (item.href === activePage) {
        link.classList.add('active');
      }
      
      link.addEventListener('click', (e) => {
        if (item.href === activePage) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        App.utils.navigateToPage(item.href);
      });
      
      links.appendChild(link);
    });

    container.appendChild(links);
    nav.innerHTML = '';
    nav.appendChild(container);
    nav.classList.add('visible');
  },

  // 캐릭터 그리드 생성
  createCharacterGrid() {
    console.log('🔍 캐릭터 그리드 생성');
    
    const grid = document.getElementById('character-grid');
    if (!grid || !App.data || !App.data.characters) return;

    grid.innerHTML = '';
    
    App.data.characters.forEach((character, index) => {
      const item = App.utils.createElement('div', 'character-item');
      
      const img = App.utils.createElement('img');
      img.src = character.image;
      img.alt = character.name;
      
      item.appendChild(img);
      
      item.addEventListener('click', () => {
        console.log('🖱️ 캐릭터 클릭:', character.name);
        const newUrl = App.utils.getBasePath() + 'character.html?id=' + character.id;
        console.log('🚀 이동할 URL:', newUrl);
        window.location.href = newUrl;
      });
      
      grid.appendChild(item);
      
      console.log(`✅ 캐릭터 ${index + 1} 생성:`, character.name);
    });
  },

  // 🎯 핵심: 단순화된 캐릭터 상세 페이지 생성
  createCharacterDetail(characterId) {
    console.log('👤 캐릭터 상세 페이지 생성, ID:', characterId);
    
    if (!App.data || !App.data.characters) {
      console.error('❌ 데이터 없음');
      return;
    }

    const character = App.data.characters.find(c => c.id === parseInt(characterId));
    if (!character) {
      console.error('❌ 캐릭터 없음, ID:', characterId);
      return;
    }

    console.log('✅ 캐릭터 데이터:', character);

    // 🔥 단순한 섹션 전환: 목록 숨기기, 상세 보이기
    const listSection = document.getElementById('character-list-section');
    const detailSection = document.getElementById('character-detail-section');
    
    if (listSection) {
      listSection.classList.add('hide-for-detail'); // CSS 클래스로 숨김
      console.log('📋 목록 섹션 숨김');
    }
    
    if (detailSection) {
      detailSection.classList.add('active'); // CSS 클래스로 강제 표시
      console.log('📄 상세 섹션 표시');
    }

    // 데이터 채우기
    const elements = {
      name: document.getElementById('character-detail-name'),
      title: document.getElementById('character-detail-title'),
      description: document.getElementById('character-detail-description'),
      story: document.getElementById('character-detail-story'),
      image: document.getElementById('character-detail-image')
    };

    if (elements.name) elements.name.textContent = character.name;
    if (elements.title) elements.title.textContent = character.title;
    if (elements.description) elements.description.textContent = character.description;
    if (elements.story) elements.story.textContent = character.story;
    if (elements.image) {
      elements.image.src = character.fullImage || character.image;
      elements.image.alt = character.name;
    }

    // 능력치 표시
    if (character.stats) {
      this.createStatDots('combat-stats', character.stats.combat);
      this.createStatDots('magic-stats', character.stats.magic, 'cyan');
      this.createStatDots('wisdom-stats', character.stats.wisdom, 'purple');
    }

    // 스크롤을 맨 위로
    window.scrollTo(0, 0);

    console.log('🎉 캐릭터 상세 페이지 완료:', character.name);
    
    // 성공 확인
    setTimeout(() => {
      const isVisible = detailSection && detailSection.offsetHeight > 0;
      console.log('🔍 상세 섹션 표시 상태:', isVisible);
      if (isVisible) {
        console.log('✅ 상세 페이지가 성공적으로 표시됨!');
      } else {
        console.error('❌ 여전히 표시되지 않음');
      }
    }, 100);
  },

  // 능력치 점수 표시
  createStatDots(containerId, value, color = 'blue') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
      const dot = App.utils.createElement('div', 'dot visible'); // visible 클래스 추가
      if (i <= value) {
        dot.classList.add('active', color);
      }
      container.appendChild(dot);
    }

    // 능력치 행 표시
    const statRows = document.querySelectorAll('.stat-row');
    statRows.forEach(row => {
      row.classList.add('visible');
    });
  },

  // 아카이브 그리드 생성
  createArchiveGrid() {
    console.log('📁 아카이브 그리드 생성');
    
    const grid = document.getElementById('archive-grid');
    if (!grid || !App.data || !App.data.archives) return;

    grid.innerHTML = '';
    
    App.data.archives.forEach((archive, index) => {
      const item = App.utils.createElement('div', 'archive-item');
      
      const imageDiv = App.utils.createElement('div', 'archive-image');
      const img = App.utils.createElement('img');
      img.src = archive.image;
      img.alt = archive.title;
      imageDiv.appendChild(img);
      
      const info = App.utils.createElement('div', 'archive-info');
      const date = App.utils.createElement('span', 'archive-date', archive.date);
      const title = App.utils.createElement('h3', 'archive-title', archive.title);
      
      info.appendChild(date);
      info.appendChild(title);
      item.appendChild(imageDiv);
      item.appendChild(info);
      
      item.addEventListener('click', () => {
        const newUrl = App.utils.getBasePath() + 'archive.html?id=' + archive.id;
        console.log('🚀 아카이브 이동:', newUrl);
        window.location.href = newUrl;
      });
      
      grid.appendChild(item);
    });
  },

  // 아카이브 상세 페이지 생성
  createArchiveDetail(archiveId) {
    console.log('📁 아카이브 상세 페이지 생성:', archiveId);
    
    const archive = App.data.archives.find(a => a.id === parseInt(archiveId));
    if (!archive) {
      console.error('❌ 아카이브 없음');
      return;
    }

    // 단순한 섹션 전환
    const listSection = document.getElementById('archive-list-section');
    const detailSection = document.getElementById('archive-detail-section');
    
    if (listSection) listSection.classList.add('hide-for-detail');
    if (detailSection) detailSection.classList.add('active');

    // 데이터 채우기
    const elements = {
      title: document.getElementById('archive-detail-title'),
      type: document.getElementById('archive-detail-type'),
      date: document.getElementById('archive-detail-date'),
      description: document.getElementById('archive-detail-description'),
      details: document.getElementById('archive-detail-details'),
      image: document.getElementById('archive-detail-image')
    };

    if (elements.title) elements.title.textContent = archive.title;
    if (elements.type) elements.type.textContent = archive.type;
    if (elements.date) elements.date.textContent = archive.date;
    if (elements.description) elements.description.textContent = archive.description;
    if (elements.details) elements.details.textContent = archive.content;
    
    if (archive.genre) {
      const genreEl = document.getElementById('archive-detail-genre');
      if (genreEl) genreEl.textContent = `장르: ${archive.genre}`;
    }
    if (archive.duration) {
      const durationEl = document.getElementById('archive-detail-duration');
      if (durationEl) durationEl.textContent = `제작 기간: ${archive.duration}`;
    }
    if (archive.tools) {
      const toolsEl = document.getElementById('archive-detail-tools');
      if (toolsEl) toolsEl.textContent = `제작 도구: ${archive.tools}`;
    }
    
    if (elements.image) {
      elements.image.src = archive.fullImage || archive.image;
      elements.image.alt = archive.title;
    }

    window.scrollTo(0, 0);
    console.log('✅ 아카이브 상세 페이지 완료:', archive.title);
  },

  // 블로그 리스트 생성
  createBlogList() {
    console.log('📝 블로그 리스트 생성');
    
    const list = document.getElementById('blog-list');
    if (!list || !App.data || !App.data.blogPosts) return;
    
    list.innerHTML = '';
    
    App.data.blogPosts.forEach((post, index) => {
      const item = App.utils.createElement('div', 'blog-list-item');
      
      const content = App.utils.createElement('div', 'blog-list-content');
      const title = App.utils.createElement('h3', 'blog-list-title', post.title);
      const meta = App.utils.createElement('div', 'blog-list-meta');
      const category = App.utils.createElement('span', 'blog-list-category', post.category);
      const date = App.utils.createElement('span', 'blog-list-date', post.date);
      
      meta.appendChild(category);
      meta.appendChild(date);
      content.appendChild(title);
      content.appendChild(meta);
      item.appendChild(content);
      
      item.addEventListener('click', () => {
        const newUrl = App.utils.getBasePath() + 'blog.html?id=' + post.id;
        console.log('🚀 블로그 이동:', newUrl);
        window.location.href = newUrl;
      });
      
      list.appendChild(item);
    });
  },

  // 블로그 상세 페이지 생성
  createBlogDetail(blogId) {
    console.log('📝 블로그 상세 페이지 생성:', blogId);
    
    const post = App.data.blogPosts.find(p => p.id === parseInt(blogId));
    if (!post) {
      console.error('❌ 블로그 포스트 없음');
      return;
    }

    // 단순한 섹션 전환
    const listSection = document.getElementById('blog-list-section');
    const detailSection = document.getElementById('blog-detail-section');
    
    if (listSection) listSection.classList.add('hide-for-detail');
    if (detailSection) detailSection.classList.add('active');

    // 데이터 채우기
    const elements = {
      title: document.getElementById('blog-detail-title'),
      category: document.getElementById('blog-detail-category'),
      date: document.getElementById('blog-detail-date'),
      description: document.getElementById('blog-detail-description'),
      content: document.getElementById('blog-detail-content'),
      image: document.getElementById('blog-detail-image')
    };

    if (elements.title) elements.title.textContent = post.title;
    if (elements.category) elements.category.textContent = post.category;
    if (elements.date) elements.date.textContent = post.date;
    if (elements.description) elements.description.textContent = post.description;
    if (elements.content) elements.content.textContent = post.content;
    
    if (post.readTime) {
      const readTimeEl = document.getElementById('blog-detail-readtime');
      if (readTimeEl) readTimeEl.textContent = `읽는 시간: ${post.readTime}`;
    }
    if (post.views) {
      const viewsEl = document.getElementById('blog-detail-views');
      if (viewsEl) viewsEl.textContent = `조회수: ${post.views}`;
    }
    if (post.tags && post.tags.length > 0) {
      const tagsEl = document.getElementById('blog-detail-tags');
      if (tagsEl) tagsEl.innerHTML = '<strong>태그:</strong> ' + post.tags.join(', ');
    }
    
    if (elements.image) {
      elements.image.src = post.fullImage || post.image;
      elements.image.alt = post.title;
    }

    window.scrollTo(0, 0);
    console.log('✅ 블로그 상세 페이지 완료:', post.title);
  }
};

// 페이지 초기화 시스템
App.init = async function() {
  console.log('🚀 앱 초기화 시작...');
  console.log('🌐 현재 URL:', window.location.href);
  
  // 데이터 로드
  await App.utils.loadData();
  
  if (!App.data) {
    console.error('❌ 데이터 로드 실패');
    return;
  }

  // 현재 페이지와 URL 파라미터 확인
  const currentPage = App.utils.getCurrentPage();
  const urlParams = App.utils.getUrlParams();
  
  console.log('📄 현재 페이지:', currentPage);
  console.log('🔗 URL 파라미터:', urlParams);

  // 🫧 물거품 효과 추가
  App.components.createBackgroundBubbles();
  
  // 네비게이션 생성
  App.components.createNavigation(currentPage);
  
  // 페이지별 콘텐츠 생성
  if (currentPage === 'character.html') {
    if (urlParams.id) {
      console.log('👤 캐릭터 상세 모드, ID:', urlParams.id);
      App.components.createCharacterDetail(urlParams.id);
    } else {
      console.log('📋 캐릭터 목록 모드');
      App.components.createCharacterGrid();
    }
  } else if (currentPage === 'archive.html') {
    if (urlParams.id) {
      console.log('📁 아카이브 상세 모드, ID:', urlParams.id);
      App.components.createArchiveDetail(urlParams.id);
    } else {
      console.log('📚 아카이브 목록 모드');
      App.components.createArchiveGrid();
    }
  } else if (currentPage === 'blog.html') {
    if (urlParams.id) {
      console.log('📝 블로그 상세 모드, ID:', urlParams.id);
      App.components.createBlogDetail(urlParams.id);
    } else {
      console.log('📰 블로그 목록 모드');
      App.components.createBlogList();
    }
  } else if (currentPage === 'introduction.html') {
    App.components.initIntroPage();
  } else if (currentPage === 'world.html') {
    App.components.initWorldPage();
  } else if (currentPage === 'index.html' || currentPage === '') {
    App.components.initMainPage();
  }
  
  // 페이지 로딩 완료
  document.body.classList.add('loaded');
  const overlay = document.getElementById('page-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
  
  console.log('✅ 앱 초기화 완료!');
};

// DOM 로딩 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
  console.log('📱 DOM 로딩 완료!');
  App.init();
});

// 페이지 쇼 이벤트
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.body.classList.add('loaded');
    document.body.style.opacity = '1';
  }
});