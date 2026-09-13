/**
 * 旅行地图主脚本
 * 基于 Leaflet.js 实现交互式世界地图
 * 新增旅行时，只需在 locations 和 routes 数组中添加数据即可
 */

// ===== 配置数据：去过的地点 =====
// type: 'origin' 出发地 | 'transit' 中转 | 'destination' 主要目的地
const locations = [
    {
        id: 'shenzhen',
        name: '深圳',
        nameEn: 'Shenzhen',
        lat: 22.5431,
        lng: 114.0579,
        type: 'origin',
        description: '出发地，中国南部海滨城市',
        date: '2024.12'
    },
    {
        id: 'doha',
        name: '多哈',
        nameEn: 'Doha',
        lat: 25.2854,
        lng: 51.5310,
        type: 'transit',
        description: '卡塔尔首都，往返中转停留',
        date: '2024.12'
    },
    {
        id: 'abu-dhabi',
        name: '阿布扎比',
        nameEn: 'Abu Dhabi',
        lat: 24.4539,
        lng: 54.3773,
        type: 'destination',
        description: '阿联酋首都，ICDM会议举办地',
        date: '2024.12',
        link: 'uae-2024.html'
    },
    {
        id: 'dubai',
        name: '迪拜',
        nameEn: 'Dubai',
        lat: 25.2048,
        lng: 55.2708,
        type: 'destination',
        description: '阿联酋最繁华的城市，棕榈岛与哈利法塔',
        date: '2024.12',
        link: 'uae-2024.html'
    },
    {
        id: 'chengdu',
        name: '成都',
        nameEn: 'Chengdu',
        lat: 30.5728,
        lng: 104.0668,
        type: 'transit',
        description: '四川航空经停站',
        date: '2025.04'
    },
    {
        id: 'sydney',
        name: '悉尼',
        nameEn: 'Sydney',
        lat: -33.8688,
        lng: 151.2093,
        type: 'destination',
        description: '澳大利亚最大城市，歌剧院与海港大桥',
        date: '2025.04',
        link: 'australia-2025.html'
    },
    {
        id: 'gold-coast',
        name: '黄金海岸',
        nameEn: 'Gold Coast',
        lat: -28.0167,
        lng: 153.4000,
        type: 'destination',
        description: '冲浪者天堂与可伦宾动物园',
        date: '2025.04',
        link: 'australia-2025.html'
    },
    {
        id: 'guangzhou',
        name: '广州',
        nameEn: 'Guangzhou',
        lat: 23.1291,
        lng: 113.2644,
        type: 'origin',
        description: '格鲁吉亚之旅出发地',
        date: '2025.09'
    },
    {
        id: 'kuwait',
        name: '科威特',
        nameEn: 'Kuwait City',
        lat: 29.3759,
        lng: 47.9774,
        type: 'transit',
        description: '科威特城，广州→第比利斯中转',
        date: '2025.09'
    },
    {
        id: 'tbilisi',
        name: '第比利斯',
        nameEn: 'Tbilisi',
        lat: 41.7151,
        lng: 44.8271,
        type: 'destination',
        description: '格鲁吉亚首都，红酒发源地，老城与硫磺浴',
        date: '2025.09',
        link: 'georgia-2025.html'
    },
    {
        id: 'sighnaghi',
        name: '西格纳吉',
        nameEn: 'Sighnaghi',
        lat: 41.6200,
        lng: 45.9200,
        type: 'destination',
        description: '童话般的酿酒爱情小镇',
        date: '2025.09',
        link: 'georgia-2025.html'
    },
    {
        id: 'kazbegi',
        name: '卡兹别克',
        nameEn: 'Kazbegi',
        lat: 42.6580,
        lng: 44.6400,
        type: 'destination',
        description: '雪山脚下，圣三一教堂与日照金山',
        date: '2025.09',
        link: 'georgia-2025.html'
    },
    {
        id: 'kutaisi',
        name: '库塔伊西',
        nameEn: 'Kutaisi',
        lat: 42.2500,
        lng: 42.7000,
        type: 'destination',
        description: '格鲁吉亚旧都',
        date: '2025.09',
        link: 'georgia-2025.html'
    },
    {
        id: 'mestia',
        name: '梅斯蒂亚',
        nameEn: 'Mestia',
        lat: 43.0400,
        lng: 42.7200,
        type: 'destination',
        description: '高加索山区徒步胜地，木屋与围炉',
        date: '2025.09',
        link: 'georgia-2025.html'
    },
    {
        id: 'ushguli',
        name: '乌什古里',
        nameEn: 'Ushguli',
        lat: 42.9167,
        lng: 43.0000,
        type: 'destination',
        description: '欧洲海拔最高的古村落，冰川徒步',
        date: '2025.09',
        link: 'georgia-2025.html'
    },
    {
        id: 'almaty',
        name: '阿拉木图',
        nameEn: 'Almaty',
        lat: 43.2220,
        lng: 76.8512,
        type: 'transit',
        description: '哈萨克斯坦，返程中转停留一天',
        date: '2025.09'
    }
];

