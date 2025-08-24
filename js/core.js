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
      const response = await fetch('data/data.json');
      App.data = await response.json();
      return App.data;
    } catch (error) {
      console.error('데이터 로드 실패:', error);
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
    return result;
  },

  // 현재 페이지 이름 가져오기
  getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  },

  // 페이지 전환 with 애니메이션
  navigateToPage(url) {
    const overlay = document.getElementById('page-overlay');
    if (overlay) {
      overlay.classList.add('active');
      setTimeout(() => {
        window.location.href = url;
      }, 500);
    } else {
      window.location.href = url;
    }
  },

  // 요소 생성 헬퍼
  createElement(tag, className = '', innerHTML = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
  },

  // 날짜 포맷팅
  formatDate(dateString) {
    return dateString; // 이미 YYYY.MM.DD 형식
  },

  // 배열 청크 분할
  chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
};

// 애니메이션 시스템
App.animations = {
  // 기본 설정
  config: {
    duration: 800,
    easing: 'ease-out',
    staggerDelay: 150
  },

  // Intersection Observer 설정
  createObserver(callback, options = {}) {
    const defaultOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
  },

  // 순차 애니메이션
  staggerAnimation(elements, animationClass, delay = this.config.staggerDelay) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add(animationClass);
      }, index * delay);
    });
  },

  // 페이드인 효과
  fadeIn(element, delay = 0) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `all ${this.config.duration}ms ${this.config.easing}`;
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  },

  // 스케일 애니메이션
  scaleIn(element, delay = 0) {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    element.style.transition = `all ${this.config.duration}ms ${this.config.easing}`;
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
    }, delay);
  }
};

// 컴포넌트 시스템
App.components = {
  // 네비게이션 생성
  createNavigation(activePage) {
    const nav = App.utils.createElement('nav', 'navbar');
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
    nav.appendChild(container);
    return nav;
  },

  // 푸터 생성
  createFooter() {
    const footer = App.utils.createElement('footer', 'footer');
    const content = App.utils.createElement('div', 'footer-content');
    const text = App.utils.createElement('p', '', App.data.site.copyright);
    
    content.appendChild(text);
    footer.appendChild(content);
    return footer;
  },

  // 맨 위로 버튼
  createScrollTopButton() {
    const button = App.utils.createElement('button', 'scroll-top-btn');
    button.id = 'scroll-top';
    button.innerHTML = '<i data-lucide="chevron-up"></i>';
    
    // 스크롤 이벤트
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        button.classList.add('show');
      } else {
        button.classList.remove('show');
      }
    });
    
    // 클릭 이벤트
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    return button;
  },

  // 배경 버블
  createBackgroundBubbles() {
    const container = App.utils.createElement('div');
    container.id = 'background-bubbles';
    
    for (let i = 0; i < 15; i++) {
      const bubble = App.utils.createElement('div', 'bubble');
      const size = Math.random() * 20 + 10;
      
      bubble.style.left = Math.random() * 100 + '%';
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.animationDuration = (Math.random() * 15 + 15) + 's';
      bubble.style.animationDelay = (Math.random() * -15) + 's';
      
      container.appendChild(bubble);
    }
    
    return container;
  },

  // 그리드 아이템 생성
  createGridItem(data, type) {
    const item = App.utils.createElement('div', `${type}-item`);
    
    switch (type) {
      case 'character':
        return this.createCharacterItem(data, item);
      case 'archive':
        return this.createArchiveItem(data, item);
      case 'blog':
        return this.createBlogItem(data, item);
      default:
        return item;
    }
  },

  // 캐릭터 아이템
  createCharacterItem(character, item) {
    const img = App.utils.createElement('img');
    img.src = character.image;
    img.alt = character.name;
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease-in-out';
    
    img.onload = () => {
      img.style.opacity = '1';
    };
    
    item.appendChild(img);
    
    // 클릭 이벤트
    item.addEventListener('click', () => {
      App.utils.navigateToPage(`character${character.id}.html`);
    });
    
    return item;
  },

  // 아카이브 아이템
  createArchiveItem(archive, item) {
    const imageContainer = App.utils.createElement('div', 'archive-image');
    
    if (archive.image) {
      const img = App.utils.createElement('img');
      img.src = archive.image;
      img.alt = archive.title;
      imageContainer.appendChild(img);
    } else {
      const noImage = App.utils.createElement('div', 'archive-no-image', 'No Image');
      imageContainer.appendChild(noImage);
    }
    
    const info = App.utils.createElement('div', 'archive-info');
    const date = App.utils.createElement('span', 'archive-date', archive.date);
    const title = App.utils.createElement('h3', 'archive-title', archive.title);
    
    info.appendChild(date);
    info.appendChild(title);
    item.appendChild(imageContainer);
    item.appendChild(info);
    
    // 클릭 이벤트
    item.addEventListener('click', () => {
      App.utils.navigateToPage(`archive${archive.id}.html`);
    });
    
    return item;
  },

  // 블로그 아이템
  createBlogItem(post, item) {
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
    
    // 클릭 이벤트
    item.addEventListener('click', () => {
      App.utils.navigateToPage(`blog${post.id}.html`);
    });
    
    return item;
  }
};

