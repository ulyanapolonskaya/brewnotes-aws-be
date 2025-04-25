import {
  getAllCoffeeBeans,
  getCoffeeBeanById,
  createCoffeeBean,
  deleteCoffeeBean,
} from './coffee-bean-service';
import { docClient } from '../utils/dynamodb';
import { CoffeeBean, CreateCoffeeBeanRequest } from '../models/coffee-bean';
import { v4 as uuidv4 } from 'uuid';

// Mock the uuid module
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

// Mock the dynamodb client
jest.mock('../utils/dynamodb', () => {
  const mockSend = jest.fn();
  return {
    docClient: {
      send: mockSend,
    },
    PutCommand: jest.fn().mockImplementation((params) => params),
    ScanCommand: jest.fn().mockImplementation((params) => params),
    GetCommand: jest.fn().mockImplementation((params) => params),
    UpdateCommand: jest.fn().mockImplementation((params) => params),
    DeleteCommand: jest.fn().mockImplementation((params) => params),
  };
});

describe('Coffee Bean Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the uuid to return a fixed value
    (uuidv4 as jest.Mock).mockReturnValue('mock-uuid');
  });

  describe('getAllCoffeeBeans', () => {
    it('should return all coffee beans that are not deleted', async () => {
      const mockCoffeeBeans = [
        { id: '1', name: 'Ethiopian', rating: 5 },
        { id: '2', name: 'Colombian', rating: 4 },
      ];

      (docClient.send as jest.Mock).mockResolvedValueOnce({
        Items: mockCoffeeBeans,
      });

      const result = await getAllCoffeeBeans();

      expect(docClient.send).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCoffeeBeans);
    });
  });

  describe('getCoffeeBeanById', () => {
    it('should return a coffee bean when it exists', async () => {
      const mockCoffeeBean = { id: '1', name: 'Ethiopian', rating: 5 };

      (docClient.send as jest.Mock).mockResolvedValueOnce({
        Item: mockCoffeeBean,
      });

      const result = await getCoffeeBeanById('1');

      expect(docClient.send).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCoffeeBean);
    });

    it('should return null when coffee bean does not exist', async () => {
      (docClient.send as jest.Mock).mockResolvedValueOnce({
        Item: null,
      });

      const result = await getCoffeeBeanById('non-existent-id');

      expect(docClient.send).toHaveBeenCalledTimes(1);
      expect(result).toBeNull();
    });
  });

  describe('createCoffeeBean', () => {
    it('should create and return a new coffee bean', async () => {
      const mockDate = '2023-01-01T00:00:00.000Z';
      jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDate);

      const createRequest: CreateCoffeeBeanRequest = {
        name: 'Brazilian',
        description: 'Smooth and nutty',
        rating: 4,
      };

      const expectedCoffeeBean: CoffeeBean = {
        id: 'mock-uuid',
        name: 'Brazilian',
        description: 'Smooth and nutty',
        rating: 4,
        createdAt: mockDate,
      };

      (docClient.send as jest.Mock).mockResolvedValueOnce({});

      const result = await createCoffeeBean(createRequest);

      expect(docClient.send).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedCoffeeBean);
    });
  });

  describe('deleteCoffeeBean', () => {
    it('should soft delete a coffee bean successfully', async () => {
      const mockDate = '2023-01-01T00:00:00.000Z';
      jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDate);

      (docClient.send as jest.Mock).mockResolvedValueOnce({
        Attributes: { id: '1', deletedAt: mockDate },
      });

      const result = await deleteCoffeeBean('1');

      expect(docClient.send).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it('should return false when deletion fails', async () => {
      (docClient.send as jest.Mock).mockRejectedValueOnce(
        new Error('DB error')
      );

      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const result = await deleteCoffeeBean('1');

      expect(docClient.send).toHaveBeenCalledTimes(1);
      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });
});
