import { from, fromEvent, defer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const btn = document.querySelector('#run');

// Observable tworzony z Promise'a za pomocą from() jest uruchamiany od razu (funkcja getPromise()
// wywoływana jest od razu) i każde kliknięcie na btn#run zwraca ten sam wynik, czyli random number
// wylosowany przy uruchomieniu Promise'a

// Observable tworzony z Promise'a za pomocą defer() NIE jest uruchamiany od razu,
//  każde kliknięcie na btn#run powoduje NOWE wywoływanie funkcji getPromise() i tym samym utworzenie
// nowego Promise'a i, co za tym idzie, wylosowanie nowego random number

// Trzeci przypadek, czyli wstawienie fynkcji getPromise() bezpośrednio do switchMap(), powoduje takie
// samo zachowanie jak w przypadku defer

// const fromPromiseObservable = from(getPromise());
const deferPromiseObservbale = defer(() => getPromise());

fromEvent(btn, 'click')
  .pipe(
    // switchMap(() => fromPromiseObservable)
    switchMap(() => deferPromiseObservbale)
    // switchMap(() => getPromise())
  )
  .subscribe({
    next: (v) => console.log('CLICK', v),
    error: (err) => console.error('ERR', err),
    complete: () => console.info('COMPLETE'),
  });

function getPromise() {
  console.log('GET PROMISE');
  return new Promise<number>((resolve, reject) => {
    const result = Math.floor(Math.random() * 10);
    console.info('PROMISE PREPARED with: ', result);

    setTimeout(() => {
      console.info('PROMISE RUN with: ', result);
      resolve(result);
    }, 3000);
  });
}
