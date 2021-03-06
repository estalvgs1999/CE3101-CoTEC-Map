import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from '../Interfaces/Country';
import { Measures } from '../Interfaces/Measures';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  countries: Country[] = [];

  constructor(private httpClient: HttpClient) { }

  // Get country information
  getContriesData() {
    return this.httpClient.get<Country[]>('https://localhost:5001/api/v1/cases/country/all');
  }

  // Get world Information
  getWorldInformation() {
    return this.httpClient.get<Country>('https://localhost:5001/api/v1/cases/world');
  }

  // Get Measures Information
  getMeasuresData(code: string) {
    return this.httpClient.get<Measures[]>('https://localhost:5001/api/v1/measures/sanitary?CountryCode=' + code);
  }
}

