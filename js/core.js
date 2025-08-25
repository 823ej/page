// 🌟 GitHub Pages용 수정된 core.js - 애니메이션 단순화 버전
// 전환 애니메이션 제거, 물거품과 메인 이미지 float만 유지

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

  // 📍 단순하게 현재 위치 기준으로 상대 경로 생성
  getBasePath() {
    // 현재 경로에서 파일명만 제거하고 디렉토리 부분만 반환
    const path = window.location.pathname;
    const dir = path.substring(0, path.lastIndexOf('/') + 1);
    return dir;
  },
  
  // 페이지 전환 - 단순화된 버전
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
  // 기본 페이지 초기화 - 애니메이션 제거
  initBasicPage() {
    console.log('📄 기본 페이지 초기화...');
    
    // 애니메이션 없이 바로 표시
    const contentContainer = document.querySelector('.content-container');
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');
    
    if (contentContainer) {
      contentContainer.classList.add('visible');
      contentContainer.style.opacity = '1';
      contentContainer.style.transform = 'translateY(0)';
    }
    if (pageTitle) {
      pageTitle.classList.add('visible');
      pageTitle.style.opacity = '1';
      pageTitle.style.transform = 'translateY(0)';
    }
    if (pageSubtitle) {
      pageSubtitle.classList.add('visible');
      pageSubtitle.style.opacity = '1';
      pageSubtitle.style.transform = 'translateY(0)';
    }
  },

  // 메인 페이지 초기화 - 둥실둥실 애니메이션만 유지
  initMainPage() {
    console.log('🏠 메인 페이지 초기화...');
    
    const mainImageContainer = document.querySelector('.main-image-container');
    
    if (mainImageContainer) {
      // 애니메이션 없이 바로 표시하되, float 효과는 CSS에서 유지됨
      mainImageContainer.classList.add('visible');
      mainImageContainer.style.opacity = '1';
      mainImageContainer.style.transform = 'scale(1)';
      console.log('✅ 메인 이미지 표시!');
    }
  },

  // Introduction 페이지 초기화 - 애니메이션 제거
  initIntroPage() {
    console.log('📖 Introduction 페이지 초기화...');
    
    // 기본 페이지 요소들 먼저 초기화
    this.initBasicPage();
    
    // Introduction 전용 요소들 바로 표시
    const introContent = document.querySelector('.intro-content');
    const introImage = document.querySelector('.intro-image');
    const featuresSection = document.querySelector('.features-section');
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (introContent) {
      introContent.classList.add('visible');
      introContent.style.opacity = '1';
      introContent.style.transform = 'translateY(0)';
    }
    
    if (introImage) {
      introImage.classList.add('visible');
      introImage.style.opacity = '1';
      introImage.style.transform = 'translateX(0)';
    }
    
    if (featuresSection) {
      featuresSection.classList.add('visible');
      featuresSection.style.opacity = '1';
      featuresSection.style.transform = 'translateY(0)';
    }
    
    // Feature cards 바로 표시
    featureCards.forEach((card, index) => {
      card.classList.add('visible');
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  },

  // World 페이지 초기화 - 애니메이션 제거
  initWorldPage() {
    console.log('🌍 World 페이지 초기화...');
    
    // 기본 페이지 요소들 먼저 초기화
    this.initBasicPage();
    
    // World 전용 요소들 바로 표시
    const worldBanner = document.querySelector('.world-banner');
    const worldContent = document.querySelector('.world-content');
    const worldImage = document.querySelector('.world-image');
    const worldFeatures = document.querySelector('.world-features');
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (worldBanner) {
      worldBanner.classList.add('visible');
      worldBanner.style.opacity = '1';
      worldBanner.style.transform = 'translateY(0)';
    }
    
    if (worldContent) {
      worldContent.classList.add('visible');
      worldContent.style.opacity = '1';
      worldContent.style.transform = 'translateY(0)';
    }
    
    if (worldImage) {
      worldImage.classList.add('visible');
      worldImage.style.opacity = '1';
      worldImage.style.transform = 'translateX(0)';
    }
    
    if (worldFeatures) {
      worldFeatures.classList.add('visible');
      worldFeatures.style.opacity = '1';
      worldFeatures.style.transform = 'translateY(0)';
    }
    
    // Feature cards 바로 표시
    featureCards.forEach((card, index) => {
      card.classList.add('visible');
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
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

  // 네비게이션 생성 - 애니메이션 단순화
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
    
    // 애니메이션 없이 바로 표시
    nav.classList.add('visible');
    nav.style.opacity = '1';
    nav.style.transform = 'translateY(0)';
  },

  // 캐릭터 그리드 생성 - 애니메이션 제거
  createCharacterGrid() {
    console.log('🔍 캐릭터 그리드 함수 실행됨!');
    
    const grid = document.getElementById('character-grid');
    if (!grid || !App.data) {
      console.log('❌ Grid나 데이터가 없음');
      return;
    }

    // 페이지 요소들을 바로 보이게 만들기
    const contentContainer = document.querySelector('.content-container');
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');
    
    if (contentContainer) {
      contentContainer.classList.add('visible');
      contentContainer.style.opacity = '1';
      contentContainer.style.transform = 'translateY(0)';
    }
    if (pageTitle) {
      pageTitle.classList.add('visible');
      pageTitle.style.opacity = '1';
      pageTitle.style.transform = 'translateY(0)';
    }
    if (pageSubtitle) {
      pageSubtitle.classList.add('visible');
      pageSubtitle.style.opacity = '1';
      pageSubtitle.style.transform = 'translateY(0)';
    }
    
    console.log('✅ 캐릭터 생성 시작');
    grid.innerHTML = '';
    
    App.data.characters.forEach((character, index) => {
      const item = App.utils.createElement('div', 'character-item');
      
      const img = App.utils.createElement('img');
      img.src = character.image;
      img.alt = character.name;
      
      item.appendChild(img);
      
      item.addEventListener('click', () => {
        const basePath = App.utils.getBasePath();
        const newUrl = basePath + 'character.html?id=' + character.id;
        console.log('🚀 캐릭터 클릭, 이동할 URL:', newUrl);
        window.location.href = newUrl;
      });
      
      grid.appendChild(item);
      
      // 애니메이션 없이 바로 보이게 하기
      item.classList.add('visible');
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
      
      console.log(`캐릭터 ${index + 1} 생성:`, character.name);
    });
    
    console.log('✅ 모든 캐릭터 생성 완료!');
  },

  // 캐릭터 상세 페이지 생성 - 애니메이션 제거
  createCharacterDetail(characterId) {
    console.log('👤 캐릭터 상세 페이지 생성 시작, ID:', characterId);
    
    if (!App.data || !App.data.characters) {
      console.error('❌ 데이터가 없습니다:', App.data);
      return;
    }

    const character = App.data.characters.find(c => c.id === parseInt(characterId));
    if (!character) {
      console.error('❌ 캐릭터를 찾을 수 없습니다. ID:', characterId);
      return;
    }

    console.log('✅ 캐릭터 데이터 찾음:', character);

    // 섹션 전환
    const listSection = document.getElementById('character-list-section');
    const detailSection = document.getElementById('character-detail-section');
    
    if (!listSection || !detailSection) {
      console.error('❌ 필요한 섹션을 찾을 수 없습니다');
      return;
    }

    listSection.classList.remove('active');
    detailSection.classList.add('active');

    // 상세 정보 채우기
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
      App.components.createStatDots('combat-stats', character.stats.combat);
      App.components.createStatDots('magic-stats', character.stats.magic, 'cyan');
      App.components.createStatDots('wisdom-stats', character.stats.wisdom, 'purple');
    }

    // 애니메이션 없이 바로 표시
    const contentContainer = document.querySelector('.content-container');
    const characterDetailContent = document.querySelector('.character-detail-content');
    const characterImageContainer = document.querySelector('.character-image-container');
    const characterInfo = document.querySelector('.character-info');

    if (contentContainer) {
      contentContainer.classList.add('visible');
      contentContainer.style.opacity = '1';
      contentContainer.style.transform = 'translateY(0)';
    }
    if (characterDetailContent) {
      characterDetailContent.classList.add('visible');
      characterDetailContent.style.opacity = '1';
      characterDetailContent.style.transform = 'translateY(0)';
    }
    if (characterImageContainer) {
      characterImageContainer.classList.add('visible');
      characterImageContainer.style.opacity = '1';
      characterImageContainer.style.transform = 'translateX(0)';
    }
    if (characterInfo) {
      characterInfo.classList.add('visible');
      characterInfo.style.opacity = '1';
      characterInfo.style.transform = 'translateX(0)';
    }

    console.log('✅ 캐릭터 상세 페이지 생성 완료:', character.name);
  },

  // 능력치 점수 표시 - 애니메이션 단순화
  createStatDots(containerId, value, color = 'blue') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
      const dot = App.utils.createElement('div', 'dot');
      if (i <= value) {
        dot.classList.add('active', color);
      }
      container.appendChild(dot);
      
      // 애니메이션 없이 바로 표시
      dot.classList.add('visible');
      dot.style.transform = 'scale(1)';
    }

    // 능력치 행도 바로 표시
    const statRows = document.querySelectorAll('.stat-row');
    statRows.forEach(row => {
      row.classList.add('visible');
      row.style.opacity = '1';
      row.style.transform = 'translateX(0)';
    });
  },

  // 아카이브 그리드 생성 - 애니메이션 제거
  createArchiveGrid() {
    const grid = document.getElementById('archive-grid');
    if (!grid || !App.data) return;
    
    // 페이지 요소들 바로 보이게 하기
    const contentContainer = document.querySelector('.content-container');
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');
    
    if (contentContainer) {
      contentContainer.classList.add('visible');
      contentContainer.style.opacity = '1';
      contentContainer.style.transform = 'translateY(0)';
    }
    if (pageTitle) {
      pageTitle.classList.add('visible');
      pageTitle.style.opacity = '1';
      pageTitle.style.transform = 'translateY(0)';
    }
    if (pageSubtitle) {
      pageSubtitle.classList.add('visible');
      pageSubtitle.style.opacity = '1';
      pageSubtitle.style.transform = 'translateY(0)';
    }

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
        const basePath = App.utils.getBasePath();
        const newUrl = basePath + 'archive.html?id=' + archive.id;
        console.log('🚀 아카이브 클릭, 이동할 URL:', newUrl);
        window.location.href = newUrl;
      });
      
      grid.appendChild(item);
      
      // 애니메이션 없이 바로 표시
      item.classList.add('visible');
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    });
  },

  // 아카이브 상세 페이지 생성 - 애니메이션 제거
  createArchiveDetail(archiveId) {
    console.log('📁 아카이브 상세 페이지 생성:', archiveId);
    
    const archive = App.data.archives.find(a => a.id === parseInt(archiveId));
    if (!archive) {
      console.error('❌ 아카이브를 찾을 수 없습니다:', archiveId);
      return;
    }

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

    // 애니메이션 없이 바로 표시
    const contentContainer = document.querySelector('.content-container');
    const detailContent = document.querySelector('.archive-detail-content');
    
    if (contentContainer) {
      contentContainer.classList.add('visible');
      contentContainer.style.opacity = '1';
      contentContainer.style.transform = 'translateY(0)';
    }
    if (detailContent) {
      detailContent.classList.add('visible');
      detailContent.style.opacity = '1';
      detailContent.style.transform = 'translateY(0)';
    }

    console.log('✅ 아카이브 상세 페이지 생성 완료:', archive.title);
  },

  // 블로그 리스트 생성 - 애니메이션 제거
  createBlogList() {
    const list = document.getElementById('blog-list');
    if (!list || !App.data) return;

    // 페이지 요소들 바로 보이게 하기  
    const contentContainer = document.querySelector('.content-container');
    const pageTitle = document.querySelector('.page-title');
    const pageSubtitle = document.querySelector('.page-subtitle');
    
    if (contentContainer) {
      contentContainer.classList.add('visible');
      contentContainer.style.opacity = '1';
      contentContainer.style.transform = 'translateY(0)';
    }
    if (pageTitle) {
      pageTitle.classList.add('visible');
      pageTitle.style.opacity = '1';
      pageTitle.style.transform = 'translateY(0)';
    }
    if (pageSubtitle) {
      pageSubtitle.classList.add('visible');
      pageSubtitle.style.opacity = '1';
      pageSubtitle.style.transform = 'translateY(0)';
    }
    
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
        const basePath = App.utils.getBasePath();
        const newUrl = basePath + 'blog.html?id=' + post.id;
        console.log('🚀 블로그 클릭, 이동할 URL:', newUrl);
        window.location.href = newUrl;
      });
      
      list.appendChild(item);
      
      // 애니메이션 없이 바로 표시
      item.classList.add('visible');
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    });
  },

  // 블로그 상세 페이지 생성 - 애니메이션 제거
  createBlogDetail(blogId) {
    console.log('📝 블로그 상세 페이지 생성:', blogId);
    
    const post = App.data.blogPosts.find(p => p.id === parseInt(blogId));
    if (!post) {
      console.error('❌ 블로그 포스트를 찾을 수 없습니다:', blogId);
      return;
    }

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

    // 애니메이션 없이 바로 표시
    const contentContainer = document.querySelector('.content-container');
    const detailContent = document.querySelector('.blog-detail-content');
    
    if (contentContainer) {
      contentContainer.classList.add('visible');
      contentContainer.style.opacity = '1';
      contentContainer.style.transform = 'translateY(0)';
    }
    if (detailContent) {
      detailContent.classList.add('visible');
      detailContent.style.opacity = '1';
      detailContent.style.transform = 'translateY(0)';
    }

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

  // 🫧 물거품 효과 추가 - 유지
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
  
  // 페이지 로딩 완료 - 오버레이만 간단히 처리
  document.body.classList.add('loaded');
  const overlay = document.getElementById('page-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
  
  console.log('✅ 앱 초기화 완료!');
};

// 공통 기능 설정
App.setupCommonFeatures = function() {
  // 이미지 로딩 처리만 유지
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
      img.style.opacity = '0';
      img.addEventListener('load', () => {
        img.style.transition = 'opacity 0.3s ease';
        img.style.opacity = '1';
      });
    }
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