import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  createCar(brand: string, model: string, power: number, seats: any, imgUrl: string) {
    const carData = { brand: brand, model: model, power: power, seats: seats, imgUrl: imgUrl };
   return this.http.post('http://localhost:3000/api/admin/create-car', carData);
  }
  
  getUsers() {
    return this.http.get('http://localhost:3000/api/admin/users');
  }

  deleteUser(email: string) {
    const data = { email: email };
    return this.http.post('http://localhost:3000/api/admin/delete-user', data);
  }
  //copilot tavsiyesi tamamen
  // üstteki yorumun sonu da tavsiye
  makeAdmin(email: string) {
    const data = { email: email };
    return this.http.post('http://localhost:3000/api/admin/admin-user', data);
  }

  rentedCars() {
    return this.http.get('http://localhost:3000/api/admin/rented-cars');
  } 

  cancelRent(id: any, from: any, until: any) {
    const data = { id: id, from: from, until: until };
    return this.http.post('http://localhost:3000/api/admin/cancel-rent', data);
  }
}
