export class BookingPolicy {
	public constructor(
		public readonly resourceId: string,
		private readonly roomTypes: string[],
	) {}

	public isBookingAllowed(roomType: string): boolean {
		return this.roomTypes.includes(roomType);
	}
}
