import {option, Option} from 'ts-option';
import {EmployeePolicy} from '../entities/EmployeePolicy';
import {EmployeePolicyRepository} from './EmployeePolicyRepository';

export class InMemoryEmployeePolicyRepository
	implements EmployeePolicyRepository {
	private store: Map<string, EmployeePolicy> = new Map();

	public getBy(employeeId: string): Option<EmployeePolicy> {
		const policy = this.store.get(employeeId);
		return option(policy);
	}

	public save(policy: EmployeePolicy): void {
		this.store.set(policy.employeeId, policy);
	}

	public deleteBy(employeeId: string): void {
		this.store.delete(employeeId);
	}
}
