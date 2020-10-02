import {Option} from 'ts-option';
import {EmployeePolicy} from '../entities/EmployeePolicy';

export class BookingAllowedService {
	public constructor(private readonly roomType: string) {}

	public isBookingAllowed(employeePolicy: Option<EmployeePolicy>) {
		if (employeePolicy.isEmpty) {
			return true;
		}
		return employeePolicy.get.isBookingAllowed(this.roomType);
	}
}
