import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { FieldStyles, FormStyles } from '../_helpers/interfaces';

@Component({
  selector: 'app-forms-builder',
  templateUrl: './forms-builder.component.html',
  styleUrls: ['./forms-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsBuilderComponent implements OnInit {

  formPanelOpenState = false;
  fieldPanelOpenState = false;

  expandStatus = false;

  formLabel = 'Form Label';

  selectLabel = '';
  inputLabel = '';
  buttonLabel = '';
  checkboxLabel = '';
  textareaLabel = '';


  placeHolder = 'placeholder';

  required = false;

  targetEl!: HTMLElement;

  mappedFormStyles!: Object;
  mappedFieldStyles!: Object;

  selectOptions: Array<string> = [];

  constructor() { }

  inpres = [];

  InputList = ['Input', 'Textarea', 'Button', 'Checkbox', 'Select']

  ngOnInit(): void {
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done: Array<{ val: string; }> = [];

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  delete(element: HTMLElement) {
    this.expandStatus = false;
    let elementToDelete = element.parentElement;
    if (element.id !== 'formBuilder' && element.id !== 'formInputs' && element.id !== 'formLabel') {
      // elementToDelete!.remove()!;
      document.getElementById('formInputs')?.remove();
    }
  }

  currentTarget(event: PointerEvent | any) {
    this.targetEl = event.target;
  }

  toggleFormPanel() {
    this.formPanelOpenState = !this.formPanelOpenState;
    this.fieldPanelOpenState = false;
  }

  toggleFieldPanel() {
    this.fieldPanelOpenState = !this.fieldPanelOpenState;
    this.formPanelOpenState = false;
  }

  formStyles(event: FormStyles) {
    if (event) {
      this.formLabel = event.formLabel;
      this.mappedFormStyles = {
        'color': `rgb(${event.textColor})`,
        'background-color': `rgb(${event.background})`,
        'border-style': event.borderType,
        'border-color': `rgb(${event.borderColor})`,
        'border-width': 'thick'
      }
    }
  }

  fieldStyles(event: FieldStyles) {
    console.log(this.targetEl);
    if (event && this.targetEl) {
      this.placeHolder = event.placeholder;
      this.required = event.requiredField;
      this.targetEl.style.color = `rgb(${event.colorInput})`;
      this.targetEl.style.width = `${event.width}px`;
      this.targetEl.style.height = `${event.height}px`;
      this.targetEl.style.fontSize = `${event.fontSize}px`;
      this.targetEl.style.fontWeight = event.fontWeight;
      this.targetEl.style.borderStyle = event.borderStyle;
      this.targetEl.style.borderWidth = '2px';
      if (this.targetEl.id === 'Input') {
        this.inputLabel = event.formLabel;
      } else if (this.targetEl.id === 'Textarea') {
        this.textareaLabel = event.formLabel;
      } else if (this.targetEl.id === 'Checkbox') {
        this.checkboxLabel = event.formLabel;
      } else if (this.targetEl.id === 'Button') {
        this.buttonLabel = event.formLabel
      } else if (this.targetEl.id === 'Select') {
        this.selectLabel = event.formLabel;
      }
    }
  }

  toggleExpandSection() {
    this.expandStatus = true;
    this.fieldPanelOpenState = true;
  }

  addSelectOptions(event: Array<string>) {
    this.selectOptions = event;
  }

  saveForm() {

  }

}
