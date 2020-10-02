import {none} from 'ts-option';
import * as uuid from 'uuid';
import {EmployeePolicy} from '../entities/EmployeePolicy';
import {InMemoryEmployeePolicyRepository} from './InMemoryEmployeePolicyRepository';

describe('InMemoryEmployeePolicyRepository', () => {
	const employeePolicy = new EmployeePolicy(uuid.v4(), [uuid.v4(), uuid.v4()]);
	const repository = new InMemoryEmployeePolicyRepository();

	beforeAll(() => {
		repository.save(employeePolicy);
	});

	const expectEmployeePolicy = (policy: EmployeePolicy) =>
		expect(repository.getBy(policy.employeeId).get).toEqual(policy);

	it('should be able to get a policy', () => {
		expectEmployeePolicy(employeePolicy);
	});

	describe('when a policy gets updated', () => {
		const updatedPolicy = new EmployeePolicy(employeePolicy.employeeId, [
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
			repository.deleteBy(employeePolicy.employeeId);
		});

		it('should get none when trying to retrieve it', () => {
			expect(repository.getBy(employeePolicy.employeeId)).toEqual(none);
		});
	});
});
