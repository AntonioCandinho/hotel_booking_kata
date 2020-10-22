export interface AvailableHotelRoomsRetriever {
	getAvailableRoomsBy(hotelId: string, roomType: string): string[];
}
