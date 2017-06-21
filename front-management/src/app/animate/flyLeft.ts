import { trigger, state, style, transition, animate, keyframes } from '@angular/core';

export const flyLeft = trigger('flyLeft', [
    state('in', style({ transform: 'translatex(0)' })),
    transition('void => *', [
        animate(300, keyframes([
            style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
    ])
])