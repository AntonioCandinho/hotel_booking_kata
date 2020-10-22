import {none} from 'ts-option';
import * as uuid from 'uuid';
import {BookingPolicy} from '../entities/BookingPolicy';
import {InMemoryBookingPolicyRepository} from './InMemoryBookingPolicyRepository';

describe('InMemoryBookingPolicyRepository', () => {
	const bookingPolicy = new BookingPolicy(uuid.v4(), [uuid.v4(), uuid.v4()]);
	const repository = new InMemoryBookingPolicyRepository();

	beforeAll(() => {
		repository.save(bookingPolicy);
	});

	const expectEmployeePolicy = (policy: BookingPolicy) =>
		expect(repository.getBy(policy.resourceId).get).toEqual(policy);

	it('should be able to get a policy', () => {
		expectEmployeePolicy(bookingPolicy);
	});

	describe('when a policy gets updated', () => {
		const updatedPolicy = new BookingPolicy(bookingPolicy.resourceId, [
			uuid.v4(),
		]);

		beforeAll(() => {
			repository.save(updatedPolicy);
		});

		it('should be able to get the updated policy', () => {
			expectEmployeePolicy(updatedPolicy);
		});
	});

	describe('when a policy is deleted', () => {
		beforeAll(() => {
			repository.deleteBy(bookingPolicy.resourceId);
		});

		it('should get none when trying to retrieve it', () => {
			expect(repository.getBy(bookingPolicy.resourceId)).toEqual(none);
		});
	});
});
