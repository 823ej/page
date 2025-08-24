// 🌟 GitHub Pages용 수정된 core.js
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
  }
};

// 컴포넌트 시스템
App.components = {
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
    const grid = document.getElementById('character-grid');
    if (!grid || !App.data) return;
    
    grid.innerHTML = '';
    
    App.data.characters.forEach((character, index) => {
      const item = App.utils.createElement('div', 'character-item');
      
      const img = App.utils.createElement('img');
      img.src = character.image;
      img.alt = character.name;
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease-in-out';
      
      img.onload = () => {
        setTimeout(() => {
          img.style.opacity = '1';
        }, index * 100);
      };
      
      item.appendChild(img);
      
      // 클릭 이벤트 - 상세 정보 알림으로 표시
      item.addEventListener('click', () => {
        const message = `${character.name} - ${character.title}\n\n${character.description}\n\n${character.story}`;
        alert(message);
      });
      
      grid.appendChild(item);
      
      // 애니메이션
      setTimeout(() => {
        item.classList.add('visible');
      }, 300 + (index * 150));
    });
  },

  // 아카이브 그리드 생성
  createArchiveGrid() {
    const grid = document.getElementById('archive-grid');
    if (!grid || !App.data) return;
    
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
      
      // 클릭 이벤트
      item.addEventListener('click', () => {
        const message = `${archive.title}\n\n${archive.description}\n\n종류: ${archive.type}\n날짜: ${archive.date}`;
        alert(message);
      });
      
      grid.appendChild(item);
      
      // 애니메이션
      setTimeout(() => {
        item.classList.add('visible');
      }, 300 + (index * 120));
    });
  },

  // 블로그 리스트 생성
  createBlogList() {
    const list = document.getElementById('blog-list');
    if (!list || !App.data) return;
    
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
      
      // 클릭 이벤트
      item.addEventListener('click', () => {
        const message = `${post.title}\n\n${post.description}\n\n카테고리: ${post.category}\n작성일: ${post.date}`;
        alert(message);
      });
      
      list.appendChild(item);
      
      // 애니메이션
      setTimeout(() => {
        item.classList.add('visible');
      }, 50 + (index * 100));
    });
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

  // 현재 페이지 확인
  const currentPage = App.utils.getCurrentPage();
  console.log('📄 현재 페이지:', currentPage);
  
  // 네비게이션 생성
  App.components.createNavigation(currentPage);
  
  // 페이지별 콘텐츠 생성
  if (currentPage === 'character.html') {
    App.components.createCharacterGrid();
  } else if (currentPage === 'archive.html') {
    App.components.createArchiveGrid();
  } else if (currentPage === 'blog.html') {
    App.components.createBlogList();
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