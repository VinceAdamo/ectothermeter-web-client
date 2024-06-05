import { useState, useContext, useEffect } from 'react';
import { Device } from '../types';
import { AuthContext } from '../contexts/AuthContext';
import { DeviceService } from '../services';

export const useDevices = () => {
    const [devices, setDevices] = useState<Device[] | null>(null);

    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (!authContext) {
            return;
        }

        const { authToken } = authContext;

        if (!authToken) {
            return;
        }

        const fetchDevices = async () => {
            const response = await DeviceService.readForUser(authToken);

            if (!response) {
                return;
            }

            setDevices(response);
        };

        fetchDevices();
    }, [authContext]);

    return devices;
};