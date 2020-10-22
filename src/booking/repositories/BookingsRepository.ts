import {Booking} from '../entities/Booking';

export interface BookingsRepository {
	getConcurrentBookings(booking: Booking): Booking[];
	save(booking: Booking): void;
	deleteBy(bookingId: string): void;
}
