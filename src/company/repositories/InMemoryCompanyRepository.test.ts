import * as uuid from 'uuid';
import {Company} from '../entities/Company';
import {InMemoryCompanyRepository} from './InMemoryCompanyRepository';

describe('InMemoryCompanyRepository', () => {
	let inMemoryRepository: InMemoryCompanyRepository;

	const COMPANY_ID = `company-id-${uuid.v4()}`;

	beforeEach(() => {
		inMemoryRepository = new InMemoryCompanyRepository();
	});

	describe('given a company', () => {
		const EMPLOYEE_ID = `employee-1-${uuid.v4()}`;

		let company: Company;

		beforeEach(() => {
			company = inMemoryRepository.findOneOrCreateBy(COMPANY_ID);
			company.addEmployee(EMPLOYEE_ID);
			inMemoryRepository.save(company);
		});

		afterEach(() => {
			inMemoryRepository.deleteCompanyBy(company.getId());
		});

		it('should recover it using the id of one of the employees', () => {
			const receivedCompany = inMemoryRepository.findEmployeeCompanyBy(
				EMPLOYEE_ID,
			);
			expect(receivedCompany).toEqual(company);
		});

		describe('given an employee is removed from the company', () => {
			beforeEach(() => {
				company.removeEmployee(EMPLOYEE_ID);
				inMemoryRepository.save(company);
			});

			it('trying to retrieve the employee company should throw an error', () => {
				expect(() =>
					inMemoryRepository.findEmployeeCompanyBy(EMPLOYEE_ID),
				).toThrow(`No company with employee ${EMPLOYEE_ID}`);
			});
		});

		describe('when trying to add the same employee to another company', () => {
			let otherCompany: Company;

			beforeEach(() => {
				otherCompany = inMemoryRepository.findOneOrCreateBy(
					`other-company-${uuid.v4()}`,
				);
				otherCompany.addEmployee(EMPLOYEE_ID);
			});

			afterEach(() => {
				inMemoryRepository.deleteCompanyBy(otherCompany.getId());
			});

			it('should throw an error', () => {
				expect(() => inMemoryRepository.save(otherCompany)).toThrowError(
					`Employee ${EMPLOYEE_ID} already registered in company ${COMPANY_ID}`,
				);
			});
		});
	});
});
