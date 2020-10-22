import {Option} from 'ts-option';
import {BookingPolicy} from '../entities/BookingPolicy';

export interface BookingPolicyRepository {
	getBy(employeeId: string): Option<BookingPolicy>;
	save(policy: BookingPolicy): void;
	deleteBy(employeeId: string): void;
}
