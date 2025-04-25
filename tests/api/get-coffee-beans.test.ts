import axios from 'axios';
import { describe, it, expect, beforeAll } from '@jest/globals';

// Replace with your actual API endpoint
const API_ENDPOINT =
  'https://wnqtye2xz9.execute-api.eu-north-1.amazonaws.com/prod';

// Store a valid ID to use in tests
let validCoffeeBeanId: string;

describe('Coffee Beans API Integration Tests', () => {
  // First get all beans to extract a valid ID for subsequent tests
  beforeAll(async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/coffee-beans`);
    } catch (error) {
      console.error('Error in beforeAll:', error);
    }
  });

  describe('GET /coffee-beans', () => {
    it('should return all coffee beans with status 200', async () => {
      const response = await axios.get(`${API_ENDPOINT}/coffee-beans`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      console.log('Response data:', response.data);

      // Basic validation of returned beans
      if (response.data.length > 0) {
        const firstBean = response.data[0];
        expect(firstBean).toHaveProperty('id');
        expect(firstBean).toHaveProperty('name');
        // Add more property checks as needed
      }
    });
  });
});
