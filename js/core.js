// 🌟 확실히 작동하는 core.js
// 섹션 전환을 확실하게 보장하는 버전

// 전역 앱 객체
window.App = {
  data: null,
  components: {},
  utils: {}
};

// 유틸리티 함수들
App.utils = {
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

  getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params.entries()) {
      result[key] = decodeURIComponent(value);
    }
    console.log('🔗 URL 파라미터:', result);
    return result;
  },

  getCurrentPage() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    console.log('📄 현재 페이지:', page);
    return page;
  },

  getBasePath() {
    return './';
  },
  
  navigateToPage(url) {
    console.log('🚀 페이지 이동:', url);
    window.location.href = url;
  },

  createElement(tag, className = '', innerHTML = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
  },

  // 🔥 확실한 섹션 전환 함수
  showSection(sectionId) {
    console.log('🔄 섹션 전환 시작:', sectionId);
    
    // 모든 섹션 숨기기
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
      console.log('📵 섹션 숨김:', section.id);
    });
    
    // 지정된 섹션만 보이기
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.style.display = 'block';
      targetSection.style.opacity = '1';
      targetSection.style.visibility = 'visible';
      console.log('✅ 섹션 표시:', sectionId);
      
      // 0.1초 후 한 번 더 확인
      setTimeout(() => {
        if (targetSection.style.display !== 'block') {
          targetSection.style.display = 'block';
          targetSection.style.opacity = '1';
          targetSection.style.visibility = 'visible';
          console.log('🔄 섹션 재표시:', sectionId);
        }
      }, 100);
    } else {
      console.error('❌ 섹션을 찾을 수 없음:', sectionId);
    }
  }
};

