import {BookingPolicyChecker} from './BookingPolicyChecker';

export interface BookingAllowedChecker {
	isBookingAllowed(employeeId: string, roomType: string): boolean;
}

export class BookingPolicyGateway implements BookingPolicyChecker {
	public constructor(private readonly bookingChecker: BookingAllowedChecker) {}

	assertBookingAllowed(employeeId: string, roomType: string) {
		if (!this.bookingChecker.isBookingAllowed(employeeId, roomType)) {
			const msg = `Employee with id "${employeeId}" not allowed to book "${roomType}" room`;
			throw Error(msg);
		}
	}
}
