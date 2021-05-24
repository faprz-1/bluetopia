export default interface Asset {
    id: number;
    name: string;
    price: number;
    market: string;

    userId: number;
    portfolioId: number;
    value: number;
}