import axios from 'axios';
import { PROXY_URL } from '../constants';
import { Readings } from '../types';

const HUMIDITY_SERVICE_URL = `${PROXY_URL}/humidity`;

export class HumidityService {
    static async latest(
        deviceId: string,
        token: string,
    ): Promise<Readings | null> {
        try {
            const response = await axios.get(`${HUMIDITY_SERVICE_URL}/${deviceId}/latest`, {
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