// ===== 配置数据：航线 =====
// type: 'outbound' 去程 | 'return' 返程 | 'domestic' 境内移动
const routes = [
    {
        id: 'outbound-1',
        from: 'shenzhen',
        to: 'doha',
        type: 'outbound',
        description: '深圳 → 多哈（去程）'
    },
    {
        id: 'outbound-2',
        from: 'doha',
        to: 'abu-dhabi',
        type: 'outbound',
        description: '多哈 → 阿布扎比（去程）'
    },
    {
        id: 'domestic-1',
        from: 'abu-dhabi',
        to: 'dubai',
        type: 'domestic',
        description: '阿布扎比 ↔ 迪拜（境内往返）'
    },
    {
        id: 'return-1',
        from: 'abu-dhabi',
        to: 'doha',
        type: 'return',
        description: '阿布扎比 → 多哈（返程）'
    },
    {
        id: 'return-2',
        from: 'doha',
        to: 'shenzhen',
        type: 'return',
        description: '多哈 → 深圳（返程）'
    },
    {
        id: 'outbound-3',
        from: 'shenzhen',
        to: 'chengdu',
        type: 'outbound',
        description: '深圳 → 成都（经停）'
    },
    {
        id: 'outbound-4',
        from: 'chengdu',
        to: 'sydney',
        type: 'outbound',
        description: '成都 → 悉尼（去程）'
    },
    {
        id: 'domestic-2',
        from: 'sydney',
        to: 'gold-coast',
        type: 'domestic',
        description: '悉尼 ↔ 黄金海岸（境内飞行）'
    },
    {
        id: 'return-3',
        from: 'sydney',
        to: 'shenzhen',
        type: 'return',
        description: '悉尼 → 深圳（返程）'
    },
    {
        id: 'outbound-5',
        from: 'guangzhou',
        to: 'kuwait',
        type: 'outbound',
        description: '广州 → 科威特（去程中转）'
    },
    {
        id: 'outbound-6',
        from: 'kuwait',
        to: 'tbilisi',
        type: 'outbound',
        description: '科威特 → 第比利斯（去程）'
    },
    {
        id: 'domestic-3',
        from: 'tbilisi',
        to: 'sighnaghi',
        type: 'domestic',
        description: '第比利斯 → 西格纳吉（境内）'
    },
    {
        id: 'domestic-4',
        from: 'sighnaghi',
        to: 'kazbegi',
        type: 'domestic',
        description: '西格纳吉 → 卡兹别克（境内）'
    },
    {
        id: 'domestic-5',
        from: 'tbilisi',
        to: 'kutaisi',
        type: 'domestic',
        description: '第比利斯 → 库塔伊西（境内）'
    },
    {
        id: 'domestic-6',
        from: 'kutaisi',
        to: 'mestia',
        type: 'domestic',
        description: '库塔伊西 → 梅斯蒂亚（境内）'
    },
    {
        id: 'domestic-7',
        from: 'mestia',
        to: 'ushguli',
        type: 'domestic',
        description: '梅斯蒂亚 → 乌什古里（徒步）'
    },
    {
        id: 'return-4',
        from: 'tbilisi',
        to: 'almaty',
        type: 'return',
        description: '第比利斯 → 阿拉木图（返程）'
    },
    {
        id: 'return-5',
        from: 'almaty',
        to: 'guangzhou',
        type: 'return',
        description: '阿拉木图 → 广州（返程）'
    }
];

