import * as uuid from 'uuid';
import {Company} from './Company';

describe('Company', () => {
	it('should throw an error when adding the same employee twice', () => {
		const companyId = `company-id-${uuid.v4()}`;
		const employeeId = `employee-id-${uuid.v4()}`;
		const company = new Company(companyId);
		company.addEmployee(employeeId);
		expect(() => company.addEmployee(employeeId)).toThrowError(
			`An employee with the id ${employeeId} already exists`,
		);
	});
});
