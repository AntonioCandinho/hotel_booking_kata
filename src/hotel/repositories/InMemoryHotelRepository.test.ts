import * as uuid from 'uuid';
import {Hotel} from '../entities/Hotel';
import {InMemoryHotelRepository} from './InMemoryHotelRepository';

describe.only('InMemoryHotelRepository', () => {
	const HOTEL = new Hotel(`hotel-id-${uuid.v4()}`, `hotel-name-${uuid.v4()}`);

	let inMemoryRepository: InMemoryHotelRepository;

	beforeAll(() => {
		inMemoryRepository = new InMemoryHotelRepository();
	});

	it('should throw an error when trying to find unexistent hotel', () => {
		expect(() => inMemoryRepository.findBy(HOTEL.getId())).toThrowError(
			`No hotel exists with the following id ${HOTEL.getId()}`,
		);
	});

	it('should throw an error when trying to delete unexistent hotel', () => {
		expect(() => inMemoryRepository.findBy(HOTEL.getId())).toThrowError(
			`No hotel exists with the following id ${HOTEL.getId()}`,
		);
	});

	describe('given a created hotel', () => {
		beforeEach(() => {
			inMemoryRepository.create(HOTEL);
		});

		afterEach(() => {
			inMemoryRepository.deleteBy(HOTEL.getId());
		});

		it('should not allow two hotels with the same id', () => {
			expect(() => inMemoryRepository.create(HOTEL)).toThrowError(
				`An hotel with the following id ${HOTEL.getId()} already exists`,
			);
		});

		it('should be able to find it by id', () => {
			const receivedHotel = inMemoryRepository.findBy(HOTEL.getId());
			expect(receivedHotel).toEqual(HOTEL);
		});
	});
});
