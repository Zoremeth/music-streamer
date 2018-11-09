import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "seek"
})
export class SeekPipe implements PipeTransform {
    transform(value: any): string {
        const minutes = Math.trunc(value / 60);
        const seconds = (value / 60 - minutes) * 60;
        if (!value) {
            return "00:00";
        }

        return value =
            Math.trunc(seconds) >= 10
                ? `0${minutes}:${Math.trunc(seconds)}`
                : `0${minutes}:0${Math.trunc(seconds)}`;
    }
}