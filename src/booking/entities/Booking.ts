const isLessThanOneDayDifference = (d1: Date, d2: Date) =>
	d2.valueOf() - d1.valueOf() < 24 * 60 * 60 * 1e3;

export interface BookingDTO {
	bookingId: string;
	employeeId: string;
	hotelId: string;
	roomType: string;
	checkInDate: Date;
	checkOutDate: Date;
	roomNumber: string;
}

export class Booking {
	public constructor(
		public readonly bookingId: string,
		public readonly employeeId: string,
		public readonly hotelId: string,
		public readonly roomType: string,
		public readonly checkInDate: Date,
		public readonly checkOutDate: Date,
		private _roomNumber?: string,
	) {}

	public static create(
		bookingId: string,
		employeeId: string,
		hotelId: string,
		roomType: string,
		checkInDate: Date,
		checkOutDate: Date,
	) {
		if (isLessThanOneDayDifference(checkInDate, checkOutDate)) {
			throw Error(`CheckOut date must be at least one day after checkIn date`);
		}
		return new Booking(
			bookingId,
			employeeId,
			hotelId,
			roomType,
			checkInDate,
			checkOutDate,
		);
	}

	public asDTO(): BookingDTO {
		return {
			bookingId: this.bookingId,
			employeeId: this.employeeId,
			hotelId: this.hotelId,
			roomType: this.roomType,
			checkInDate: this.checkInDate,
			checkOutDate: this.checkOutDate,
			roomNumber: this.roomNumber,
		};
	}

	public get roomNumber(): string {
		if (!this._roomNumber) {
			throw Error('No room number defined');
		}
		return this._roomNumber;
	}

	public assignOneRoom(
		hotelRooms: string[],
		concurrentBookigns: Booking[],
	): void {
		const bookedRooms = concurrentBookigns
			.filter((b) => b.roomType === this.roomType)
			.map((b) => b._roomNumber);
		const availableRooms = hotelRooms.filter((r) => !bookedRooms.includes(r));
		if (availableRooms.length === 0) {
			throw Error(`No rooms currently available for hotel: ${this.hotelId}`);
		}
		const [firstAvailableRoom] = availableRooms;
		this._roomNumber = firstAvailableRoom;
	}
}
