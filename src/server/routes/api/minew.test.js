import { gatewayPostData } from '@fixtures/minew';
import request from 'supertest';

jest.mock('debug', () => jest.fn().mockImplementation(() => jest.fn().mockImplementation(() => {
  // console.log([scope, message]);
})));

describe('Minew endpoints', () => {
  let molkkyApp;
  let mockSocket;

  beforeEach(() => {
    // eslint-disable-next-line global-require
    molkkyApp = require('@root/server/app');
    mockSocket = { emit: jest.fn() };
    molkkyApp.set('socketio', mockSocket);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it('should handle /api/minew endpoint', async () => {
    // Given
    const receivingData = gatewayPostData;

    // When
    const superTest = await request(molkkyApp)
      .post('/api/minew')
      .send(receivingData);

    // Then
    expect(superTest.res.statusCode).toEqual(200);
    expect(superTest.res.statusMessage).toBe('OK');
    expect(mockSocket.emit).toHaveBeenCalledTimes(1);
    expect(mockSocket.emit).toHaveBeenLastCalledWith('UPDATE', {
      AC233FA247EB: {
        battery: 100, position: 'UPRIGHT', value: 1, z: 1,
      },
      AC233FA247F0: {
        battery: 100, position: 'UPRIGHT', value: 2, z: 1.0078125,
      },
    });
  });

  it('should handle /api/minew endpoint when there is a body but no sensors data', async () => {
    // Given
    const receivingData = [{ noSensor: 'noSensor' }];

    // When
    const superTest = await request(molkkyApp)
      .post('/api/minew')
      .send(receivingData);

    // Then
    expect(superTest.res.statusCode).toEqual(200);
    expect(superTest.res.statusMessage).toBe('OK');
    expect(mockSocket.emit).toHaveBeenCalledTimes(0);
    // expect(debugRenderer.mock.calls[0][0]).toBe('connected-molkky');
    // expect(debugRenderer.mock.results[0].value.mock.calls[0][0]).toBe('No skittle sensors');
  });

  it('should handle /api/minew endpoint when there is no body', async () => {
    // Given
    const receivingData = [];

    // When
    const superTest = await request(molkkyApp)
      .post('/api/minew')
      .send(receivingData);

    // Then
    expect(superTest.res.statusCode).toEqual(200);
    expect(superTest.res.statusMessage).toBe('OK');
    expect(mockSocket.emit).toHaveBeenCalledTimes(0);
    // expect(debugRenderer.mock.calls[0][0]).toBe('connected-molkky');
    // expect(debugRenderer.mock.results[0].value.mock.calls[0][0]).toBe('No Body or Empty body');
  });
});
