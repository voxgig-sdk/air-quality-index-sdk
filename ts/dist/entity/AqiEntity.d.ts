import { AirQualityIndexEntityBase } from '../AirQualityIndexEntityBase';
import type { AirQualityIndexSDK } from '../AirQualityIndexSDK';
import type { Control } from '../types';
import type { Aqi, AqiLoadMatch } from '../AirQualityIndexTypes';
declare class AqiEntity extends AirQualityIndexEntityBase<Aqi> {
    constructor(client: AirQualityIndexSDK, entopts: any);
    make(this: AqiEntity): AqiEntity;
    load(this: any, reqmatch?: AqiLoadMatch, ctrl?: Control): Promise<AqiEntity>;
}
export { AqiEntity };
