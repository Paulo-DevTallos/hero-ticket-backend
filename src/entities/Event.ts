import { LocationEntity } from "./Location";
import { PriceEntity } from "./Price";
import { UserEntity } from "./User";

export class EventEntity {
    constructor(
        public title: string,
        public location: LocationEntity,
        public date: Date,
        public price: PriceEntity[],
        public categories: string[],
        public description: string,
        public banner: string,
        public flyers: string,
        public coupons: string[],
        public participants: UserEntity[],
        public city: string,
    ) {}
}
