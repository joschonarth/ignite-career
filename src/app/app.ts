import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  private _router = inject(Router);

  readonly steps = [
    { path: '/personal', number: '01' },
    { path: '/professional', number: '02' },
    { path: '/academic', number: '03' },
  ];

  url = toSignal(
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this._router.url },
  );

  currentStep = computed<string>(() => this.url());

  isFinished = computed(() => this.currentStep() === '/resume-informations');

  currentStepNumber = computed(() => {
    const step = this.steps.find((s) => s.path === this.currentStep());
    return step?.number ?? '';
  });

  currentStepIndex = computed(() => {
    if (this.isFinished()) return this.steps.length;

    return this.steps.findIndex((s) => s.path === this.currentStep());
  });

  stepSegmentWidth = computed(() => `${100 / this.steps.length}%`);

  isSegmentActive(index: number) {
    return this.currentStepIndex() >= index;
  }
}
