
const AsyncStorageMock = {
  getItem: jest.fn((key) => {
    return new Promise((resolve, reject) => {
      resolve(AsyncStorageMock.store[key] || null);
    });
  }),
  setItem: jest.fn((key, value) => {
    return new Promise((resolve, reject) => {
      AsyncStorageMock.store[key] = value;
      resolve();
    });
  }),
  removeItem: jest.fn((key) => {
    return new Promise((resolve, reject) => {
      delete AsyncStorageMock.store[key];
      resolve();
    });
  }),
  clear: jest.fn(() => {
    return new Promise((resolve, reject) => {
      AsyncStorageMock.store = {};
      resolve();
    });
  }),
  getAllKeys: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(Object.keys(AsyncStorageMock.store));
    });
  }),
  store: {},
};

export default AsyncStorageMock;
