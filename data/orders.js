/*
 * orders.js
 * Quản lý đơn đặt phòng ở phía trình duyệt bằng localStorage.
 * Lưu ý: file JS tĩnh không thể tự ghi dữ liệu vĩnh viễn lên server.
 */
(function (window) {
  'use strict';

  const STORAGE_KEY = 'qlyks_orders_v1';
  const DEFAULT_CURRENCY = 'VND';
  const VALID_STATUSES = ['pending', 'confirmed', 'cancelled', 'completed'];

  let memoryOrders = [];

  function getStorage() {
    try {
      const testKey = '__qlyks_storage_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    } catch (error) {
      return null;
    }
  }

  function safeParseJson(value, fallbackValue) {
    try {
      return value ? JSON.parse(value) : fallbackValue;
    } catch (error) {
      return fallbackValue;
    }
  }

  function readOrders() {
    const storage = getStorage();
    if (!storage) {
      return [...memoryOrders];
    }

    const orders = safeParseJson(storage.getItem(STORAGE_KEY), []);
    return Array.isArray(orders) ? orders : [];
  }

  function writeOrders(orders) {
    const normalizedOrders = Array.isArray(orders) ? orders : [];
    const storage = getStorage();

    if (!storage) {
      memoryOrders = [...normalizedOrders];
      return;
    }

    storage.setItem(STORAGE_KEY, JSON.stringify(normalizedOrders));
  }

  function normalizeText(value) {
    return String(value || '').trim();
  }

  function parseDateOnly(value) {
    const dateText = normalizeText(value);
    const match = dateText.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (!match) {
      throw new Error('Ngày phải có định dạng YYYY-MM-DD.');
    }

    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);
    const date = new Date(Date.UTC(year, month, day));

    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) {
      throw new Error('Ngày không hợp lệ.');
    }

    return date;
  }

  function calculateNights(checkIn, checkOut) {
    const startDate = parseDateOnly(checkIn);
    const endDate = parseDateOnly(checkOut);
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const nights = Math.round((endDate.getTime() - startDate.getTime()) / millisecondsPerDay);

    if (nights <= 0) {
      throw new Error('Ngày trả phòng phải sau ngày nhận phòng.');
    }

    return nights;
  }

  function generateOrderId() {
    const timePart = Date.now().toString(36).toUpperCase();
    const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();
    return `ORD-${timePart}-${randomPart}`;
  }

  function findHotel(hotelId) {
    if (!window.HotelApp || typeof window.HotelApp.getHotelById !== 'function') {
      return null;
    }

    return window.HotelApp.getHotelById(hotelId);
  }

  function findRoom(hotelId, roomId) {
    if (!window.HotelApp || typeof window.HotelApp.getRoomById !== 'function') {
      return null;
    }

    return window.HotelApp.getRoomById(hotelId, roomId);
  }

  function createOrder(input = {}) {
    const hotelId = normalizeText(input.hotelId);
    const roomId = normalizeText(input.roomId);
    const checkIn = normalizeText(input.checkIn);
    const checkOut = normalizeText(input.checkOut);
    const customerName = normalizeText(input.customerName || input.name);
    const customerPhone = normalizeText(input.customerPhone || input.phone);
    const customerEmail = normalizeText(input.customerEmail || input.email);
    const guestCount = Number(input.guestCount || input.guests || 1);

    if (!hotelId) {
      throw new Error('Thiếu mã khách sạn.');
    }

    if (!roomId) {
      throw new Error('Thiếu mã phòng.');
    }

    if (!customerName) {
      throw new Error('Vui lòng nhập họ tên khách hàng.');
    }

    if (!customerPhone) {
      throw new Error('Vui lòng nhập số điện thoại khách hàng.');
    }

    if (!Number.isFinite(guestCount) || guestCount < 1) {
      throw new Error('Số khách phải lớn hơn hoặc bằng 1.');
    }

    const nights = calculateNights(checkIn, checkOut);
    const hotel = findHotel(hotelId);
    const room = findRoom(hotelId, roomId);
    const pricePerNight = Number(input.pricePerNight || input.price || (room && room.pricePerNight) || 0);

    if (!Number.isFinite(pricePerNight) || pricePerNight <= 0) {
      throw new Error('Giá phòng không hợp lệ.');
    }

    if (room && guestCount > room.maxGuests) {
      throw new Error(`Phòng ${room.name} chỉ nhận tối đa ${room.maxGuests} khách.`);
    }

    const now = new Date().toISOString();
    const order = {
      id: generateOrderId(),
      status: 'pending',
      hotelId,
      hotelName: normalizeText(input.hotelName) || (hotel && hotel.name) || '',
      roomId,
      roomName: normalizeText(input.roomName) || (room && room.name) || '',
      checkIn,
      checkOut,
      nights,
      guestCount,
      pricePerNight,
      totalAmount: pricePerNight * nights,
      currency: normalizeText(input.currency) || (hotel && hotel.currency) || DEFAULT_CURRENCY,
      customer: {
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
      },
      note: normalizeText(input.note),
      createdAt: now,
      updatedAt: now,
    };

    const orders = readOrders();
    orders.push(order);
    writeOrders(orders);

    return order;
  }

  function getOrderById(orderId) {
    const normalizedOrderId = normalizeText(orderId);
    return readOrders().find((order) => order.id === normalizedOrderId) || null;
  }

  function updateOrderStatus(orderId, status) {
    const normalizedOrderId = normalizeText(orderId);
    const normalizedStatus = normalizeText(status).toLowerCase();

    if (!VALID_STATUSES.includes(normalizedStatus)) {
      throw new Error('Trạng thái đơn không hợp lệ.');
    }

    const orders = readOrders();
    const orderIndex = orders.findIndex((order) => order.id === normalizedOrderId);

    if (orderIndex === -1) {
      throw new Error('Không tìm thấy đơn đặt phòng.');
    }

    orders[orderIndex] = Object.assign({}, orders[orderIndex], {
      status: normalizedStatus,
      updatedAt: new Date().toISOString(),
    });

    writeOrders(orders);
    return orders[orderIndex];
  }

  function deleteOrder(orderId) {
    const normalizedOrderId = normalizeText(orderId);
    const orders = readOrders();
    const nextOrders = orders.filter((order) => order.id !== normalizedOrderId);

    writeOrders(nextOrders);
    return nextOrders.length < orders.length;
  }

  function clearOrders() {
    writeOrders([]);
  }

  window.OrderStore = {
    createOrder,
    getOrders: readOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    clearOrders,
    calculateNights,
  };

  // Alias ngắn để các trang HTML cũ có thể gọi trực tiếp.
  window.saveOrder = createOrder;
  window.getOrders = readOrders;
  window.getOrderById = getOrderById;
  window.updateOrderStatus = updateOrderStatus;
  window.deleteOrder = deleteOrder;
})(window);
