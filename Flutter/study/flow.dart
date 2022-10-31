/*
 * Filename: d:\project\Coding-with-Front-end\Flutter\study\day1.dart
 * Path: d:\project\Coding-with-Front-end\Flutter\study
 * Created Date: Sunday, October 30th 2022, 10:48:27 pm
 * Author: CodingGorit
 * 
 * Copyright (c) 2022 fmin-courses
 */



import 'dart:async';

void main() {
  print('flow start');  // 执行打印开始

  // 执行判断为事件任务，添加到事件任务队列
  Timer.run((){
    print('event'); // 执行事件任务，打印标记
  });

  // 执行判断为微任务，添加到微任务队列
  scheduleMicrotask((){
    print('microtask'); //执行未任务，打印标记
  });

  print('flow end');
}

// flow start
// flow end
// microtask
// event

// 每次运行完程主线程，都会判断是否有 微任务和 事件任务需要执行，有的话，优先执行微任务，没有判断是否有事件任务