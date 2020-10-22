import {BookingService} from './booking';
import {BookingPolicyService} from './booking-policy';
import {InMemoryBookingPolicyRepository} from './booking-policy/repositories/InMemoryBookingPolicyRepository';
import {CompanyServiceGateway} from './booking-policy/gateways/CompanyServiceGateway';
import {BookingPolicyGateway} from './booking/gateways/BookingPolicyGateway';
import {HotelServiceGateway} from './booking/gateways/HotelServiceGateway';
import {InMemoryBookingsRepository} from './booking/repositories/InMemoryBookingsRepository';
import {CompanyService} from './company';
import {InMemoryCompanyRepository} from './company/repositories/InMemoryCompanyRepository';
import {HotelService} from './hotel';
import {InMemoryHotelRepository} from './hotel/repositories/InMemoryHotelRepository';

const hotelRepository = new InMemoryHotelRepository();
const hotelService = new HotelService(hotelRepository);

const companyRepository = new InMemoryCompanyRepository();
const companyService = new CompanyService(companyRepository);

const policyEmployeeRepository = new InMemoryBookingPolicyRepository();
const policyCompanyRepository = new InMemoryBookingPolicyRepository();
const companyGateway = new CompanyServiceGateway(companyService);
const bookingPolicyService = new BookingPolicyService(
	policyEmployeeRepository,
	policyCompanyRepository,
	companyGateway,
);

const hotelGateway = new HotelServiceGateway(hotelService);
const policyGateway = new BookingPolicyGateway(bookingPolicyService);
const bookingsRepo = new InMemoryBookingsRepository();
const bookingService = new BookingService(
	hotelGateway,
	policyGateway,
	bookingsRepo,
);

export const Services = {
	HotelService: hotelService,
	CompanyService: companyService,
	BookingPolicyService: bookingPolicyService,
	BookingService: bookingService,
};
