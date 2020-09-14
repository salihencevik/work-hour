


import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class PersonelClaimService {
  claims: any[];

  constructor() { }

  setClaims(claimList: any[]) {
    this.claims = claimList;
  }

  checkClaim(claimText: string): boolean {
    if (claimText == '' || claimText == null) {
      return true;
    }
    if (this.claims == null || this.claims == undefined) {
      return false;
    }
    return this.claims.indexOf(claimText) != -1;
  }
}
