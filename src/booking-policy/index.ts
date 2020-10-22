import {BookingPolicy} from './entities/BookingPolicy';
import {CompanyByEmployeeGetter} from './gateways/CompanyByEmployeeGetter';
import {BookingPolicyRepository} from './repositories/BookingPolicyRepository';

export class BookingPolicyService {
	public constructor(
		private readonly employeePolicyRepo: BookingPolicyRepository,
		private readonly companyPolicyRepo: BookingPolicyRepository,
		private readonly companyGateway: CompanyByEmployeeGetter,
	) {}

	public setCompanyPolicy(companyId: string, roomTypes: string[]): void {
		const policy = new BookingPolicy(companyId, roomTypes);
		this.companyPolicyRepo.save(policy);
	}

	public setEmployeePolicy(employeeId: string, roomTypes: string[]): void {
		const policy = new BookingPolicy(employeeId, roomTypes);
		this.employeePolicyRepo.save(policy);
	}

	public deleteEmployeePoliciesBy(employeeId: string): void {
		this.employeePolicyRepo.deleteBy(employeeId);
	}

	public deleteCompanyPoliciesBy(companyId: string): void {
		this.companyPolicyRepo.deleteBy(companyId);
	}

	public isBookingAllowed(employeeId: string, roomType: string): boolean {
		const employeePolicy = this.employeePolicyRepo.getBy(employeeId);
		if (employeePolicy.isDefined) {
			return employeePolicy.get.isBookingAllowed(roomType);
		}

		const companyId = this.companyGateway.getCompanyIdBy(employeeId);
		if (companyId.isEmpty) {
			return true;
		}

		const companyPolicy = this.companyPolicyRepo.getBy(companyId.get);
		if (companyPolicy.isDefined) {
			return companyPolicy.get.isBookingAllowed(roomType);
		}

		return true;
	}
}
