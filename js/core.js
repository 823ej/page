// 🌟 GitHub Pages용 수정된 core.js - 디버그 버전
// data.json 대신 data.js의 전역 변수를 사용해요!

// 전역 앱 객체
window.App = {
  data: null,
  components: {},
  animations: {},
  utils: {}
};

// 유틸리티 함수들
App.utils = {
  // 🔧 데이터 로드 (JSON 대신 전역 변수 사용)
  async loadData() {
    try {
      // data.js에서 설정한 전역 변수 사용
      if (window.websiteData) {
        App.data = window.websiteData;
        console.log('✅ 데이터 로딩 성공!', App.data);
        return App.data;
      } else {
        // data.js가 아직 로드되지 않은 경우 잠시 기다림
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

  // 현재 페이지 파일 이름을 반환
  getCurrentPage() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    return page;
  },

  // 📍 수정된 함수: 단순하게 현재 위치 기준으로 상대 경로 생성
  getBasePath() {
    // 현재 경로에서 파일명만 제거하고 디렉토리 부분만 반환
    const path = window.location.pathname;
    const dir = path.substring(0, path.lastIndexOf('/') + 1);
    return dir;
  },
  
  // 페이지 전환 - 단순화된 버전
  navigateToPage(url) {
    console.log('🚀 페이지 이동:', url);
    // 애니메이션 제거하고 직접 이동
    window.location.href = url;
  },

  // 요소 생성 헬퍼
  createElement(tag, className = '', innerHTML = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
  },

};

// 컴포넌트 시스템
App.components = {
  // 기본 페이지 초기화
  initBasicPage() {
    console.log('📄 기본 페이지 초기화...');
    
    const contentContainer = document.querySelector('.content-container');
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');
    
    if (contentContainer) {
      setTimeout(() => contentContainer.classList.add('visible'), 100);
    }
    if (pageTitle) {
      setTimeout(() => pageTitle.classList.add('visible'), 200);
    }
    if (pageSubtitle) {
      setTimeout(() => pageSubtitle.classList.add('visible'), 300);
    }
  },

  // 메인 페이지 초기화
  initMainPage() {
    console.log('🏠 메인 페이지 초기화...');
    
    const mainImageContainer = document.querySelector('.main-image-container');
    
    if (mainImageContainer) {
      setTimeout(() => {
        mainImageContainer.classList.add('visible');
        console.log('✅ 메인 이미지 애니메이션 시작!');
      }, 300);
    }
  },

  // Introduction 페이지 초기화
  initIntroPage() {
    console.log('📖 Introduction 페이지 초기화...');
    
    // 기본 페이지 요소들 먼저 초기화
    this.initBasicPage();
    
    // Introduction 전용 요소들 순차적으로 애니메이션
    const introContent = document.querySelector('.intro-content');
    const introImage = document.querySelector('.intro-image');
    const featuresSection = document.querySelector('.features-section');
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (introContent) {
      setTimeout(() => {
        introContent.classList.add('visible');
        console.log('✅ intro-content 애니메이션 시작!');
      }, 400);
    }
    
    if (introImage) {
      setTimeout(() => {
        introImage.classList.add('visible');
        console.log('✅ intro-image 애니메이션 시작!');
      }, 600);
    }
    
    if (featuresSection) {
      setTimeout(() => {
        featuresSection.classList.add('visible');
        console.log('✅ features-section 애니메이션 시작!');
      }, 800);
    }
    
    // Feature cards를 하나씩 순차적으로 애니메이션
    featureCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
        console.log(`✅ feature-card ${index + 1} 애니메이션 시작!`);
      }, 1000 + (index * 200));
    });
  },

  // World 페이지 초기화
  initWorldPage() {
    console.log('🌍 World 페이지 초기화...');
    
    // 기본 페이지 요소들 먼저 초기화
    this.initBasicPage();
    
    // World 전용 요소들 순차적으로 애니메이션
    const worldBanner = document.querySelector('.world-banner');
    const worldContent = document.querySelector('.world-content');
    const worldImage = document.querySelector('.world-image');
    const worldFeatures = document.querySelector('.world-features');
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (worldBanner) {
      setTimeout(() => {
        worldBanner.classList.add('visible');
        console.log('✅ world-banner 애니메이션 시작!');
      }, 400);
    }
    
    if (worldContent) {
      setTimeout(() => {
        worldContent.classList.add('visible');
        console.log('✅ world-content 애니메이션 시작!');
      }, 600);
    }
    
    if (worldImage) {
      setTimeout(() => {
        worldImage.classList.add('visible');
        console.log('✅ world-image 애니메이션 시작!');
      }, 800);
    }
    
    if (worldFeatures) {
      setTimeout(() => {
        worldFeatures.classList.add('visible');
        console.log('✅ world-features 애니메이션 시작!');
      }, 1000);
    }
    
    // Feature cards를 하나씩 순차적으로 애니메이션
    featureCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
        console.log(`✅ world feature-card ${index + 1} 애니메이션 시작!`);
      }, 1200 + (index * 200));
    });
  },

  // 배경 버블 생성
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
      
      // 페이지 전환 이벤트
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
    
    // 애니메이션
    setTimeout(() => {
      nav.classList.add('visible');
    }, 100);
  },

  // 캐릭터 그리드 생성
  createCharacterGrid() {
    console.log('🔍 캐릭터 그리드 함수 실행됨!');
    
    const grid = document.getElementById('character-grid');
    if (!grid || !App.data) {
      console.log('❌ Grid나 데이터가 없음');
      return;
    }

    // 페이지 요소들을 보이게 만들기
    const contentContainer = document.querySelector('.content-container');
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');
    
    if (contentContainer) {
      setTimeout(() => contentContainer.classList.add('visible'), 100);
    }
    if (pageTitle) {
      setTimeout(() => pageTitle.classList.add('visible'), 200);
    }
    if (pageSubtitle) {
      setTimeout(() => pageSubtitle.classList.add('visible'), 300);
    }
    
    console.log('✅ 캐릭터 생성 시작');
    grid.innerHTML = '';
    
    App.data.characters.forEach((character, index) => {
      const item = App.utils.createElement('div', 'character-item');
      
      const img = App.utils.createElement('img');
      img.src = character.image;
      img.alt = character.name;
      
      item.appendChild(img);
      
      // 📍 수정된 클릭 이벤트: 더 간단한 URL 생성
      item.addEventListener('click', () => {
        const basePath = App.utils.getBasePath();
        const newUrl = basePath + 'character.html?id=' + character.id;
        console.log('🚀 캐릭터 클릭, 이동할 URL:', newUrl);
        window.location.href = newUrl;
      });
      
      grid.appendChild(item);
      
      // 캐릭터 아이템 바로 보이게 하기
      item.classList.add('visible');
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
      
      console.log(`캐릭터 ${index + 1} 생성:`, character.name);
    });
    
    console.log('✅ 모든 캐릭터 생성 완료!');
  },

  // 캐릭터 상세 페이지 생성
  createCharacterDetail(characterId) {
    console.log('👤 캐릭터 상세 페이지 생성 시작, ID:', characterId);
    
    if (!App.data || !App.data.characters) {
      console.error('❌ 데이터가 없습니다:', App.data);
      return;
    }

    const character = App.data.characters.find(c => c.id === parseInt(characterId));
    if (!character) {
      console.error('❌ 캐릭터를 찾을 수 없습니다. ID:', characterId);
      console.log('📋 사용 가능한 캐릭터들:', App.data.characters.map(c => ({id: c.id, name: c.name})));
      return;
    }

    console.log('✅ 캐릭터 데이터 찾음:', character);

    // 섹션 확인
    const listSection = document.getElementById('character-list-section');
    const detailSection = document.getElementById('character-detail-section');
    
    console.log('📋 리스트 섹션:', listSection);
    console.log('📄 상세 섹션:', detailSection);

    if (!listSection || !detailSection) {
      console.error('❌ 필요한 섹션을 찾을 수 없습니다');
      return;
    }

    // 섹션 전환
    listSection.classList.remove('active');
    detailSection.classList.add('active');
    console.log('✅ 섹션 전환 완료');

    // 상세 정보 채우기
    const elements = {
      name: document.getElementById('character-detail-name'),
      title: document.getElementById('character-detail-title'),
      description: document.getElementById('character-detail-description'),
      story: document.getElementById('character-detail-story'),
      image: document.getElementById('character-detail-image')
    };

    console.log('🔍 상세 페이지 요소들:', elements);

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
      console.log('⚡ 능력치 설정 시작:', character.stats);
      App.components.createStatDots('combat-stats', character.stats.combat);
      App.components.createStatDots('magic-stats', character.stats.magic, 'cyan');
      App.components.createStatDots('wisdom-stats', character.stats.wisdom, 'purple');
    }

    // 애니메이션 적용
    const contentContainer = document.querySelector('.content-container');
    if (contentContainer) contentContainer.classList.add('visible');

    setTimeout(() => {
      const characterDetailContent = document.querySelector('.character-detail-content');
      if (characterDetailContent) characterDetailContent.classList.add('visible');
    }, 100);

    setTimeout(() => {
      const characterImageContainer = document.querySelector('.character-image-container');
      if (characterImageContainer) characterImageContainer.classList.add('visible');
    }, 200);

    setTimeout(() => {
      const characterInfo = document.querySelector('.character-info');
      if (characterInfo) characterInfo.classList.add('visible');
    }, 300);

    console.log('✅ 캐릭터 상세 페이지 생성 완료:', character.name);
  },

  // 능력치 점수 표시
  createStatDots(containerId, value, color = 'blue') {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn(`❌ 능력치 컨테이너를 찾을 수 없습니다: ${containerId}`);
      return;
    }
    
    console.log(`⚡ 능력치 생성: ${containerId} = ${value}`);
    
    container.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
      const dot = App.utils.createElement('div', 'dot');
      if (i <= value) {
        dot.classList.add('active', color);
      }
      container.appendChild(dot);
      
      // 순차적 애니메이션
      setTimeout(() => {
        dot.classList.add('visible');
      }, 800 + (i * 100));
    }
  },

  // 아카이브 그리드 생성
  createArchiveGrid() {
    const grid = document.getElementById('archive-grid');
    if (!grid || !App.data) return;
    
    // 페이지 요소들 보이게 하기
    const contentContainer = document.querySelector('.content-container');
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');
    
    if (contentContainer) contentContainer.classList.add('visible');
    if (pageTitle) pageTitle.classList.add('visible');
    if (pageSubtitle) pageSubtitle.classList.add('visible');

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
      
      // 📍 수정된 클릭 이벤트: 더 간단한 URL 생성
      item.addEventListener('click', () => {
        const basePath = App.utils.getBasePath();
        const newUrl = basePath + 'archive.html?id=' + archive.id;
        console.log('🚀 아카이브 클릭, 이동할 URL:', newUrl);
        window.location.href = newUrl;
      });
      
      grid.appendChild(item);
      
      // 애니메이션
      item.classList.add('visible');
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    });
  },

  // 아카이브 상세 페이지 생성
  createArchiveDetail(archiveId) {
    console.log('📁 아카이브 상세 페이지 생성:', archiveId);
    
    const archive = App.data.archives.find(a => a.id === parseInt(archiveId));
    if (!archive) {
      console.error('❌ 아카이브를 찾을 수 없습니다:', archiveId);
      return;
    }

    console.log('✅ 아카이브 데이터:', archive);

    // 섹션 전환
    document.getElementById('archive-list-section').classList.remove('active');
    document.getElementById('archive-detail-section').classList.add('active');

    // 상세 정보 채우기
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
    
    // 추가 정보
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

    // 애니메이션
    const contentContainer = document.querySelector('.content-container');
    if (contentContainer) contentContainer.classList.add('visible');

    setTimeout(() => {
      const detailContent = document.querySelector('.archive-detail-content');
      if (detailContent) detailContent.classList.add('visible');
    }, 100);

    console.log('✅ 아카이브 상세 페이지 생성 완료:', archive.title);
  },

  // 블로그 리스트 생성
  createBlogList() {
    const list = document.getElementById('blog-list');
    if (!list || !App.data) return;

    // 페이지 요소들 보이게 하기  
    const contentContainer = document.querySelector('.content-container');
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');
    
    if (contentContainer) contentContainer.classList.add('visible');
    if (pageTitle) pageTitle.classList.add('visible');
    if (pageSubtitle) pageSubtitle.classList.add('visible');
    
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
      
      // 📍 수정된 클릭 이벤트: 더 간단한 URL 생성
      item.addEventListener('click', () => {
        const basePath = App.utils.getBasePath();
        const newUrl = basePath + 'blog.html?id=' + post.id;
        console.log('🚀 블로그 클릭, 이동할 URL:', newUrl);
        window.location.href = newUrl;
      });
      
      list.appendChild(item);
      
      item.classList.add('visible');
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    });
  },

  // 블로그 상세 페이지 생성
  createBlogDetail(blogId) {
    console.log('📝 블로그 상세 페이지 생성:', blogId);
    
    const post = App.data.blogPosts.find(p => p.id === parseInt(blogId));
    if (!post) {
      console.error('❌ 블로그 포스트를 찾을 수 없습니다:', blogId);
      return;
    }

    console.log('✅ 블로그 데이터:', post);

    // 섹션 전환
    document.getElementById('blog-list-section').classList.remove('active');
    document.getElementById('blog-detail-section').classList.add('active');

    // 상세 정보 채우기
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
    
    // 추가 정보
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

    // 애니메이션
    const contentContainer = document.querySelector('.content-container');
    if (contentContainer) contentContainer.classList.add('visible');

    setTimeout(() => {
      const detailContent = document.querySelector('.blog-detail-content');
      if (detailContent) detailContent.classList.add('visible');
    }, 100);

    console.log('✅ 블로그 상세 페이지 생성 완료:', post.title);
  }
};

