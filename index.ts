import { from } from 'rxjs';

// uruchomione zostaną 4 emit'y: 3 next'y, po jednym dla każdej wartości z poniższej tablicy, i jeden complete
from([
  1,
  'qwe',
  new Error('upssss'), // nie powoduje uruchomienia poniższego listenera "error" w Observer'ze, tylko normalnie "next'a"
]).subscribe({
  next: (data) => console.log('Data:', data),
  error: (er) => console.error(er),
  complete: () => console.log('Completed'),
});

const promise = new Promise<number>((resolve, reject) => {
  const result = Math.floor(Math.random() * 10);

  if (result > 5) {
    setTimeout(() => resolve(result), 3000);
  } else {
    setTimeout(() => reject(result), 2500);
  }
});

from<Promise<number>>(promise).subscribe({
  next: (data: number) => console.log('Promised number:', data),
  error: (err: number) => console.error('Not enought:', -err),
});
