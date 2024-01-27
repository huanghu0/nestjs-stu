import { Observable, interval, take } from "rxjs";
import { map, filter } from 'rxjs/operators'
 
 


const observableFuntion = ()  => {
  //类似于迭代器 next 发出通知  complete通知完成
  const observable = new Observable(subscriber=>{
    subscriber.next(1)
    subscriber.next(2)
    subscriber.next(3)

    setTimeout(()=>{
        subscriber.next(4)
        subscriber.complete()
    },1000)
  })

  observable.subscribe({
    next:(value)=>{
      console.log(value)
    }
  })
 
  const subs = interval(500).pipe(map(v => ({ num: v })), filter(v => (v.num % 2 == 0))).subscribe((e) => {
    console.log(e)
    if (e.num == 10) {
        subs.unsubscribe()
    }
  })  
} 

export const observableFunc =  observableFuntion