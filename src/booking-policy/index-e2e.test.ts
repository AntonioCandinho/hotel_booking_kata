import * as uuid from 'uuid';
import {Services} from '../index';

const {BookingPolicyService, CompanyService} = Services;

describe('Booking Policy Acceptation', () => {
	const COMPANY_ID = `company-id-${uuid.v4()}`;
	const EMPLOYEE_ID = `employee-id-${uuid.v4()}`;
	const ROOM_TYPE = `room-type-${uuid.v4()}`;

	beforeAll(() => {
		CompanyService.addEmployee(COMPANY_ID, EMPLOYEE_ID);
	});

	afterAll(() => {
		CompanyService.deleteEmployee(EMPLOYEE_ID);
	});

	const expectBooking = (allowed: boolean) => (roomType: string) =>
		expect(
			BookingPolicyService.isBookingAllowed(EMPLOYEE_ID, roomType),
		).toEqual(allowed);

	const expectBookingAllowed = expectBooking(true);

	const expectBookingNotAllowed = expectBooking(false);

	it('without policies booking should be allowed', () => {
		expectBookingAllowed(ROOM_TYPE);
	});

	describe('given a new company policy is created', () => {
		const OTHER_ROOM_TYPE = `other-room-type-${uuid.v4()}`;

		beforeEach(() => {
			BookingPolicyService.setCompanyPolicy(COMPANY_ID, [ROOM_TYPE]);
		});

		afterAll(() => {
			BookingPolicyService.deleteCompanyPoliciesBy(EMPLOYEE_ID);
		});

		it('employee should only be able to book room types for that policy', () => {
			expectBookingNotAllowed(OTHER_ROOM_TYPE);
			expectBookingAllowed(ROOM_TYPE);
		});

		describe('given a employee policy exists for the employee', () => {
			beforeEach(() => {
				BookingPolicyService.setEmployeePolicy(EMPLOYEE_ID, [OTHER_ROOM_TYPE]);
			});

			afterAll(() => {
				BookingPolicyService.deleteEmployeePoliciesBy(EMPLOYEE_ID);
			});

			it('employee policy should take precedence', () => {
				expectBookingNotAllowed(ROOM_TYPE);
				expectBookingAllowed(OTHER_ROOM_TYPE);
			});
		});
	});

	describe('given a new employee policy is created', () => {
		const OTHER_ROOM_TYPE = `other-room-type-${uuid.v4()}`;

		beforeEach(() => {
			BookingPolicyService.setEmployeePolicy(EMPLOYEE_ID, [ROOM_TYPE]);
		});

		afterAll(() => {
			BookingPolicyService.deleteEmployeePoliciesBy(EMPLOYEE_ID);
		});

		it('employee should only be able to book room types for that policy', () => {
			expectBookingNotAllowed(OTHER_ROOM_TYPE);
			expectBookingAllowed(ROOM_TYPE);
		});
	});
});
