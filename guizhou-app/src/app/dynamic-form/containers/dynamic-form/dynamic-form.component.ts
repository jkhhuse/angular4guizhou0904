import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';

@Component({
    selector: 'dynamic-form',
    styleUrls: ['./dynamic-form.component.scss'],
    templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnChanges, OnInit {
    @Input()
    config: FieldConfig[] = [];

    @Output()
    submit: EventEmitter<any> = new EventEmitter<any>();

    form: FormGroup;

    get controls() { return this.config.filter(({ type }) => type !== 'button'); }
    get changes() { return this.form.valueChanges; }
    get valid() { return this.form.valid; }
    get value() { return this.form.value; }

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.createGroup();
        console.log('form子', this.form);
    }

    ngOnChanges() {
        if (this.form) {
            const controls = Object.keys(this.form.controls);
            const configControls = this.controls.map((item) => item.name);

            controls
                .filter((control) => !configControls.includes(control))
                .forEach((control) => this.form.removeControl(control));

            configControls
                .filter((control) => !controls.includes(control))
                .forEach((name) => {
                    const config = this.config.find((control) => control.name === name);
                    this.form.addControl(name, this.createControl(config));
                });

        }
    }

    createGroup() {
        const group = this.fb.group({});
        this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
        return group;
    }

    createControl(config: FieldConfig) {
        const { disabled, validation, value } = config;
        return this.fb.control({ disabled, value }, validation);
    }

    handleSubmit(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        this.submit.emit(this.value);
    }

    setDisabled(name: string, disable: boolean) {
        console.log('子组件disab', name);
        if (this.form.controls[name]) {
            console.log('子组件disab11111', name);
            const method = disable ? 'disable' : 'enable';
            this.form.controls[name][method]();
            return;
        }

        this.config = this.config.map((item) => {
            if (item.name === name) {
                item.disabled = disable;
            }
            return item;
        });
    }

    setValue(name: any, value: any) {
        console.log('子组件value', name);
        // this.form.controls[name] = value;
        console.log('子组件con', this.form);

        console.log('子组件config', this.config);
        this.config = this.config.map((item) => {
            if (item.name === name) {
                item = value;
            }
            return item;
        });
        // this.form.controls[name].setValue(value, { emitEvent: true });
    }
}