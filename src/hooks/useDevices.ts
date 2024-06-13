import { useState, useContext, useEffect } from 'react';
import { Device } from '../types';
import { AuthContext } from '../contexts/AuthContext';
import { DeviceService } from '../services';

export const useDevices = () => {
    const [devices, setDevices] = useState<Device[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
            try {
                const response = await DeviceService.readForUser(authToken);

                if (!response) {
                    throw new Error('Empty response received reading user devices!');;
                }

                setDevices(response);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching devices!');
                setLoading(false);
            }
        };

        fetchDevices();
    }, [authContext]);

    return { devices, loading, error };
};