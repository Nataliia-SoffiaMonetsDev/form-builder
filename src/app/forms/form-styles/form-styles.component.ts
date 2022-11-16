import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-styles',
  templateUrl: './form-styles.component.html',
  styleUrls: ['./form-styles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormStylesComponent implements OnInit {
  formLabel = new FormControl(null, Validators.required);
  textColor = new FormControl(null, Validators.required);
  background = new FormControl(null, Validators.required);
  borderType = new FormControl(null, Validators.required);
  borderColor = new FormControl(null, Validators.required);

  @Output() onApply = new EventEmitter();
  form!: FormGroup;

  get f() { return this.form.controls; }
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      formLabel: this.formLabel,
      textColor: this.textColor,
      background: this.background,
      borderType: this.borderType,
      borderColor: this.borderColor
    });
  }

  apply() {
    if (this.form.valid) {
      this.onApply.emit(this.form.getRawValue());
    }
  }
}
