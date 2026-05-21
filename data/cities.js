/*
 * cities.js
 * Lưu danh sách thành phố/khu vực có khách sạn.
 * Dùng chung cho trang chủ, trang danh sách thành phố và các bộ lọc tìm kiếm.
 */
(function (window) {
  'use strict';

  const PROJECT_FOLDERS = ['pages', 'cities', 'hotels', 'booking', 'components', 'user'];

  function getRootPrefix() {
    const pathname = window.location.pathname.replace(/\\/g, '/');
    const parts = pathname.split('/').filter(Boolean);
    const folderIndex = parts.findIndex((part) => PROJECT_FOLDERS.includes(part));

    if (folderIndex === -1) {
      return '';
    }

    const depthFromRoot = parts.length - folderIndex - 1;
    return '../'.repeat(Math.max(depthFromRoot, 0));
  }

  function pathFromRoot(path) {
    if (!path) {
      return '';
    }

    if (/^(https?:)?\\/\\//.test(path) || path.startsWith('data:') || path.startsWith('#')) {
      return path;
    }

    return `${getRootPrefix()}${String(path).replace(/^\\/+/, '')}`;
  }

  const CITIES = [
    {
      id: 'ha-noi',
      name: 'Hà Nội',
      region: 'Miền Bắc',
      pagePath: 'cities/ha-noi.html',
      image: 'images/hanoi.jpg',
      description: 'Thủ đô ngàn năm văn hiến, phù hợp cho du lịch văn hóa và công tác.',
      isActive: true,
    },
    {
      id: 'da-nang',
      name: 'Đà Nẵng',
      region: 'Miền Trung',
      pagePath: 'cities/da-nang.html',
      image: 'images/danang.jpg',
      description: 'Thành phố biển hiện đại với nhiều khu nghỉ dưỡng và khách sạn cao cấp.',
      isActive: true,
    },
    {
      id: 'ho-chi-minh',
      name: 'Hồ Chí Minh',
      region: 'Miền Nam',
      pagePath: 'cities/ho-chi-minh.html',
      image: 'images/hochiminh.jpg',
      description: 'Trung tâm kinh tế sôi động, nhiều lựa chọn lưu trú cho công tác và nghỉ dưỡng.',
      isActive: true,
    },
    {
      id: 'phu-quoc',
      name: 'Phú Quốc',
      region: 'Miền Nam',
      pagePath: 'cities/phu-quoc.html',
      image: 'images/phuquoc.jpg',
      description: 'Đảo ngọc nổi tiếng với resort ven biển và kỳ nghỉ gia đình.',
      isActive: true,
    },
    {
      id: 'hoi-an',
      name: 'Hội An',
      region: 'Miền Trung',
      pagePath: '',
      image: 'images/danang.jpg',
      description: 'Phố cổ yên bình, phù hợp với du lịch nghỉ dưỡng và trải nghiệm văn hóa.',
      isActive: false,
    },
  ];

  function getCities(options = {}) {
    const includeInactive = Boolean(options.includeInactive);
    return CITIES.filter((city) => includeInactive || city.isActive);
  }

  function getCityById(cityId) {
    return CITIES.find((city) => city.id === cityId) || null;
  }

  window.CITIES = CITIES;
  window.HotelApp = Object.assign({}, window.HotelApp, {
    pathFromRoot,
    getCities,
    getCityById,
  });
})(window);
