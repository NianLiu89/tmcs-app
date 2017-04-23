export class DataPoint {
    private code: string;
    // kiln: string; 
    // slot: number;  // 车位
    // position: string;
    // maxTemperature: number;
    // minTemperature: number;
    private temperature: number; // 温度
    // moduleId: number;
    // channelId: number;

    public constructor(code: string, temperature: number) {
        this.code = code;
        this.temperature = temperature;
    }

    public getCode(): string {
        return this.code;
    }

    public getTemperature(): number {
        return this.temperature;
    }

}
