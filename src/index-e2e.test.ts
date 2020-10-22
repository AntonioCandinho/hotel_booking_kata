import * as uuid from 'uuid';
import {Services} from './index';

const {
	HotelService,
	BookingService,
	BookingPolicyService,
	CompanyService,
} = Services;

describe('Hotel Booking Acceptation Tests', () => {
	describe('given a hotel with an employee', () => {
		let HOTEL_ID = `hotel-id-${uuid.v4()}`;
		let COMPANY_ID = `company-id-${uuid.v4()}`;

		let HOTEL_NAME = `hotel-name-${uuid.v4()}`;
		let EMPLOYEE_ID = `employee-id-${uuid.v4()}`;

		beforeEach(() => {
			HotelService.addHotel(HOTEL_ID, HOTEL_NAME);
			CompanyService.addEmployee(COMPANY_ID, EMPLOYEE_ID);
		});

		afterEach(() => {
			HotelService.deleteBy(HOTEL_ID);
		});

		describe('given some rooms', () => {
			let ROOM_NUBMER = `room-number-${uuid.v4()}`;
			let ROOM_TYPE = `some-room-type`;

			beforeEach(() => {
				HotelService.setRoom(HOTEL_ID, ROOM_NUBMER, ROOM_TYPE);
				BookingPolicyService.setEmployeePolicy(EMPLOYEE_ID, [ROOM_TYPE]);
			});

			afterEach(() => {
				BookingPolicyService.deleteEmployeePoliciesBy(EMPLOYEE_ID);
			});

			it('an employee should be able to book a room', () => {
				const checkInDate = new Date();
				const checkOutDate = new Date(checkInDate.getTime());
				checkOutDate.setDate(checkOutDate.getDate() + 1);
				const booking = BookingService.book(
					EMPLOYEE_ID,
					HOTEL_ID,
					ROOM_TYPE,
					checkInDate,
					checkOutDate,
				);
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
		});
	});
});
