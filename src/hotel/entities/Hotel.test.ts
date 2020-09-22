import * as uuid from 'uuid';
import {Hotel} from './Hotel';

describe('Hotel', () => {
	it('should replace the room if already exists', () => {
		const room = {number: `number-${uuid.v4()}`, type: `type-${uuid.v4()}`};
		const hotel = new Hotel(`id-${uuid.v4()}`, `name-${uuid.v4()}`);
		hotel.addRoom(room);

		const otherRoom = {number: room.number, type: `other-type-${uuid.v4()}`};
		hotel.addRoom(otherRoom);

		expect(hotel.getRooms()).toEqual([otherRoom]);
	});
});
