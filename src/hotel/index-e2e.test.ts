import * as uuid from 'uuid';
import {Services} from '../index';

const {HotelService} = Services;

describe('HotelService Acceptation', () => {
	const HOTEL_ID = `hotel-id-${uuid.v4()}`;
	const HOTEL_NAME = `hotel-name-${uuid.v4()}`;

	describe('given and hotel', () => {
		beforeEach(() => {
			HotelService.addHotel(HOTEL_ID, HOTEL_NAME);
		});

		afterEach(() => {
			HotelService.deleteBy(HOTEL_ID);
		});

		it('should be able to retrieve it', () => {
			const hotel = HotelService.findHotelBy(HOTEL_ID);
			expect(hotel).toEqual({
				id: HOTEL_ID,
				name: HOTEL_NAME,
				rooms: [],
			});
		});

		describe('given the hotel gets some rooms', () => {
			const HOTEL_ROOMS = [
				{number: `room-num-${uuid.v4()}`, type: `type-${uuid.v4()}`},
				{number: `room-num-${uuid.v4()}`, type: `type-${uuid.v4()}`},
			];

			beforeEach(() => {
				for (const room of HOTEL_ROOMS) {
					HotelService.setRoom(HOTEL_ID, room.number, room.type);
				}
			});

			it('should add the rooms to the hotel', () => {
				const hotel = HotelService.findHotelBy(HOTEL_ID);
				expect(hotel).toEqual({
					id: HOTEL_ID,
					name: HOTEL_NAME,
					rooms: HOTEL_ROOMS,
				});
			});
		});
	});
});
