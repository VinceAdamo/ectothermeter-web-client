export type Readings = {
    id: string;
    deviceId: string;
    value: number;
    timestamp: string;
};

export type User = {
    email: string;
    id: string;
};

export type Device = {
    id: string;
    serialNumber: string;
    name: string;
    users: User[];
};