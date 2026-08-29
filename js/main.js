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

    // 添加底图（使用 OpenStreetMap 标准底图，免费稳定，无需 API Key）
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abc',
        maxZoom: 19
    }).addTo(map);

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
