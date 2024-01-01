/**
 * Authentication services class for handling user login, registration, and logout.
 *
 * @class AuthServices
 */
export class AuthServices {
  /**
   * Base URL for Todo API.
   *
   * @static
   * @private
   * @type {string}
   */
  private static URL: string = import.meta.env.VITE_AUTH_URL;

  /**
   * Performs user login by sending login data to the authentication server.
   *
   * @static
   * @async
   * @param {{ userEmail: string; userPassword: string }} loginData - The user login data.
   * @returns {Promise<Object>} A promise that resolves with the fetched data from the server or resolved with error if login fails
   */
  static async login(loginData: { userEmail: string; userPassword: string }) {
    try {
      console.log('From auth-services', loginData);
      const response = await fetch(`${this.URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });

      if (response.status === 500) {
        throw new Error('Server Error, Something went wrong!!!');
      }

      const fetchedData = await response.json();
      return fetchedData;
    } catch (error) {
      throw new Error('Failed to login !!!');
    }
  }

  /**
   * Registers a new user by sending registration data to the authentication server.
   *
   * @static
   * @async
   * @param {{ userEmail: string; userName: string; userPassword: string }} registerData - The user registration data.
   * @returns {Promise<Object>} A promise that resolves when the registration is successful or reject with an error if the registration fails.
   */
  static async register(registerData: { userEmail: string; userName: string; userPassword: string }) {
    try {
      const response = await fetch(`${this.URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      if (response.status === 500) {
        throw new Error('Server Error, Something went wrong!!!');
      }

      const fetchedData = await response.json();
      return fetchedData;
    } catch (error) {
      throw new Error('Failed to register !!!');
    }
  }

  /**
   * Logs out the current user by making a request to the logout endpoint.

   * @static
   * @async
   * @returns {Promise<void>} A promise that resolves when the logout is successful or reject with an error if the logout fails.
   */
  static async logout(): Promise<void> {
    try {
      const response = await fetch(`${this.URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.status === 500) {
        throw new Error('Failed to Logout !!!');
      }

      await response.json();
    } catch (error) {
      throw new Error('Failed to Logout !!!');
    }
  }
}
