import {Observable, Subject, Subscription} from 'rxjs';

export interface EmployeeDeletedEventSource {
	getEmployeeDeletedEvents(): Observable<string>;
}

export interface EmployeePolicyDeleter {
	deleteEmployeePoliciesBy(employeeId: string): void;
}

export interface BookingByEmployeeDeleter {
	deleteEmployeeBookignsBy(employeeId: string): void;
}

export class EmployeeWatchdog {
	private processedEvents = new Subject<string>();
	private subscription?: Subscription;

	public constructor(
		private readonly employeeDeletedEvents: EmployeeDeletedEventSource,
		private readonly policyDeleter: EmployeePolicyDeleter,
		private readonly bookingPolicyDeleter: BookingByEmployeeDeleter,
	) {}

	public start() {
		this.stop();
		this.subscription = this.employeeDeletedEvents
			.getEmployeeDeletedEvents()
			.subscribe((employeeId) => {
				this.policyDeleter.deleteEmployeePoliciesBy(employeeId);
				this.bookingPolicyDeleter.deleteEmployeeBookignsBy(employeeId);
				this.processedEvents.next(employeeId);
			});
	}

	public getProcessedEvents(): Observable<string> {
		return this.processedEvents.asObservable();
	}

	public stop() {
		this.subscription?.unsubscribe();
		this.subscription = null;
	}
}
