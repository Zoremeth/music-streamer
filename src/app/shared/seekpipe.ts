import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'seek'
})
export class SeekPipe implements PipeTransform {
    transform(value: any): string {
        if (!value) {
            return '00:00';
        }
        const minutes = Math.trunc(value / 60);
        const seconds = (value / 60 - minutes) * 60;
        if (Math.trunc(seconds) >= 10 && Math.trunc(minutes) >= 10) {
            return `${minutes}:${Math.trunc(seconds)}`;
        } else if (Math.trunc(seconds) >= 10 ) {
            return `0${minutes}:${Math.trunc(seconds)}`;
        } else {
            return  `0${minutes}:0${Math.trunc(seconds)}`;
        }
    }
}
