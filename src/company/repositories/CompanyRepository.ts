import {Company} from '../entities/Company';

export interface CompanyRepository {
	save(company: Company): void;
	findEmployeeCompanyBy(employeeId: string): Company;
	findOneOrCreateBy(companyId: string): Company;
}
