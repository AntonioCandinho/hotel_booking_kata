import {option, Option} from 'ts-option';
import {BookingPolicy} from '../entities/BookingPolicy';
import {BookingPolicyRepository} from './BookingPolicyRepository';

export class InMemoryBookingPolicyRepository
	implements BookingPolicyRepository {
	private store: Map<string, BookingPolicy> = new Map();

	public getBy(employeeId: string): Option<BookingPolicy> {
		const policy = this.store.get(employeeId);
		return option(policy);
	}

	public save(policy: BookingPolicy): void {
		this.store.set(policy.resourceId, policy);
	}

	public deleteBy(employeeId: string): void {
		this.store.delete(employeeId);
	}
}
