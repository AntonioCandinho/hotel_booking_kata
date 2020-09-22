export interface Booking {
	id: string;
	employeeId: string;
	hotelId: string;
	roomNumber: string;
	roomType: string;
	checkInDate: Date;
	checkOutDate: Date;
}

export class BookingService {
	public book(
		employeeId: string,
		hotelId: string,
		roomType: string,
		checkIn: Date,
		checkOut: Date,
	): Booking {
		throw Error('Not implemented');
	}
}
