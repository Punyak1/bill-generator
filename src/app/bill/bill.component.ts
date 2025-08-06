import { CommonModule } from '@angular/common';
import { Component, ElementRef, importProvidersFrom, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GstInvoiceService } from '../services/gst-invoice.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css',
  imports: [CommonModule,FormsModule]
})

export class BillComponent {
  @ViewChild('billContent') billContent!: ElementRef;

  constructor(private gstInvoiceNo : GstInvoiceService ){}

  formSubmitted = false;

  guestName = '';
  guestEmail = '';
  guestMobile = '';
  checkInDate = '';
  checkInTime = '';
  checkOutDate = '';
  checkOutTime = '';
  roomType = '';
  mealPlan = '';
  invoiceDate = '';
  invoiceNumber = '';
  bookingId = '';
  cgst = 0;
  sgst = 0;
  total = 0;
  taxable = 1800;
  numberOfRooms = 1;
  numberOfNights = 1;
  numberOfAdults = 2;
  numberOfChildren = 0;
  roomNumber = '';
  source = 'Direct - Walk-In';

  generateBookingId(): string {
    const today = new Date();
    const datePart = `${today.getFullYear()}${(today.getMonth()+1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;
    
    const stored = localStorage.getItem('bookingCounter');
    let counter = stored ? parseInt(stored,10) + 1 : 1032;
    localStorage.setItem('bookingCounter', counter.toString());

    return `SSL/${datePart}/${counter.toString().padStart(6, '0')}`;
  }

  calculateGST() {
    const rate = 0.06; // 6% CGST + 6% SGST
    this.taxable= Number(this.taxable) || 0;
    this.cgst = +(this.taxable * rate).toFixed(2);
    this.sgst = +(this.taxable * rate).toFixed(2);
    this.total = +(this.taxable + this.cgst + this.sgst).toFixed(2);
  }

  onSubmit(form: NgForm) {

    if (!form.valid) {
    // Mark all fields as touched
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return; // Don't proceed if form is invalid
    }

    this.bookingId = this.generateBookingId();
    this.invoiceNumber = this.gstInvoiceNo.generateInvoiceNumber();
    this.calculateGST();
    if (form.valid) {
      this.formSubmitted = true;
    }
  }

  async generatePDF() {
    const html2pdfModule = await import('html2pdf.js');
    const html2pdf = (html2pdfModule as any).default;

    const options = {
      filename: "Invoice_" + this.invoiceDate + "_" + this.guestName+".pdf",
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(this.billContent.nativeElement).save();
    this.formSubmitted=false;
  }
}
