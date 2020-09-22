export class Company {
	public constructor(
		private readonly id: string,
		private readonly employees: Set<string> = new Set(),
	) {}

	public getId(): string {
		return this.id;
	}

	public addEmployee(employeeId: string) {
		if (this.employees.has(employeeId)) {
			throw Error(`An employee with the id ${employeeId} already exists`);
		}
		this.employees.add(employeeId);
	}

	public removeEmployee(employeeId: string) {
		this.employees.delete(employeeId);
	}

	public getEmployees(): string[] {
		return [...this.employees];
	}

	public clone(): Company {
		return new Company(this.id, new Set(this.employees.values()));
	}
}
