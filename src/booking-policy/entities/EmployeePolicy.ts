export class EmployeePolicy {
	public constructor(
		public readonly employeeId: string,
		private readonly roomTypes: string[],
	) {}

	public isBookingAllowed(roomType: string): boolean {
		return this.roomTypes.includes(roomType);
	}
}