// 페이지 초기화 시스템
App.init = async function() {
  console.log('🚀 앱 초기화 시작...');
  
  // 데이터 로드
  await App.utils.loadData();
  
  if (!App.data) {
    console.error('❌ 데이터를 로드할 수 없습니다.');
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
      console.log('👤 캐릭터 상세 페이지 모드, ID:', urlParams.id);
      App.components.createCharacterDetail(urlParams.id);
    } else {
      console.log('👥 캐릭터 목록 페이지 모드');
      App.components.createCharacterGrid();
    }
  } else if (currentPage === 'archive.html') {
    if (urlParams.id) {
      console.log('📁 아카이브 상세 페이지 모드, ID:', urlParams.id);
      App.components.createArchiveDetail(urlParams.id);
    } else {
      console.log('📚 아카이브 목록 페이지 모드');
      App.components.createArchiveGrid();
    }
  } else if (currentPage === 'blog.html') {
    if (urlParams.id) {
      console.log('📝 블로그 상세 페이지 모드, ID:', urlParams.id);
      App.components.createBlogDetail(urlParams.id);
    } else {
      console.log('📰 블로그 목록 페이지 모드');
      App.components.createBlogList();
    }
  } else if (currentPage === 'introduction.html') {
    App.components.initIntroPage();
  } else if (currentPage === 'world.html') {
    App.components.initWorldPage();
  } else if (currentPage === 'index.html' || currentPage === '') {
    App.components.initMainPage();
  }
  
  // 공통 기능 설정
  App.setupCommonFeatures();
  
  // 페이지 로딩 완료
  setTimeout(() => {
    document.body.classList.add('loaded');
    const overlay = document.getElementById('page-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }, 100);
  
  console.log('✅ 앱 초기화 완료!');
};

// 공통 기능 설정
App.setupCommonFeatures = function() {
  // 이미지 로딩 처리
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
      img.style.opacity = '0';
      img.addEventListener('load', () => {
        img.style.transition = 'opacity 0.5s ease-in-out';
        img.style.opacity = '1';
      });
    }
  });
  
  // 페이지 언로드 시 페이드아웃
  window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
  });
};

// 🎬 DOMContentLoaded에서 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
  console.log('📱 DOM 로딩 완료!');
  App.init();
});

// 페이지 쇼 이벤트 (뒤로가기 대응)
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.body.classList.add('loaded');
    document.body.style.opacity = '1';
  }
});