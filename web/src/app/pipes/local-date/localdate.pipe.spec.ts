import { LocalDatePipe } from './localdate.pipe';

describe('LocaldatePipe', () => {
  it('create an instance', () => {
    const pipe = new LocalDatePipe();
    expect(pipe).toBeTruthy();
  });
});
