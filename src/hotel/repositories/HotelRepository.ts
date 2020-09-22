import {Hotel} from '../entities/Hotel';

export interface HotelRepository {
	create(hotel: Hotel): void;
	save(hotel: Hotel): void;
	findBy(hotelId: string): Hotel;
	deleteBy(hotelId: string): void;
}
