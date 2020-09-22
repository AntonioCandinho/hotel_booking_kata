import {BookingPolicyService} from './booking-policy/resources/BookingPolicyService';
import {BookingService} from './booking/resources/BookingService';
import {CompanyService} from './company/resources/CompanyService';
import {InMemoryHotelRepository} from './hotel/repositories/InMemoryHotelRepository';
import {HotelService} from './hotel';

const hotelRepository = new InMemoryHotelRepository();

export const Services = {
	HotelService: new HotelService(hotelRepository),
	CompanyService: new CompanyService(),
	BookingPolicyService: new BookingPolicyService(),
	BookingService: new BookingService(),
};
