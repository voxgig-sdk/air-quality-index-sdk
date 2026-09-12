export interface Aqi {
    aqi: string;
    city: string;
    co: string;
    geo: Record<string, any>;
    no2: string;
    o3: string;
    pm10: string;
    pm25: string;
    so2: string;
}
export interface AqiLoadMatch {
    city?: string;
    ip?: string;
    lat?: number;
    lon?: number;
}