// 컴포넌트 시스템
App.components = {
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
    nav.style.opacity = '1';
    nav.style.transform = 'translateY(0)';
  },

  // 캐릭터 그리드 생성
  createCharacterGrid() {
    console.log('🔍 캐릭터 그리드 생성');
    
    const grid = document.getElementById('character-grid');
    if (!grid || !App.data || !App.data.characters) {
      console.error('❌ 캐릭터 그리드 생성 불가');
      return;
    }

    grid.innerHTML = '';
    
    App.data.characters.forEach((character, index) => {
      const item = App.utils.createElement('div', 'character-item');
      
      const img = App.utils.createElement('img');
      img.src = character.image;
      img.alt = character.name;
      
      item.appendChild(img);
      
      // 클릭 이벤트
      item.addEventListener('click', () => {
        console.log('🖱️ 캐릭터 클릭:', character.name, 'ID:', character.id);
        const newUrl = App.utils.getBasePath() + 'character.html?id=' + character.id;
        console.log('🚀 이동할 URL:', newUrl);
        window.location.href = newUrl;
      });
      
      // 스타일 적용
      item.classList.add('visible');
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
      
      grid.appendChild(item);
      
      console.log(`✅ 캐릭터 ${index + 1} 생성:`, character.name);
    });
    
    console.log('✅ 캐릭터 그리드 생성 완료');
  },

  // 🎯 캐릭터 상세 페이지 생성 - 확실한 버전
  createCharacterDetail(characterId) {
    console.log('👤 캐릭터 상세 페이지 생성 시작, ID:', characterId);
    
    if (!App.data || !App.data.characters) {
      console.error('❌ 데이터 없음');
      return;
    }

    const character = App.data.characters.find(c => c.id === parseInt(characterId));
    if (!character) {
      console.error('❌ 캐릭터 없음, ID:', characterId);
      console.log('🔍 사용 가능한 캐릭터:', App.data.characters.map(c => ({id: c.id, name: c.name})));
      return;
    }

    console.log('✅ 캐릭터 데이터 찾음:', character);

    // 🔥 확실한 섹션 전환
    App.utils.showSection('character-detail-section');
    
    // 데이터 채우기
    const elements = {
      name: document.getElementById('character-detail-name'),
      title: document.getElementById('character-detail-title'),
      description: document.getElementById('character-detail-description'),
      story: document.getElementById('character-detail-story'),
      image: document.getElementById('character-detail-image')
    };

    console.log('🔍 상세 페이지 요소들 존재 여부:', Object.keys(elements).map(key => ({[key]: !!elements[key]})));

    // 데이터 설정
    if (elements.name) {
      elements.name.textContent = character.name;
      console.log('✅ 이름 설정:', character.name);
    }
    if (elements.title) {
      elements.title.textContent = character.title;
      console.log('✅ 타이틀 설정:', character.title);
    }
    if (elements.description) {
      elements.description.textContent = character.description;
      console.log('✅ 설명 설정');
    }
    if (elements.story) {
      elements.story.textContent = character.story;
      console.log('✅ 스토리 설정');
    }
    if (elements.image) {
      elements.image.src = character.fullImage || character.image;
      elements.image.alt = character.name;
      console.log('✅ 이미지 설정:', character.fullImage || character.image);
    }

    // 능력치 표시
    if (character.stats) {
      console.log('⚡ 능력치 설정:', character.stats);
      this.createStatDots('combat-stats', character.stats.combat);
      this.createStatDots('magic-stats', character.stats.magic, 'cyan');
      this.createStatDots('wisdom-stats', character.stats.wisdom, 'purple');
    }

    // 스크롤을 맨 위로
    window.scrollTo(0, 0);

    console.log('🎉 캐릭터 상세 페이지 생성 완료:', character.name);
    
    // 최종 확인
    setTimeout(() => {
      const detailSection = document.getElementById('character-detail-section');
      const isVisible = detailSection && detailSection.style.display === 'block';
      console.log('🔍 최종 확인 - 상세 섹션 표시 상태:', isVisible);
      
      if (!isVisible) {
        console.error('❌ 여전히 상세 섹션이 보이지 않음 - 강제 재설정');
        App.utils.showSection('character-detail-section');
      } else {
        console.log('✅ 상세 페이지 정상 표시됨!');
      }
    }, 200);
  },

  // 능력치 점수 표시
  createStatDots(containerId, value, color = 'blue') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
      const dot = App.utils.createElement('div', 'dot visible');
      if (i <= value) {
        dot.classList.add('active', color);
      }
      dot.style.transform = 'scale(1)';
      container.appendChild(dot);
    }

    const statRows = document.querySelectorAll('.stat-row');
    statRows.forEach(row => {
      row.classList.add('visible');
      row.style.opacity = '1';
      row.style.transform = 'translateX(0)';
    });
  },

  // 아카이브 그리드 생성
  createArchiveGrid() {
    const grid = document.getElementById('archive-grid');
    if (!grid || !App.data || !App.data.archives) return;

    grid.innerHTML = '';
    
    App.data.archives.forEach((archive) => {
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
        window.location.href = newUrl;
      });
      
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
      
      grid.appendChild(item);
    });
  },

  // 아카이브 상세 페이지 생성
  createArchiveDetail(archiveId) {
    const archive = App.data.archives.find(a => a.id === parseInt(archiveId));
    if (!archive) return;

    App.utils.showSection('archive-detail-section');

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
  },

  // 블로그 리스트 생성
  createBlogList() {
    const list = document.getElementById('blog-list');
    if (!list || !App.data || !App.data.blogPosts) return;
    
    list.innerHTML = '';
    
    App.data.blogPosts.forEach((post) => {
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
        window.location.href = newUrl;
      });
      
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
      
      list.appendChild(item);
    });
  },

  // 블로그 상세 페이지 생성
  createBlogDetail(blogId) {
    const post = App.data.blogPosts.find(p => p.id === parseInt(blogId));
    if (!post) return;

    App.utils.showSection('blog-detail-section');

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

  // 물거품 효과 추가
  App.components.createBackgroundBubbles();
  
  // 네비게이션 생성
  App.components.createNavigation(currentPage);
  
  // 🔥 페이지별 콘텐츠 생성 - 확실한 조건 분기
  if (currentPage === 'character.html') {
    if (urlParams.id) {
      console.log('👤 캐릭터 상세 모드, ID:', urlParams.id);
      App.components.createCharacterDetail(urlParams.id);
    } else {
      console.log('📋 캐릭터 목록 모드');
      App.utils.showSection('character-list-section');
      App.components.createCharacterGrid();
    }
  } else if (currentPage === 'archive.html') {
    if (urlParams.id) {
      console.log('📁 아카이브 상세 모드, ID:', urlParams.id);
      App.components.createArchiveDetail(urlParams.id);
    } else {
      console.log('📚 아카이브 목록 모드');
      App.utils.showSection('archive-list-section');
      App.components.createArchiveGrid();
    }
  } else if (currentPage === 'blog.html') {
    if (urlParams.id) {
      console.log('📝 블로그 상세 모드, ID:', urlParams.id);
      App.components.createBlogDetail(urlParams.id);
    } else {
      console.log('📰 블로그 목록 모드');
      App.utils.showSection('blog-list-section');
      App.components.createBlogList();
    }
  } else {
    // 다른 페이지들은 기본 active 섹션 유지
    console.log('🏠 기타 페이지:', currentPage);
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