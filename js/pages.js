// 페이지별 로직 모듈
App.pages = {
  // 캐릭터 페이지
  character: {
    init() {
      const grid = document.getElementById('character-grid');
      if (!grid) return;
      
      this.createCharacterGrid(grid);
      this.setupScrollAnimations();
    },
    
    createCharacterGrid(grid) {
      // 그리드 초기 상태 설정
      grid.style.opacity = '0';
      grid.style.transform = 'translateY(20px)';
      grid.style.transition = 'all 0.8s ease-out';
      
      // 캐릭터 아이템 생성
      App.data.characters.forEach((character, index) => {
        const item = App.components.createGridItem(character, 'character');
        grid.appendChild(item);
      });
      
      // 그리드 나타나기
      setTimeout(() => {
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
        
        // 순차 애니메이션
        const items = grid.querySelectorAll('.character-item');
        App.animations.staggerAnimation(Array.from(items), 'visible');
      }, 300);
    },
    
    setupScrollAnimations() {
      const observer = App.animations.createObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      });
      
      document.querySelectorAll('.character-item').forEach(item => {
        observer.observe(item);
      });
    }
  },

  // 아카이브 페이지
  archive: {
    init() {
      const grid = document.getElementById('archive-grid');
      if (!grid) return;
      
      this.createArchiveGrid(grid);
      this.setupScrollAnimations();
    },
    
    createArchiveGrid(grid) {
      grid.style.opacity = '0';
      grid.style.transform = 'translateY(20px)';
      grid.style.transition = 'all 0.8s ease-out';
      
      // 날짜 순으로 정렬
      const sortedArchives = [...App.data.archives].sort((a, b) => {
        const dateA = new Date(a.date.replace(/\./g, '-'));
        const dateB = new Date(b.date.replace(/\./g, '-'));
        return dateB - dateA;
      });
      
      sortedArchives.forEach(archive => {
        const item = App.components.createGridItem(archive, 'archive');
        grid.appendChild(item);
      });
      
      setTimeout(() => {
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
        
        const items = grid.querySelectorAll('.archive-item');
        App.animations.staggerAnimation(Array.from(items), 'visible', 120);
      }, 300);
    },
    
    setupScrollAnimations() {
      const observer = App.animations.createObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 120);
            observer.unobserve(entry.target);
          }
        });
      });
      
      document.querySelectorAll('.archive-item').forEach(item => {
        observer.observe(item);
      });
    }
  },

  // 블로그 페이지
  blog: {
    currentCategory: 'all',
    
    init() {
      this.currentCategory = this.getCategoryFromURL();
      this.createCategoryList();
      this.createBlogList();
      this.setupLayoutAnimation();
    },
    
    getCategoryFromURL() {
      const params = App.utils.getUrlParams();
      return params.category || 'all';
    },
    
    createCategoryList() {
      const container = document.getElementById('category-list');
      if (!container) return;
      
      // 카테고리 추출
      const categories = ['all', ...new Set(App.data.blogPosts.map(post => post.category))];
      
      categories.forEach((category, index) => {
        const item = App.utils.createElement('div', `category-item ${category === this.currentCategory ? 'active' : ''}`);
        
        const displayName = category === 'all' ? '전체' : category;
        const postCount = category === 'all' 
          ? App.data.blogPosts.length 
          : App.data.blogPosts.filter(post => post.category === category).length;
          
        item.innerHTML = `
          <span class="category-name">${displayName}</span>
          <span class="category-count">(${postCount})</span>
        `;
        
        // 클릭 이벤트
        item.addEventListener('click', () => {
          this.filterByCategory(category);
          this.updateActiveCategory(item);
          this.updateURL(category);
        });
        
        container.appendChild(item);
        
        // 애니메이션
        setTimeout(() => {
          item.classList.add('visible');
        }, 100 + (index * 100));
      });
    },
    
    createBlogList() {
      const list = document.getElementById('blog-list');
      if (!list) return;
      
      list.innerHTML = '';
      
      // 필터링된 포스트
      const filteredPosts = this.currentCategory === 'all' 
        ? App.data.blogPosts 
        : App.data.blogPosts.filter(post => post.category === this.currentCategory);
      
      if (filteredPosts.length === 0) {
        const noPostsDiv = App.utils.createElement('div', 'no-posts', 
          `해당 카테고리에 포스트가 없습니다. (찾는 카테고리: "${this.currentCategory}")`);
        list.appendChild(noPostsDiv);
        App.animations.fadeIn(noPostsDiv, 100);
        return;
      }
      
      filteredPosts.forEach((post, index) => {
        const item = App.components.createGridItem(post, 'blog');
        list.appendChild(item);
        
        // 순차 애니메이션
        setTimeout(() => {
          item.classList.add('visible');
        }, 50 + (index * 100));
      });
    },
    
    filterByCategory(category) {
      const list = document.getElementById('blog-list');
      if (list) {
        list.style.opacity = '0';
        list.style.transform = 'translateY(20px)';
      }
      
      this.currentCategory = category;
      
      setTimeout(() => {
        this.createBlogList();
        
        setTimeout(() => {
          if (list) {
            list.style.opacity = '1';
            list.style.transform = 'translateY(0)';
          }
        }, 100);
      }, 300);
    },
    
    updateActiveCategory(activeItem) {
      document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
      });
      activeItem.classList.add('active');
    },
    
    updateURL(category) {
      const newURL = category === 'all' ? 'blog.html' : `blog.html?category=${encodeURIComponent(category)}`;
      window.history.replaceState({}, '', newURL);
    },
    
    setupLayoutAnimation() {
      const layout = document.querySelector('.blog-layout');
      const sidebar = document.querySelector('.blog-sidebar');
      
      if (layout) {
        setTimeout(() => {
          layout.classList.add('visible');
        }, 300);
      }
      
      if (sidebar) {
        setTimeout(() => {
          sidebar.classList.add('visible');
        }, 500);
      }
    }
  },

  // 상세 페이지들
  detail: {
    // 캐릭터 상세
    initCharacterDetail() {
      this.setupBackButton('character.html');
      this.animateCharacterDetail();
    },
    
    // 아카이브 상세
    initArchiveDetail() {
      this.setupBackButton('archive.html');
      this.animateArchiveDetail();
      setTimeout(() => this.setupGalleryEffect(), 500);
    },
    
    // 블로그 상세
    initBlogDetail() {
      this.setupBackButton('blog.html');
      this.animateArchiveDetail(); // 같은 레이아웃 사용
    },
    
    setupBackButton(returnUrl) {
      const backBtn = document.querySelector('.back-btn');
      if (!backBtn) return;
      
      backBtn.style.opacity = '0';
      backBtn.style.transform = 'translateX(-20px)';
      backBtn.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        backBtn.style.opacity = '1';
        backBtn.style.transform = 'translateX(0)';
      }, 100);
      
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        App.utils.navigateToPage(returnUrl);
      });
    },
    
    animateCharacterDetail() {
      const content = document.querySelector('.character-detail-content');
      const imageContainer = document.querySelector('.character-image-container');
      const info = document.querySelector('.character-info');
      
      if (content) {
        setTimeout(() => content.classList.add('visible'), 200);
      }
      
      if (imageContainer) {
        setTimeout(() => imageContainer.classList.add('visible'), 400);
      }
      
      if (info) {
        setTimeout(() => {
          info.classList.add('visible');
          this.animateStats();
        }, 600);
      }
    },
    
    animateArchiveDetail() {
      const content = document.querySelector('.archive-detail-content');
      const imageContainer = document.querySelector('.archive-image-container');
      const textContent = document.querySelector('.archive-content');
      
      if (content) {
        setTimeout(() => content.classList.add('visible'), 200);
      }
      
      if (imageContainer) {
        setTimeout(() => imageContainer.classList.add('visible'), 400);
      }
      
      if (textContent) {
        setTimeout(() => textContent.classList.add('visible'), 600);
      }
    },
    
    animateStats() {
      const statRows = document.querySelectorAll('.stat-row');
      statRows.forEach((row, index) => {
        setTimeout(() => {
          row.classList.add('visible');
          
          // 도트 애니메이션
          const dots = row.querySelectorAll('.dot');
          dots.forEach((dot, dotIndex) => {
            setTimeout(() => {
              dot.classList.add('visible');
            }, dotIndex * 100);
          });
        }, index * 200);
      });
    },
    
    setupGalleryEffect() {
      const images = document.querySelectorAll('.archive-image img, .archive-image-container img');
      
      images.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', (e) => {
          e.stopPropagation();
          this.showLightbox(img.src);
        });
        
        img.addEventListener('mouseenter', () => {
          img.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', () => {
          img.style.transform = 'scale(1)';
        });
      });
    },
    
    showLightbox(imageSrc) {
      const overlay = App.utils.createElement('div');
      overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.9); z-index: 9999;
        display: flex; justify-content: center; align-items: center;
        cursor: pointer; opacity: 0; transition: opacity 0.3s ease;
      `;
      
      const img = App.utils.createElement('img');
      img.src = imageSrc;
      img.style.cssText = `
        max-width: 90%; max-height: 90%; object-fit: contain;
        border-radius: 8px; transform: scale(0.8);
        transition: transform 0.3s ease;
      `;
      
      overlay.appendChild(img);
      document.body.appendChild(overlay);
      
      setTimeout(() => {
        overlay.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }, 10);
      
      overlay.addEventListener('click', () => {
        overlay.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        setTimeout(() => document.body.removeChild(overlay), 300);
      });
      
      // ESC 키 지원
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          overlay.click();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
    }
  }
};