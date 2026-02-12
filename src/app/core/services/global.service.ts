import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalService {

    constructor() {}

    getCurrentUserData() {
        let currentUserData = localStorage.getItem('currentUserData');
        if (currentUserData) {
            return JSON.parse(currentUserData);
        }
        return null
    }
}
