import {Observable} from 'rxjs';
import * as uuid from 'uuid';
import {BookingDTO} from './booking/entities/Booking';
import {Services} from './index';
import {take} from 'rxjs/operators';

const {
	HotelService,
	BookingService,
	BookingPolicyService,
	CompanyService,
	EmployeeWatchDog,
} = Services;

const first = <T>(o: Observable<T>): Promise<T> => o.pipe(take(1)).toPromise();

const deleteEmployee = async (employeeId: string) => {
	const onProcessed = first(EmployeeWatchDog.getProcessedEvents());
	try {
		CompanyService.deleteEmployee(employeeId);
		await onProcessed;
	} catch (e) {
		// ignored
	}
};

describe('Hotel Booking Acceptation Tests', () => {
	describe('given a hotel with an employee and some policies', () => {
		let HOTEL_ID = `hotel-id-${uuid.v4()}`;
		let COMPANY_ID = `company-id-${uuid.v4()}`;

		let HOTEL_NAME = `hotel-name-${uuid.v4()}`;
		let EMPLOYEE_ID = `employee-id-${uuid.v4()}`;
		let ROOM_NUBMER = `room-number-${uuid.v4()}`;
		let ROOM_TYPE = `some-room-type`;

		beforeEach(() => {
			HotelService.addHotel(HOTEL_ID, HOTEL_NAME);
			HotelService.setRoom(HOTEL_ID, ROOM_NUBMER, ROOM_TYPE);

			CompanyService.addEmployee(COMPANY_ID, EMPLOYEE_ID);
			BookingPolicyService.setEmployeePolicy(EMPLOYEE_ID, [ROOM_TYPE]);
		});

		afterEach(async () => {
			BookingPolicyService.deleteEmployeePoliciesBy(EMPLOYEE_ID);
			HotelService.deleteBy(HOTEL_ID);
			deleteEmployee(EMPLOYEE_ID);
		});

		describe('given an employee is deleted', () => {
			it('employee policy should be deleted', async () => {
				deleteEmployee(EMPLOYEE_ID);
				expect(
					BookingPolicyService.isBookingAllowed(EMPLOYEE_ID, 'AnyROOm'),
				).toBeTruthy();
			});
		});

		describe('given a new booking is created', () => {
			let checkInDate: Date;
			let checkOutDate: Date;
			let booking: BookingDTO;

			beforeEach(() => {
				checkInDate = new Date();
				checkOutDate = new Date(checkInDate.getTime());
				checkOutDate.setDate(checkOutDate.getDate() + 1);
				const createdBooking = BookingService.book(
					EMPLOYEE_ID,
					HOTEL_ID,
					ROOM_TYPE,
					checkInDate,
					checkOutDate,
				);
				booking = BookingService.getBookingBy(createdBooking.bookingId);
			});

			afterEach(() => {
				BookingService.deteleBookingBy(booking.bookingId);
			});

			it('should contain the required information', () => {
				expect(booking).toEqual({
					bookingId: booking.bookingId,
					employeeId: EMPLOYEE_ID,
					hotelId: HOTEL_ID,
					roomNumber: ROOM_NUBMER,
					roomType: ROOM_TYPE,
					checkInDate,
					checkOutDate,
				});
			});

			it('when an employee is removed the booking should be removed', async () => {
				deleteEmployee(EMPLOYEE_ID);
				expect(() =>
					BookingService.getBookingBy(booking.bookingId),
				).toThrowError();
			});
		});
	});
});
