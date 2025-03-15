import {AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const timeRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const startTime = control.get('startTime').value;
  const endTime = control.get('endTime').value;

  if (!startTime || !endTime) {
    return null;
  }

  return new Date(startTime).getTime() >= new Date(endTime).getTime() ? {greaterStartTime: true} : null;
};
