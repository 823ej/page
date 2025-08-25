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
      "description":  `신비로운 달의 마법을 다루는 젊은 마법사. 어둠 속에서도 길을 잃지 않는 강인한 의지의 소유자. `,
      "story":  `루나는 고대 달의 신전에서 자란 마법사입니다. 어린 시절부터 달빛 마법을 익혀온 그녀는 밤하늘의 별들과 대화할 수 있는 특별한 능력을 가지고 있습니다. `,
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
      "description":`신비로운 달의 마법을 다루는 젊은 마법사. 어둠 속에서도 길을 잃지 않는 강인한 의지의 소유자. `,
      "story":  `루나는 고대 달의 신전에서 자란 마법사입니다. 어린 시절부터 달빛 마법을 익혀온 그녀는 밤하늘의 별들과 대화할 수 있는 특별한 능력을 가지고 있습니다. `,
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
      "description":`신비로운 달의 마법을 다루는 젊은 마법사. 어둠 속에서도 길을 잃지 않는 강인한 의지의 소유자. `,
      "story":  `루나는 고대 달의 신전에서 자란 마법사입니다. 어린 시절부터 달빛 마법을 익혀온 그녀는 밤하늘의 별들과 대화할 수 있는 특별한 능력을 가지고 있습니다. `,
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
      "description": `신비로운 달의 마법을 다루는 젊은 마법사. 어둠 속에서도 길을 잃지 않는 강인한 의지의 소유자. `,
      "details":  `루나는 고대 달의 신전에서 자란 마법사입니다. 어린 시절부터 달빛 마법을 익혀온 그녀는 밤하늘의 별들과 대화할 수 있는 특별한 능력을 가지고 있습니다. `,
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
      "description":`신비로운 달의 마법을 다루는 젊은 마법사. 어둠 속에서도 길을 잃지 않는 강인한 의지의 소유자. `,
      "details":  `루나는 고대 달의 신전에서 자란 마법사입니다. 어린 시절부터 달빛 마법을 익혀온 그녀는 밤하늘의 별들과 대화할 수 있는 특별한 능력을 가지고 있습니다. `,
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
      "description": `신비로운 달의 마법을 다루는 젊은 마법사. 어둠 속에서도 길을 잃지 않는 강인한 의지의 소유자. `,
      "details":  `루나는 고대 달의 신전에서 자란 마법사입니다. 어린 시절부터 달빛 마법을 익혀온 그녀는 밤하늘의 별들과 대화할 수 있는 특별한 능력을 가지고 있습니다. `,
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
      "description": `신비로운 달의 마법을 다루는 젊은 마법사. 어둠 속에서도 길을 잃지 않는 강인한 의지의 소유자. `,
      "details":  `루나는 고대 달의 신전에서 자란 마법사입니다. 어린 시절부터 달빛 마법을 익혀온 그녀는 밤하늘의 별들과 대화할 수 있는 특별한 능력을 가지고 있습니다. `,
      "fullImage": "https://picsum.photos/800/600?random=52",
      "tags": ["색채학", "달빛", "아트 기법"],
      "readTime": "7분",
      "views": 892
    }
  ]
};