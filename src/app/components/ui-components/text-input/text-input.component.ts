import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class TextInputComponent {
  @Input() props: {
    label: string;
    name: string;
    value: string;
    required: boolean;
    type: string;
  };
}
