import {Hotel} from '../entities/Hotel';
import {HotelRepository} from './HotelRepository';

export class InMemoryHotelRepository implements HotelRepository {
	private map: Map<string, Hotel> = new Map();

	public save(hotel: Hotel): void {
		this.map.set(hotel.getId(), hotel);
	}

	public create(hotel: Hotel): void {
		if (this.map.has(hotel.getId())) {
			throw Error(
				`An hotel with the following id ${hotel.getId()} already exists`,
			);
		}
		this.map.set(hotel.getId(), hotel);
	}

	public findBy(hotelId: string): Hotel {
		if (!this.map.has(hotelId)) {
			throw Error(`No hotel exists with the following id ${hotelId}`);
		}
		return this.map.get(hotelId);
	}

	public deleteBy(hotelId: string): void {
		if (!this.map.has(hotelId)) {
			throw Error(`No hotel exists with the following id ${hotelId}`);
		}
		this.map.delete(hotelId);
	}
}
