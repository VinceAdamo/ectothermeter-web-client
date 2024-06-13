import ClipLoader from "react-spinners/ClipLoader";
import { Device } from "../types";
import { DeviceItem } from "./DeviceItem";

interface DeviceGridProps {
    devices: Device[] | null;
}

export const DeviceGrid: React.FC<DeviceGridProps> = ({
    devices,
}) => {
    if (!devices) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <ClipLoader color='#ffffff' loading={true} size={150} />
            </div>
        );
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