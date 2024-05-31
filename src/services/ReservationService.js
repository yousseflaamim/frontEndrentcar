import axios from 'axios';

const BASE_URL = 'http://localhost:8081/reservations';

export default {
  makeReservation(reservation) {
    return axios.post(`${BASE_URL}/makeReservation`, reservation);
  },
  cancelReservation(reservationId, renter) {
    return axios.delete(`${BASE_URL}/${reservationId}`, { data: renter });
  },
  updateReservation(reservationId, updatedReservation, renter) {
    return axios.put(`${BASE_URL}/${reservationId}`, updatedReservation, { data: renter });
  }
};
