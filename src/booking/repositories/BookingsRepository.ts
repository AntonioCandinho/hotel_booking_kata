import {Booking} from '../entities/Booking';

export interface BookingsRepository {
	getConcurrentBookings(booking: Booking): Booking[];
	save(booking: Booking): void;
	getBy(bookingId: string): Booking;
	deleteBy(bookingId: string): void;
	deleteEmployeeBookingsBy(employeeId: string): void;
}
