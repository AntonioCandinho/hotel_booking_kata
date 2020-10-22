import {Booking} from '../entities/Booking';
import {BookingsRepository} from './BookingsRepository';

export class InMemoryBookingsRepository implements BookingsRepository {
	private bookings: Map<string, Booking>;

	public constructor() {
		this.bookings = new Map();
	}

	getConcurrentBookings(booking: Booking): Booking[] {
		const concurrentBookings = [];
		const cIn = booking.checkInDate.getTime();
		const cOut = booking.checkOutDate.getTime();
		for (const nextBooking of this.bookings.values()) {
			if (nextBooking.hotelId !== booking.hotelId) {
				continue;
			}
			const nCIn = nextBooking.checkInDate.getTime();
			const nCOut = nextBooking.checkOutDate.getTime();
			if ((nCIn > cIn && nCIn < cOut) || (nCOut < cOut && nCOut > cIn)) {
				concurrentBookings.push(nextBooking);
			}
		}
		return concurrentBookings;
	}

	save(booking: Booking) {
		this.bookings.set(booking.bookingId, booking);
	}

	deleteBy(bookingId: string): void {
		this.bookings.delete(bookingId);
	}
}
