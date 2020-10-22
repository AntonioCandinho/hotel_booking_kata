import * as uuid from 'uuid';
import {Booking} from '../entities/Booking';
import {InMemoryBookingsRepository} from './InMemoryBookingsRepository';

const createBooking = (
	hotelId: string,
	startDay: number,
	dayDiff: number = 1,
) => {
	const checkInDate = new Date(0);
	checkInDate.setDate(checkInDate.getDate() + startDay);
	const checkOutDate = new Date(checkInDate.getTime());
	checkOutDate.setDate(checkOutDate.getDate() + dayDiff);
	return new Booking(
		`id-${uuid.v4()}`,
		`employee-${uuid.v4()}`,
		hotelId,
		`type-${uuid.v4()}`,
		checkInDate,
		checkOutDate,
	);
};

describe('InMemoryBookingsRepository', () => {
	let repository: InMemoryBookingsRepository;

	beforeAll(() => {
		repository = new InMemoryBookingsRepository();
	});

	describe('given some bookings', () => {
		let hotelABookings: Booking[];
		let hotelBBookings: Booking[];

		const createNBookings = (hotelId: string, n: number) =>
			[...Array(n).keys()].map((i) => createBooking(hotelId, i));

		beforeEach(() => {
			hotelABookings = createNBookings(`hotel-${uuid.v4()}`, 4);
			hotelBBookings = createNBookings(`hotel-${uuid.v4()}`, 4);
			[...hotelABookings, ...hotelBBookings].forEach((b) => repository.save(b));
		});

		afterEach(() => {
			[...hotelABookings, ...hotelBBookings].forEach((b) =>
				repository.deleteBy(b.bookingId),
			);
		});

		it('should be able to get concurrent bookings fot the same hotel', () => {
			const [b, c1, c2] = hotelABookings;
			const currentBooking = createBooking(b.hotelId, 1, 2);
			const concurrentBookings = repository.getConcurrentBookings(
				currentBooking,
			);
			expect(concurrentBookings).toEqual([c1, c2]);
		});

		it('should return an empty array if no concurrent bookings', () => {
			const [b] = hotelABookings;
			const currentBooking = createBooking(b.hotelId, 4, 1);
			const concurrentBookings = repository.getConcurrentBookings(
				currentBooking,
			);
			expect(concurrentBookings).toEqual([]);
		});
	});
});
