export default interface User {
    id: number;
    email: string;
    name: string;
    username: string;
    phone: string;

    active: boolean;
    customerId: string;
    emailVerified: boolean;
    permissions: any[];
    realm: string;
    AppleToken: string;
    role: any[];
}