import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './demo.component';
import { AlphaGlobalHeader } from '../../../../src/angular/src/alpha-global-header.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AlphaGlobalHeader
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have at least 1 li tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('li').length).toBeGreaterThanOrEqual(1);
  }));
});