// 페이지 초기화 시스템
App.init = async function() {
  // 데이터 로드
  await App.utils.loadData();
  
  if (!App.data) {
    console.error('데이터를 로드할 수 없습니다.');
    return;
  }

  // 기본 요소들 생성
  const currentPage = App.utils.getCurrentPage();
  
  // 네비게이션 삽입
  const existingNav = document.querySelector('.navbar');
  if (existingNav) {
    const newNav = App.components.createNavigation(currentPage);
    existingNav.replaceWith(newNav);
    
    // 애니메이션 적용
    setTimeout(() => {
      newNav.classList.add('visible');
    }, 100);
  }
  
  // 푸터 삽입
  const existingFooter = document.querySelector('.footer');
  if (existingFooter) {
    const newFooter = App.components.createFooter();
    existingFooter.replaceWith(newFooter);
    
    setTimeout(() => {
      newFooter.classList.add('visible');
    }, 1500);
  }
  
  // 맨 위로 버튼
  const scrollBtn = App.components.createScrollTopButton();
  document.body.appendChild(scrollBtn);
  
  // 배경 버블
  const bubbles = App.components.createBackgroundBubbles();
  document.body.insertBefore(bubbles, document.body.firstChild);
  
  // Lucide 아이콘 초기화
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // 페이지별 초기화
  App.initPage(currentPage);
  
  // 공통 이벤트
  App.setupCommonEvents();
  
  // 페이지 로딩 완료
  setTimeout(() => {
    document.body.classList.add('loaded');
    const overlay = document.getElementById('page-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }, 100);
};

// 페이지별 초기화
App.initPage = function(currentPage) {
  switch (currentPage) {
    case 'character.html':
      App.pages.character.init();
      break;
    case 'archive.html':
      App.pages.archive.init();
      break;
    case 'blog.html':
      App.pages.blog.init();
      break;
    default:
      // 기본 페이지 애니메이션
      App.animations.fadeIn(document.querySelector('.content-container'), 300);
  }
};

// 공통 이벤트 설정
App.setupCommonEvents = function() {
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
  
  // ESC 키로 모달 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modals = document.querySelectorAll('.modal.active');
      modals.forEach(modal => modal.classList.remove('active'));
    }
  });
  
  // 페이지 언로드 시 페이드아웃
  window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
  });
};

// DOMContentLoaded에서 앱 초기화
document.addEventListener('DOMContentLoaded', App.init);

// 페이지 쇼 이벤트 (뒤로가기 대응)
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.body.classList.add('loaded');
    document.body.style.opacity = '1';
  }
});