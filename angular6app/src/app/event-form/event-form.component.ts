import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  @Output() eventFormSubmit: EventEmitter<EventFormData> = new EventEmitter<EventFormData>();
  public eventForm: FormGroup;

  public formErrors = {
    'title': '',
    'dateOfEvent': '',
    'time': ''
  };

  public validationMessages = {
    'title': {
      'required': 'title required'
    },

    'dateOfEvent': {
      'required': 'Date required'
    },

    'time': {
      'required': 'Time required'
    }
  };

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
   }

  ngOnInit() {
    this.onFormValueChanged();
  }

  private buildForm() {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.required],
      dateOfEvent: ['', Validators.required],
      time: ['', Validators.required]
    });
    this.eventForm.valueChanges.subscribe(data=> this.onFormValueChanged(data));
  }


   onFormValueChanged(data?: any) {
    if (!this.eventForm) { return; }

    const form = this.eventForm;
    for (const controlError in this.formErrors) {
      if (controlError) {
        this.formErrors[controlError] = '';
        const control = form.get(controlError);
        console.log(controlError);
        if (control && control.dirty && !control.valid) {
          console.log(control);
          const errorMessages = this.validationMessages[controlError];
          for (const errorName in control.errors) {
            if ( errorName )  {
              console.log(errorName);
              this.formErrors[controlError] += errorMessages[errorName];
            }
          }
        }
      }
    }
  }

  public submitForm(): void {
    const event = {
      description : this.eventForm.value.title
    };

    if (this.eventForm.valid)    {
      console.log(this.eventForm);
      this.eventFormSubmit.emit({eventData: event });
    }
  }

  public resetForm(): void {
  }

}

export interface Event {
  datetime?: Date;
  description: string;
}

export interface EventFormData {
  eventData: Event;
  cancelled?: boolean;
}