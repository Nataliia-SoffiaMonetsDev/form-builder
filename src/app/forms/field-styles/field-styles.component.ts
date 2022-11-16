import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-field-styles',
  templateUrl: './field-styles.component.html',
  styleUrls: ['./field-styles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldStylesComponent implements OnInit {
  formLabel = new FormControl(null, Validators.required);
  width = new FormControl(null, Validators.required);
  height = new FormControl(null, Validators.required);
  fontSize = new FormControl(null, Validators.required);
  fontWeight = new FormControl(null, Validators.required);
  colorInput = new FormControl(null, Validators.required);
  borderStyle = new FormControl(null, Validators.required);
  requiredField = new FormControl(null);
  addField = new FormControl(null);
  placeholder = new FormControl(null);

  @Input() targetEl!: HTMLElement;

  fieldLabel = 'label';

  selectOptions: Array<string> = [];

  @Output() onApply = new EventEmitter();
  form!: FormGroup;
  @Output() onAddOption = new EventEmitter();
  @Output() deleteItem =new EventEmitter();

  get f() { return this.form.controls; }
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      formLabel: this.formLabel,
      width: this.width,
      height: this.height,
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
      colorInput: this.colorInput,
      borderStyle: this.borderStyle,
      requiredField: this.requiredField,
      addField: this.addField,
      placeholder: this.placeholder
    });
  }

  apply() {
    if (this.form.valid) {
      this.onApply.emit(this.form.getRawValue());
    }
  }

  deleteField() {
    if(this.targetEl){
      this.deleteItem.emit(this.targetEl);
    }
  }

  addSelectField(){
    this.selectOptions.push(this.f['addField'].value);
    this.onAddOption.emit(this.selectOptions);
  }

}
