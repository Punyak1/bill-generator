import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GstInvoiceService {
  private prefix = 'SSL/E'; // Change this as needed
  private currentNumber = 1018;    // You could load this from a backend in real-world apps

  constructor() {
    this.loadFromLocalStorage(); // Load existing number on startup
  }

  generateInvoiceNumber(): string {
    const paddedNumber = this.currentNumber.toString().padStart(6, '0');
    const invoiceNo = `${this.prefix}/${paddedNumber}`;

    this.currentNumber++;
    this.saveToLocalStorage();

    return invoiceNo;
  }

  private saveToLocalStorage() {
    localStorage.setItem('gstInvoiceNumber', this.currentNumber.toString());
  }

  private loadFromLocalStorage() {
    const saved = localStorage.getItem('gstInvoiceNumber');
    if (saved) {
      this.currentNumber = parseInt(saved, 10);
    }
  }

  resetInvoiceNumber(newStart: number = 1) {
    this.currentNumber = newStart;
    this.saveToLocalStorage();
  }
}