import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private baseUrl: string;
  private secretKey: string;

  constructor(private http: HttpClient) {
    this.baseUrl = AppSettings.base_url + '/api/sysadministration';
    this.secretKey = AppSettings.SecureKey;
  }

  /**
   * Encrypt data (supports strings and arrays)
   * @param data Data to encrypt
   * @returns Encrypted base64 string
   */
  OnEncryptData(data: string | any[] | object) {
    
  }

  /**
   * Decrypt data (returns original type)
   * @param encryptStr Encrypted base64 string
   * @returns Decrypted data (string, array, or object)
   */
  OnDecryptData(encryptStr: string){
    
  }
}