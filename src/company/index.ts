import {Company} from './entities/Company';
import {CompanyRepository} from './repositories/CompanyRepository';

export class CompanyService {
	public constructor(private readonly companyRepository: CompanyRepository) {}

	public addEmployee(companyId: string, employeeId: string): void {
		const company = this.companyRepository.findOneOrCreateBy(companyId);
		company.addEmployee(employeeId);
		this.companyRepository.save(company);
	}

	public deleteEmployee(employeeId: string): void {
		const company = this.companyRepository.findEmployeeCompanyBy(employeeId);
		company.removeEmployee(employeeId);
		this.companyRepository.save(company);
	}

	public getCompanyBy(employeeId: string): Company {
		return this.companyRepository.findEmployeeCompanyBy(employeeId);
	}
}
