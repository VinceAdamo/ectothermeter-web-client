import { useState, useContext, useEffect } from 'react';
import { Readings } from '../types';
import { AuthContext } from '../contexts/AuthContext';
import { TemperatureService, HumidityService } from '../services';

export const useReadings = (deviceId: string) => {
    const [temperature, setTemperatureReadings] = useState<Readings | null>(null);
    const [humidity, setHumidityReadings] = useState<Readings | null>(null);

    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (!authContext) {
            return;
        }

        const { authToken } = authContext;

        if (!authToken) {
            return;
        }

        const fetchTemperature = async () => {
            const response = await TemperatureService.latest(deviceId, authToken);

            if (!response) {
                return;
            }

            setTemperatureReadings(response);
        };

        const fetchHumidity = async () => {
            const response = await HumidityService.latest(deviceId, authToken);

            if (!response) {
                return;
            }

            setHumidityReadings(response);
        };

        fetchTemperature();
        fetchHumidity();

        const humidityIntervalId = setInterval(fetchHumidity, 5000); // Poll every 5 seconds
        const temperatureIntervalId = setInterval(fetchTemperature, 5000); // Poll every 5 seconds

        return () => {
            clearInterval(humidityIntervalId);
            clearInterval(temperatureIntervalId);
        };
    }, [authContext, deviceId]);

    return { temperature, humidity };
};