export default interface TickerAlert {
    id: number;
    userId: number;
    active: boolean;
    sentReminder: boolean;

    ticker: string;
    market: string;
    maxPrice: number;
    minPrice: number;
}