import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudioService {

  constructor() {}

  private readonly earthRadiusKm = 6371;

  getCurrentLocation(): Observable< {lat: number; lon: number }> {
    return new Observable(observer => {
      navigator.geolocation.getCurrentPosition(
        position => observer.next({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }),
        error => observer.error(error)
      );
    });
  }

  getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRad = (angle: number) => angle * (Math.PI / 180);
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const haversineFormula  = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2))
                                      * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const centralAngle  = 2 * Math.atan2(Math.sqrt(haversineFormula ), Math.sqrt(1 - haversineFormula));

    return this.earthRadiusKm * centralAngle ;
  }

  filterStudios(studios: any[], userLat: number, userLon: number, radius: number) {
    return studios.filter(studio =>
      this.getDistance(userLat, userLon, studio.Location?.Coordinates?.Latitude ?? 0, studio.Location?.Coordinates?.Longitude ?? 0) <= radius);
  }
}
