import {Option} from 'ts-option';
import {EmployeePolicy} from '../entities/EmployeePolicy';

export interface EmployeePolicyRepository {
	getBy(employeeId: string): Option<EmployeePolicy>;
	save(policy: EmployeePolicy): void;
	deleteBy(employeeId: string): void;
}
