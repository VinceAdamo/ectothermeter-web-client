import axios from 'axios';
import { PROXY_URL } from '../constants';

const USER_SERVICE_URL = `${PROXY_URL}/user`;

export type LoginResponse = {
    email: string;
    token: string;
};

export class UserService {
    static async login(email: string, password: string): Promise<LoginResponse | null> {
        try {
            const response = await axios.post(`${USER_SERVICE_URL}/login`, {
                email,
                password
            });

            if (!response || !response.data) {
                return null;
            }

            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}