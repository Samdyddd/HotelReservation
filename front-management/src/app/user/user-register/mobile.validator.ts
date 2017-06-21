import { FormControl, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

export function validateMobile(c: FormControl) {
    let MOBILE_REGEXP = /^1[0-9]{10,10}$/;

    return MOBILE_REGEXP.test(c.value) ? null : {
        validateMobile: { valid: false }
    }
}

// NG_VALIDATORS是ng_validators为验证formControls的提供验证器
//使用multi：true添加验证器

@Directive({
    selector: '[validateMobile][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useValue: validateMobile, multi: true }
    ]
})
export class MobileValidator { }