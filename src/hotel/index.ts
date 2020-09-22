import {Hotel, SerializedHotel} from './entities/Hotel';
import {HotelRepository} from './repositories/HotelRepository';

export class HotelService {
	public constructor(private readonly repository: HotelRepository) {}

	public addHotel(hotelId: string, hotelName: string): void {
		const hotel = new Hotel(hotelId, hotelName);
		this.repository.create(hotel);
	}

	public setRoom(hotelId: string, roomNumber: string, roomType: string): void {
		const hotel = this.repository.findBy(hotelId);
		hotel.addRoom({number: roomNumber, type: roomType});
		this.repository.save(hotel);
	}

	public deleteBy(hotelId: string): void {
		this.repository.deleteBy(hotelId);
	}

	public findHotelBy(hotelId: string): SerializedHotel {
		const hotel = this.repository.findBy(hotelId);
		return hotel.serialize();
	}
}
