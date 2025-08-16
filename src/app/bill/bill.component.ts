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

  event='';
  invoiceDate = '';
  bookingDate = '';
  invoiceNumber = '';
  
  cgst = 0.00;
  sgst = 0.00;
  total = 0.00;
  taxable = 0.00;
  dueAmt = 0.00;
  received = 0.00;

  calculateGST() {
    const rate = 1.18; // 9% CGST + 9% SGST
    this.total = (Number(this.total) || 0);
    const val = this.total/rate;
    this.cgst = parseFloat(((this.total-val)/2).toFixed(2));
    this.sgst = this.cgst;
    this.total = parseFloat(this.total.toFixed(2));
    this.taxable = parseFloat((this.total-this.cgst-this.sgst).toFixed(2));
    this.dueAmt = this.total - this.received;
  }

  onSubmit(form: NgForm) {

    if (!form.valid) {
    // Mark all fields as touched
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return; // Don't proceed if form is invalid
    }

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
