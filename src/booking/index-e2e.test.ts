import * as uuid from 'uuid';
import {Services} from '../index';

const {
	HotelService,
	CompanyService,
	BookingPolicyService,
	BookingService,
} = Services;

export interface BookCommand {
	employeeId: string;
	hotelId: string;
	roomType: string;
	checkInDate: Date;
	checkOutDate: Date;
}

describe('Booking Acceptation', () => {
	let HOTEL_ID = `hotel-id-${uuid.v4()}`;
	let COMPANY_ID = `company-id-${uuid.v4()}`;
	let ROOM_NUBMER = `room-number-${uuid.v4()}`;
	let ROOM_TYPE = `some-room-type-${uuid.v4()}`;
	let NOT_ALLOWED_ROOM_TYPE = `other-room-type-${uuid.v4()}`;
	let HOTEL_NAME = `hotel-name-${uuid.v4()}`;
	let EMPLOYEE_ID = `employee-id-${uuid.v4()}`;

	const book = (extra: Partial<BookCommand> = {}) => {
		const checkInDate = new Date();
		const checkOutDate = new Date(checkInDate.getTime());
		checkOutDate.setDate(checkOutDate.getDate() + 2);
		return BookingService.book(
			extra.employeeId ?? EMPLOYEE_ID,
			extra.hotelId ?? HOTEL_ID,
			extra.roomType ?? ROOM_TYPE,
			extra.checkInDate ?? checkInDate,
			extra.checkOutDate ?? checkOutDate,
		);
	};

	beforeEach(() => {
		HotelService.addHotel(HOTEL_ID, HOTEL_NAME);
		HotelService.setRoom(HOTEL_ID, ROOM_NUBMER, ROOM_TYPE);
		HotelService.setRoom(HOTEL_ID, ROOM_NUBMER, NOT_ALLOWED_ROOM_TYPE);

		CompanyService.addEmployee(COMPANY_ID, EMPLOYEE_ID);
		BookingPolicyService.setEmployeePolicy(EMPLOYEE_ID, [ROOM_TYPE]);
	});

	afterEach(() => {
		BookingPolicyService.deleteEmployeePoliciesBy(EMPLOYEE_ID);
		CompanyService.deleteEmployee(EMPLOYEE_ID);
		HotelService.deleteBy(HOTEL_ID);
	});

	it('should throw and error when checkout is less than a day after checkin', () => {
		expect(() =>
			book({checkInDate: new Date(), checkOutDate: new Date()}),
		).toThrow(`CheckOut date must be at least one day after checkIn date`);
	});

	it('should throw and error when hotel does not exist', () => {
		const randomHotelId = uuid.v4();
		expect(() => book({hotelId: randomHotelId})).toThrow(
			`Hotel with id "${randomHotelId}" does not exist`,
		);
	});

	it('should throw and error when hotel does not have any room with that type', () => {
		const randomRoomType = uuid.v4();
		expect(() => book({roomType: randomRoomType})).toThrow(
			`Hotel with id "${HOTEL_ID}" does not have any "${randomRoomType}" room`,
		);
	});

	it('should throw and error when booking policy does not allow booking', () => {
		expect(() => book({roomType: NOT_ALLOWED_ROOM_TYPE})).toThrow(
			`Employee with id "${EMPLOYEE_ID}" not allowed to book "${NOT_ALLOWED_ROOM_TYPE}" room`,
		);
	});
});
