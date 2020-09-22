import * as uuid from 'uuid';
import {Services} from '../index';

const {CompanyService} = Services;

describe('Company Acceptation', () => {
	const COMPANY_ID = `company-id-${uuid.v4()}`;
	const EMPLOYEE_ID = `employee-id-${uuid.v4()}`;

	describe('given an employee is added to the system', () => {
		beforeEach(() => {
			CompanyService.addEmployee(COMPANY_ID, EMPLOYEE_ID);
		});

		afterEach(() => {
			CompanyService.deleteEmployee(EMPLOYEE_ID);
		});

		it('should not be able to add an employee with the same id', () => {
			expect(() =>
				CompanyService.addEmployee(COMPANY_ID, EMPLOYEE_ID),
			).toThrowError(`An employee with the id ${EMPLOYEE_ID} already exists`);
		});

		describe('given the employee is deleted', () => {
			beforeEach(async () => {
				CompanyService.deleteEmployee(EMPLOYEE_ID);
			});

			it('should be possible to add that employee again', () => {
				CompanyService.addEmployee(COMPANY_ID, EMPLOYEE_ID);
			});
		});
	});
});
