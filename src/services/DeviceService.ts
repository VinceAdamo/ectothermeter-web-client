import axios from 'axios';
import { PROXY_URL } from '../constants';
import { Device } from '../types';

const DEVICE_SERVICE_URL = `${PROXY_URL}/device`;

export class DeviceService {
    static async readForUser(token: string): Promise<Device[] | null> {
        try {
            const response = await axios.get(`${DEVICE_SERVICE_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
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