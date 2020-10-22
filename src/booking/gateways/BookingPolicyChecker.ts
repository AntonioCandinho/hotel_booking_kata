export interface BookingPolicyChecker {
	assertBookingAllowed(employeeId: string, roomType: string): void;
}