// ===== 颜色配置 =====
const colors = {
    origin: '#e74c3c',        // 出发地 - 红色
    transit: '#3498db',       // 中转 - 蓝色
    destination: '#d4a853',   // 目的地 - 金色
    outbound: '#e67e22',      // 去程 - 橙色实线
    return: '#2980b9',        // 返程 - 蓝色虚线
    domestic: '#27ae60'       // 境内 - 绿色细线
};

// ===== 初始化地图 =====
let map;

function initMap() {
    // 创建地图，中心设在中东附近，缩放级别2可看到整个东半球
    map = L.map('world-map', {
        center: [25, 60],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        zoomControl: true,
        attributionControl: true
    });

    // 添加底图：主用高德（国内访问快、中文标注、无需 Key），瓦片连续加载失败时回退到 OSM 法国镜像
    var gaodeLayer = L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        subdomains: '1234',
        maxZoom: 18,
        attribution: '&copy; 高德地图'
    });
    var osmFallbackLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        subdomains: 'abc',
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap France contributors'
    });
    gaodeLayer.addTo(map);
    // 高德瓦片若连续加载失败（例如境外网络环境），自动切换到 OSM 镜像，保证底图始终可用
    var __tileFailCount = 0;
    gaodeLayer.on('tileerror', function () {
        __tileFailCount++;
        if (__tileFailCount > 6 && map.hasLayer(gaodeLayer)) {
            map.removeLayer(gaodeLayer);
            osmFallbackLayer.addTo(map);
        }
    });

    // 绘制航线
    drawRoutes();

    // 添加地点标记
    addMarkers();

    // 适配视野（可选，默认居中即可）
    // map.fitBounds(L.latLngBounds(locations.map(l => [l.lat, l.lng])).pad(0.5));
}

// ===== 绘制航线 =====
function drawRoutes() {
    routes.forEach(route => {
        const from = locations.find(l => l.id === route.from);
        const to = locations.find(l => l.id === route.to);
        if (!from || !to) return;

        const latlngs = [[from.lat, from.lng], [to.lat, to.lng]];

        let lineOptions = {
            color: colors[route.type],
            weight: route.type === 'domestic' ? 2 : 3,
            opacity: 0.7,
            smoothFactor: 1
        };

        // 返程用虚线
        if (route.type === 'return') {
            lineOptions.dashArray = '8, 8';
        }

        const line = L.polyline(latlngs, lineOptions).addTo(map);

        // 绑定弹窗
        line.bindPopup(`
            <div style="min-width: 140px;">
                <strong>${route.description}</strong>
            </div>
        `);
    });
}

// ===== 添加地点标记 =====
function addMarkers() {
    locations.forEach(loc => {
        const color = colors[loc.type];

        // 自定义标记图标（水滴形）
        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-pin" style="background: ${color};"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -24]
        });

        const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);

        // 构建弹窗内容
        let popupContent = `
            <div style="min-width: 180px;">
                <h3>${loc.name} <span style="font-size:0.8rem;color:#999;font-weight:normal;">${loc.nameEn}</span></h3>
                <p>${loc.description}</p>
                <p style="margin-top:6px;color:#d4a853;font-size:0.8rem;">${loc.date}</p>
        `;

        // 如果有文章链接，添加查看日记按钮
        if (loc.link) {
            popupContent += `
                <p style="margin-top:8px;">
                    <a href="${loc.link}" style="color:#1a2744;font-weight:600;text-decoration:underline;">
                        查看旅行日记 →
                    </a>
                </p>
            `;
        }

        popupContent += '</div>';

        marker.bindPopup(popupContent);

        // 鼠标悬停效果
        marker.on('mouseover', function () {
            this.openPopup();
        });
    });
}

// ===== 页面加载完成后初始化 =====
document.addEventListener('DOMContentLoaded', function () {
    const mapElement = document.getElementById('world-map');
    if (mapElement) {
        initMap();
    }
});
