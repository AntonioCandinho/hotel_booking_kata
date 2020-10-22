import * as uuid from 'uuid';
import {Booking, BookingDTO} from './entities/Booking';
import {AvailableHotelRoomsRetriever} from './gateways/AvailableHotelRoomsRetriever';
import {BookingPolicyChecker} from './gateways/BookingPolicyChecker';
import {BookingsRepository} from './repositories/BookingsRepository';

export class BookingService {
	public constructor(
		private readonly roomsRetriever: AvailableHotelRoomsRetriever,
		private readonly policyChecker: BookingPolicyChecker,
		private readonly repo: BookingsRepository,
	) {}

	public book(
		employeeId: string,
		hotelId: string,
		roomType: string,
		checkIn: Date,
		checkOut: Date,
	): BookingDTO {
		const booking = Booking.create(
			uuid.v4(),
			employeeId,
			hotelId,
			roomType,
			checkIn,
			checkOut,
		);
		const rooms = this.roomsRetriever.getAvailableRoomsBy(hotelId, roomType);
		this.policyChecker.assertBookingAllowed(employeeId, roomType);
		const concurrentBookings = this.repo.getConcurrentBookings(booking);
		booking.assignOneRoom(rooms, concurrentBookings);
		this.repo.save(booking);
		return booking.asDTO();
	}
}
