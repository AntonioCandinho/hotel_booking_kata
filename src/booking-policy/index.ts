import {BookingAllowedService} from './domain-services/BookingAllowedService';
import {EmployeePolicy} from './entities/EmployeePolicy';
import {EmployeePolicyRepository} from './repositories/EmployeePolicyRepository';

export class BookingPolicyService {
	public constructor(
		private readonly employeePolicyRepo: EmployeePolicyRepository,
	) {}

	public setCompanyPolicy(companyId: string, roomTypes: string[]): void {
		throw Error('Not implemented');
	}

	public setEmployeePolicy(employeeId: string, roomTypes: string[]): void {
		const policy = new EmployeePolicy(employeeId, roomTypes);
		this.employeePolicyRepo.save(policy);
	}

	public deleteEmployeePoliciesBy(employeeId: string): void {
		this.employeePolicyRepo.deleteBy(employeeId);
	}

	public isBookingAllowed(employeeId: string, roomType: string): boolean {
		const bookingAllowedService = new BookingAllowedService(roomType);
		const policy = this.employeePolicyRepo.getBy(employeeId);
		return bookingAllowedService.isBookingAllowed(policy);
	}
}
