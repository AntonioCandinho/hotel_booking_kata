import * as uuid from 'uuid';
import {Booking} from './Booking';

const createBooking = (
	roomType: string = `room-type-${uuid.v4()}`,
	roomNumber?: string,
) => {
	const checkInDate = new Date(0);
	const checkOutDate = new Date(checkInDate.getTime());
	checkOutDate.setDate(checkOutDate.getDate() + 10);
	return new Booking(
		`id-${uuid.v4()}`,
		`employee-${uuid.v4()}`,
		`hotel-id-${uuid.v4()}`,
		roomType,
		checkInDate,
		checkOutDate,
		roomNumber,
	);
};

describe('Booking', () => {
	const booking = createBooking();

	it('should be able to book the first hotel room if no concurrent bookings', () => {
		const roomNumber = uuid.v4();
		booking.assignOneRoom([roomNumber, uuid.v4(), uuid.v4()], []);
		expect(booking.roomNumber).toEqual(roomNumber);
	});

	describe('given some concurrent bookings', () => {
		const booking1 = createBooking(booking.roomType, `booked-room-1`);
		const booking2 = createBooking(booking.roomType, `booked-room-2`);

		it('should pick the first available room', () => {
			const roomNumber = uuid.v4();
			booking.assignOneRoom(
				[booking1.roomNumber, booking2.roomNumber, roomNumber],
				[booking1, booking2],
			);
			expect(booking.roomNumber).toEqual(roomNumber);
		});

		it('should throw an error if no rooms available', () => {
			expect(() =>
				booking.assignOneRoom(
					[booking1.roomNumber, booking2.roomNumber],
					[booking1, booking2],
				),
			).toThrow(`No rooms currently available for hotel: ${booking.hotelId}`);
		});
	});
});
