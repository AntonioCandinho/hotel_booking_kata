import {HotelRoom, SerializedHotel} from '../../hotel/entities/Hotel';
import {AvailableHotelRoomsRetriever} from './AvailableHotelRoomsRetriever';

export interface HotelByIdFinder {
	findHotelBy(hotelId: string): SerializedHotel;
}

export class HotelServiceGateway implements AvailableHotelRoomsRetriever {
	public constructor(private readonly finder: HotelByIdFinder) {}

	public getAvailableRoomsBy(hotelId: string, roomType: string): string[] {
		const rooms = this.findHotelRooms(hotelId);
		const roomsWithType = rooms.filter((r) => r.type === roomType);
		if (roomsWithType.length === 0) {
			const msg = `Hotel with id "${hotelId}" does not have any "${roomType}" room`;
			throw Error(msg);
		}
		return roomsWithType.map((r) => r.number);
	}

	private findHotelRooms(hotelId: string): HotelRoom[] {
		try {
			const hotel = this.finder.findHotelBy(hotelId);
			return hotel.rooms;
		} catch (e) {
			throw Error(`Hotel with id "${hotelId}" does not exist`);
		}
	}
}
