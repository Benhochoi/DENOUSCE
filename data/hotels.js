/*
 * hotels.js
 * Lưu dữ liệu khách sạn và danh sách phòng.
 * File này không render giao diện; các trang HTML/JS khác sẽ đọc window.HOTELS.
 */
(function (window) {
  'use strict';

  const fallbackPathFromRoot = function (path) {
    return String(path || '').replace(/^\\/+/, '');
  };

  const HotelApp = window.HotelApp || {};
  const pathFromRoot = HotelApp.pathFromRoot || fallbackPathFromRoot;

  const HOTELS = [
    {
      id: 'sofitel-legend-metropole-ha-noi',
      cityId: 'ha-noi',
      name: 'Sofitel Legend Metropole Hà Nội',
      star: 5,
      rating: 9.4,
      reviewCount: 1280,
      address: '15 Ngô Quyền, Hoàn Kiếm, Hà Nội',
      district: 'Hoàn Kiếm',
      image: 'images/hanoi.jpg',
      detailPath: 'hotels/ha-noi/sofitel-legend-metropole-ha-noi.html',
      priceFrom: 4500000,
      currency: 'VND',
      summary: 'Khách sạn biểu tượng tại trung tâm Hà Nội, phù hợp cho kỳ nghỉ cao cấp và công tác.',
      amenities: ['Wifi miễn phí', 'Hồ bơi', 'Nhà hàng', 'Spa', 'Đưa đón sân bay', 'Phòng gym'],
      policies: {
        checkIn: '14:00',
        checkOut: '12:00',
        allowPet: false,
        cancellation: 'Miễn phí hủy trước 48 giờ tùy theo hạng phòng.',
      },
      rooms: [
        {
          id: 'deluxe-room',
          name: 'Deluxe Room',
          area: 32,
          bed: '1 giường đôi lớn',
          maxGuests: 2,
          quantity: 5,
          pricePerNight: 4500000,
          breakfastIncluded: true,
          refundable: true,
          amenities: ['Wifi miễn phí', 'Bữa sáng', 'Điều hòa', 'TV', 'Minibar'],
        },
        {
          id: 'premium-room',
          name: 'Premium Room',
          area: 45,
          bed: '1 giường king',
          maxGuests: 3,
          quantity: 3,
          pricePerNight: 6200000,
          breakfastIncluded: true,
          refundable: true,
          amenities: ['Wifi miễn phí', 'Bữa sáng', 'Bồn tắm', 'View thành phố', 'Máy pha cà phê'],
        },
        {
          id: 'heritage-suite',
          name: 'Heritage Suite',
          area: 65,
          bed: '1 giường king',
          maxGuests: 3,
          quantity: 2,
          pricePerNight: 9800000,
          breakfastIncluded: true,
          refundable: false,
          amenities: ['Wifi miễn phí', 'Bữa sáng', 'Phòng khách riêng', 'Spa credit', 'Dịch vụ quản gia'],
        },
      ],
    },
    {
      id: 'intercontinental-da-nang-sun-peninsula',
      cityId: 'da-nang',
      name: 'InterContinental Đà Nẵng Sun Peninsula',
      star: 5,
      rating: 9.3,
      reviewCount: 980,
      address: 'Bãi Bắc, Bán đảo Sơn Trà, Đà Nẵng',
      district: 'Sơn Trà',
      image: 'images/danang.jpg',
      detailPath: 'hotels/da-nang/intercontinental-da-nang-sun-peninsula.html',
      priceFrom: 7000000,
      currency: 'VND',
      summary: 'Khu nghỉ dưỡng sang trọng trên bán đảo Sơn Trà với không gian biển riêng tư.',
      amenities: ['Wifi miễn phí', 'Bãi biển riêng', 'Hồ bơi', 'Spa', 'Nhà hàng', 'Xe đưa đón'],
      policies: {
        checkIn: '15:00',
        checkOut: '12:00',
        allowPet: false,
        cancellation: 'Chính sách hủy phụ thuộc vào gói phòng và mùa cao điểm.',
      },
      rooms: [
        {
          id: 'classic-ocean-view',
          name: 'Classic Ocean View',
          area: 50,
          bed: '1 giường king hoặc 2 giường đơn',
          maxGuests: 2,
          quantity: 4,
          pricePerNight: 7000000,
          breakfastIncluded: true,
          refundable: true,
          amenities: ['Wifi miễn phí', 'Bữa sáng', 'Ban công', 'View biển', 'Bồn tắm'],
        },
        {
          id: 'son-tra-suite',
          name: 'Sơn Trà Suite',
          area: 80,
          bed: '1 giường king',
          maxGuests: 3,
          quantity: 2,
          pricePerNight: 10500000,
          breakfastIncluded: true,
          refundable: false,
          amenities: ['Wifi miễn phí', 'Bữa sáng', 'Phòng khách', 'View biển', 'Dịch vụ club'],
        },
      ],
    },
    {
      id: 'park-hyatt-saigon',
      cityId: 'ho-chi-minh',
      name: 'Park Hyatt Saigon',
      star: 5,
      rating: 9.2,
      reviewCount: 1120,
      address: '2 Công Trường Lam Sơn, Quận 1, TP. Hồ Chí Minh',
      district: 'Quận 1',
      image: 'images/hochiminh.jpg',
      detailPath: 'hotels/ho-chi-minh/park-hyatt-saigon.html',
      priceFrom: 5200000,
      currency: 'VND',
      summary: 'Khách sạn 5 sao trung tâm Quận 1, thuận tiện di chuyển đến nhà hát thành phố và phố đi bộ.',
      amenities: ['Wifi miễn phí', 'Hồ bơi', 'Spa', 'Nhà hàng', 'Bar', 'Phòng gym'],
      policies: {
        checkIn: '15:00',
        checkOut: '12:00',
        allowPet: false,
        cancellation: 'Miễn phí hủy trước 24-48 giờ tùy hạng phòng.',
      },
      rooms: [
        {
          id: 'park-room',
          name: 'Park Room',
          area: 34,
          bed: '1 giường king',
          maxGuests: 2,
          quantity: 6,
          pricePerNight: 5200000,
          breakfastIncluded: true,
          refundable: true,
          amenities: ['Wifi miễn phí', 'Bữa sáng', 'Bàn làm việc', 'TV', 'Minibar'],
        },
        {
          id: 'park-deluxe-room',
          name: 'Park Deluxe Room',
          area: 41,
          bed: '1 giường king',
          maxGuests: 3,
          quantity: 4,
          pricePerNight: 6800000,
          breakfastIncluded: true,
          refundable: true,
          amenities: ['Wifi miễn phí', 'Bữa sáng', 'View thành phố', 'Bồn tắm', 'Máy pha cà phê'],
        },
      ],
    },
    {
      id: 'jw-marriott-phu-quoc-emerald-bay',
      cityId: 'phu-quoc',
      name: 'JW Marriott Phú Quốc Emerald Bay',
      star: 5,
      rating: 9.1,
      reviewCount: 760,
      address: 'Bãi Khem, An Thới, Phú Quốc, Kiên Giang',
      district: 'An Thới',
      image: 'images/phuquoc.jpg',
      detailPath: 'hotels/phu-quoc/jw-marriott-phu-quoc-emerald-bay.html',
      priceFrom: 6500000,
      currency: 'VND',
      summary: 'Resort ven biển Bãi Khem, phù hợp cho kỳ nghỉ gia đình và tuần trăng mật.',
      amenities: ['Wifi miễn phí', 'Bãi biển riêng', 'Hồ bơi', 'Spa', 'Nhà hàng', 'Kids club'],
      policies: {
        checkIn: '15:00',
        checkOut: '12:00',
        allowPet: false,
        cancellation: 'Có thể hủy/đổi ngày theo điều kiện từng gói đặt phòng.',
      },
      rooms: [
        {
          id: 'emerald-bay-room',
          name: 'Emerald Bay Room',
          area: 53,
          bed: '1 giường king hoặc 2 giường đơn',
          maxGuests: 2,
          quantity: 5,
          pricePerNight: 6500000,
          breakfastIncluded: true,
          refundable: true,
          amenities: ['Wifi miễn phí', 'Bữa sáng', 'Ban công', 'View vườn', 'Bồn tắm'],
        },
        {
          id: 'ocean-view-suite',
          name: 'Ocean View Suite',
          area: 90,
          bed: '1 giường king',
          maxGuests: 3,
          quantity: 2,
          pricePerNight: 11800000,
          breakfastIncluded: true,
          refundable: false,
          amenities: ['Wifi miễn phí', 'Bữa sáng', 'View biển', 'Phòng khách', 'Dịch vụ club'],
        },
      ],
    },
    {
      id: 'anantara-hoi-an-resort',
      cityId: 'hoi-an',
      name: 'Anantara Hội An Resort',
      star: 5,
      rating: 9.0,
      reviewCount: 640,
      address: '1 Phạm Hồng Thái, Hội An, Quảng Nam',
      district: 'Trung tâm Hội An',
      image: 'images/danang.jpg',
      detailPath: 'hotels/hoi-an/anantara-hoi-an-resort.html',
      priceFrom: 4200000,
      currency: 'VND',
      summary: 'Khu nghỉ dưỡng ven sông gần phố cổ Hội An, phù hợp nghỉ dưỡng và khám phá văn hóa.',
      amenities: ['Wifi miễn phí', 'Hồ bơi', 'Spa', 'Nhà hàng', 'Xe đạp miễn phí', 'Tour địa phương'],
      policies: {
        checkIn: '14:00',
        checkOut: '12:00',
        allowPet: false,
        cancellation: 'Miễn phí hủy trước 48 giờ đối với một số hạng phòng.',
      },
      rooms: [
        {
          id: 'deluxe-balcony',
          name: 'Deluxe Balcony',
          area: 42,
          bed: '1 giường king',
          maxGuests: 2,
          quantity: 4,
          pricePerNight: 4200000,
          breakfastIncluded: true,
          refundable: true,
          amenities: ['Wifi miễn phí', 'Bữa sáng', 'Ban công', 'View vườn', 'Bồn tắm'],
        },
        {
          id: 'river-view-suite',
          name: 'River View Suite',
          area: 60,
          bed: '1 giường king',
          maxGuests: 3,
          quantity: 2,
          pricePerNight: 7600000,
          breakfastIncluded: true,
          refundable: true,
          amenities: ['Wifi miễn phí', 'Bữa sáng', 'View sông', 'Phòng khách', 'Máy pha cà phê'],
        },
      ],
    },
  ];

  function getHotels(options = {}) {
    const cityId = options.cityId;
    const minStar = Number(options.minStar || 0);
    const maxPrice = Number(options.maxPrice || 0);
    const keyword = String(options.keyword || '').trim().toLowerCase();

    return HOTELS.filter((hotel) => {
      const matchCity = !cityId || hotel.cityId === cityId;
      const matchStar = !minStar || hotel.star >= minStar;
      const matchPrice = !maxPrice || hotel.priceFrom <= maxPrice;
      const matchKeyword = !keyword || [hotel.name, hotel.address, hotel.district, hotel.summary]
        .join(' ')
        .toLowerCase()
        .includes(keyword);

      return matchCity && matchStar && matchPrice && matchKeyword;
    });
  }

  function getHotelById(hotelId) {
    return HOTELS.find((hotel) => hotel.id === hotelId) || null;
  }

  function getRoomsByHotelId(hotelId) {
    const hotel = getHotelById(hotelId);
    return hotel ? hotel.rooms : [];
  }

  function getRoomById(hotelId, roomId) {
    const hotel = getHotelById(hotelId);
    if (!hotel) {
      return null;
    }

    return hotel.rooms.find((room) => room.id === roomId) || null;
  }

  function formatCurrency(amount, currency = 'VND') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(Number(amount || 0));
  }

  function getHotelImageUrl(hotel) {
    return pathFromRoot(hotel && hotel.image);
  }

  function getHotelDetailUrl(hotel) {
    return pathFromRoot(hotel && hotel.detailPath);
  }

  window.HOTELS = HOTELS;
  window.HotelApp = Object.assign({}, window.HotelApp, {
    getHotels,
    getHotelById,
    getRoomsByHotelId,
    getRoomById,
    formatCurrency,
    getHotelImageUrl,
    getHotelDetailUrl,
  });
})(window);
