import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '../../invoice.model';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.css']
})
export class InvoiceItemComponent implements OnInit {
  @Input() invoice: Invoice;
  @Input() index: number;

  constructor( ) { }

  ngOnInit(): void {
  }




}
