import ClipLoader from "react-spinners/ClipLoader";
import { DeviceItem } from "./DeviceItem";
import { useDevices } from "../hooks/useDevices";

export const DeviceGrid: React.FC = () => {
    const { devices, loading, error } = useDevices();

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <ClipLoader color='#ffffff' loading={loading} size={150} />
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex justify-center items-center h-screen text-red-400 text-2xl xl:text-4xl text-center font-bold'>
                {error}
            </div>
        );
    }

    if (!devices) {
        throw new Error('Devices should be defined when not loading or in error state!');
    }

    if (devices.length === 0) {
        return (
            <div className='flex justify-center items-center h-screen text-white text-2xl xl:text-4xl text-center font-bold'>
                You do not have any devices configured!
            </div>
        );
    }

    return (
        <div className='grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-5 font-mono p-5'>
            {
                devices.map((device) => (
                    <DeviceItem device={device} key={device.id}/>
                ))
            }
        </div>
    )
}