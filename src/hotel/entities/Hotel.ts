export interface HotelRoom {
	number: string;
	type: string;
}

export interface SerializedHotel {
	id: string;
	name: string;
	rooms: HotelRoom[];
}

export class Hotel {
	private rooms: HotelRoom[] = [];

	public constructor(
		private readonly id: string,
		private readonly name: string,
	) {}

	public getId(): string {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public getRooms(): HotelRoom[] {
		return this.rooms;
	}

	public addRoom(room: HotelRoom): void {
		this.rooms = [...this.rooms.filter((r) => r.number !== room.number), room];
	}

	public serialize(): SerializedHotel {
		return {
			id: this.id,
			name: this.name,
			rooms: this.rooms,
		};
	}
}
