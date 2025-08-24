// 🎯 GitHub Pages용 데이터 파일 - data.js
// JSON 대신 JavaScript 변수로 만들었어요!

window.websiteData = {
  "site": {
    "title": "창작자 개인 홈페이지",
    "description": "창작과 상상이 만나는 특별한 공간",
    "copyright": "© 2024 Creative Portfolio. 모든 창작물의 저작권은 작성자에게 있습니다.",
    "navigation": [
      { "href": "index.html", "text": "Top" },
      { "href": "introduction.html", "text": "Introduction" },
      { "href": "character.html", "text": "Character" },
      { "href": "world.html", "text": "World" },
      { "href": "archive.html", "text": "Archive" },
      { "href": "blog.html", "text": "Blog" }
    ]
  },
  "characters": [
    {
      "id": 1,
      "name": "루나",
      "title": "달의 마법사",
      "image": "https://picsum.photos/300/400?random=1",
      "description": "신비로운 달의 마법을 다루는 젊은 마법사. 어둠 속에서도 길을 잃지 않는 강인한 의지의 소유자.",
      "story": "루나는 고대 달의 신전에서 자란 마법사입니다. 어린 시절부터 달빛 마법을 익혀온 그녀는 밤하늘의 별들과 대화할 수 있는 특별한 능력을 가지고 있습니다.",
      "fullImage": "https://picsum.photos/400/600?random=11",
      "stats": {
        "combat": 4,
        "magic": 5,
        "wisdom": 5
      }
    },
    {
      "id": 2,
      "name": "아리온",
      "title": "바람의 검사",
      "image": "https://picsum.photos/300/400?random=2",
      "description": "자유로운 영혼과 번개같은 검술을 구사하는 젊은 전사. 바람의 정령과 계약을 맺은 검사.",
      "story": "서풍 평원 출신의 검사 아리온. 그의 검에는 바람의 정령이 깃들어 있어 적을 베는 순간 강풍이 일어납니다.",
      "fullImage": "https://picsum.photos/400/600?random=12",
      "stats": {
        "combat": 5,
        "magic": 3,
        "wisdom": 3
      }
    },
    {
      "id": 3,
      "name": "세라",
      "title": "얼음의 궁수",
      "image": "https://picsum.photos/300/400?random=3",
      "description": "북방의 설원에서 온 얼음 마법 궁수. 냉철한 판단력과 정확한 사격술로 유명.",
      "story": "영원한 겨울의 땅 출신인 세라는 얼음과 눈을 자유자재로 다룰 수 있습니다.",
      "fullImage": "https://picsum.photos/400/600?random=13",
      "stats": {
        "combat": 4,
        "magic": 4,
        "wisdom": 4
      }
    }
  ],
  "archives": [
    {
      "id": 1,
      "title": "달빛 아래",
      "type": "일러스트",
      "date": "2024.08.15",
      "image": "https://picsum.photos/400/300?random=21",
      "description": "신비로운 달빛이 내리쬐는 밤의 풍경을 그린 일러스트입니다.",
      "details": "이 작품은 고요한 밤, 달빛이 호수에 반사되는 장면을 담았습니다. 파란색과 보라색의 조화로 신비로운 분위기를 연출했으며, 물결에 비치는 달의 모습이 인상적입니다.",
      "fullImage": "https://picsum.photos/800/600?random=31",
      "genre": "디지털 아트",
      "duration": "2-3일",
      "tools": "Photoshop, iPad"
    },
    {
      "id": 2,
      "title": "용의 전설",
      "type": "소설",
      "date": "2024.07.22",
      "image": "https://picsum.photos/400/300?random=22",
      "description": "고대 용과 용사의 이야기를 다룬 판타지 소설입니다.",
      "details": "천년 전, 세상을 위협했던 고대 용이 다시 깨어났다. 젊은 용사 카이는 마을을 구하기 위해 위험한 여정을 떠나게 되는데...",
      "fullImage": "https://picsum.photos/800/600?random=32"
    }
  ],
  "blogPosts": [
    {
      "id": 1,
      "title": "새로운 캐릭터 디자인 과정",
      "category": "창작 과정",
      "date": "2024.08.20",
      "image": "https://picsum.photos/400/300?random=41",
      "description": "루나라는 새로운 캐릭터를 만들면서 겪었던 시행착오와 영감을 얻은 과정에 대해 이야기해보겠습니다.",
      "content": "캐릭터 디자인은 단순히 외형을 그리는 것이 아닙니다. 그 캐릭터의 성격, 배경, 목표까지 모든 것이 외형에 반영되어야 합니다.",
      "fullImage": "https://picsum.photos/800/600?random=51",
      "tags": ["캐릭터 디자인", "창작 팁", "루나"],
      "readTime": "5분",
      "views": 1247
    },
    {
      "id": 2,
      "title": "색채 연구: 달빛의 표현",
      "category": "아트 기법",
      "date": "2024.08.15",
      "image": "https://picsum.photos/400/300?random=42",
      "description": "밤하늘의 달빛을 더욱 아름답게 표현하기 위한 색채 연구를 진행했습니다.",
      "content": "달빛을 표현할 때 많은 작가들이 단순히 파란색이나 하얀색만 사용하곤 합니다. 하지만 실제 달빛은 훨씬 복잡한 색상을 가지고 있습니다.",
      "fullImage": "https://picsum.photos/800/600?random=52",
      "tags": ["색채학", "달빛", "아트 기법"],
      "readTime": "7분",
      "views": 892
    }
  ]
};