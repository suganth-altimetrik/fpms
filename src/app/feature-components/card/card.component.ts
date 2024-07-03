import { Component, Input } from '@angular/core';
import { Invest } from '../../models/invest.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input('value') input: Invest;
  @Input('icon') icon: String;
}
