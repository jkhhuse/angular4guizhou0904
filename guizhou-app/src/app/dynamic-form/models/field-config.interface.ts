import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
    disabled?: boolean,
    label?: string,
    name: string,
    options?: string[],
    placeholder?: string,
    type: string,
    validation?: ValidatorFn[],
    value?: any,
    styles?: any,
    buttonType?: any,
    divStyles?: any,
    ifTags?: string,
    inputType?: string,
    defaultValue?: any,
    notNecessary?: boolean,
    buttonDis?: any,
    selectedOption?: any,
    valueUpdate?: boolean
}