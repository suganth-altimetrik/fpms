import { Component, OnInit } from '@angular/core';
// import { getSocketMessage, joinRoom } from '../../shared/socket-methods';
import { InvestApiService } from './../../services/invest-api.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
})
export class DynamicTableComponent implements OnInit {
  constructor(private http: InvestApiService, private socket: SocketService) {
    //connection
    this.socket.sendMessage('admin');
  }

  trackRecord(data: any) {
    return data.infy;
  }

  headData: any = [
    'infy',
    'tata',
    'cgi',
    'sys',
    'com',
    'air',
    'alt',
    'gen',
    'act',
    'jio',
  ];

  bodyData: any = [
    {
      infy: 1,
      tata: 2,
      cgi: 3,
      sys: 4,
      com: 5,
      air: 1,
      alt: 2,
      gen: 3,
      act: 4,
      jio: 5,
    },
    {
      infy: 1,
      tata: 2,
      cgi: 3,
      sys: 4,
      com: 5,
      air: 1,
      alt: 2,
      gen: 3,
      act: 4,
      jio: 5,
    },
    {
      infy: 1,
      tata: 2,
      cgi: 3,
      sys: 4,
      com: 5,
      air: 1,
      alt: 2,
      gen: 3,
      act: 4,
      jio: 5,
    },
    {
      infy: 1,
      tata: 2,
      cgi: 3,
      sys: 4,
      com: 5,
      air: 1,
      alt: 2,
      gen: 3,
      act: 4,
      jio: 5,
    },
    {
      infy: 1,
      tata: 2,
      cgi: 3,
      sys: 4,
      com: 5,
      air: 1,
      alt: 2,
      gen: 3,
      act: 4,
      jio: 5,
    },
    {
      infy: 1,
      tata: 2,
      cgi: 3,
      sys: 4,
      com: 5,
      air: 1,
      alt: 2,
      gen: 3,
      act: 4,
      jio: 5,
    },
    {
      infy: 1,
      tata: 2,
      cgi: 3,
      sys: 4,
      com: 5,
      air: 1,
      alt: 2,
      gen: 3,
      act: 4,
      jio: 5,
    },
    {
      infy: 1,
      tata: 2,
      cgi: 3,
      sys: 4,
      com: 5,
      air: 1,
      alt: 2,
      gen: 3,
      act: 4,
      jio: 5,
    },
    {
      infy: 1,
      tata: 2,
      cgi: 3,
      sys: 4,
      com: 5,
      air: 1,
      alt: 2,
      gen: 3,
      act: 4,
      jio: 5,
    },
    {
      infy: 1,
      tata: 2,
      cgi: 3,
      sys: 4,
      com: 5,
      air: 1,
      alt: 2,
      gen: 3,
      act: 4,
      jio: 5,
    },
  ];

  interval: any;

  handleStart() {
    this.http.dynamicDataStart().subscribe((data: any) => {
      console.log(data);
    });
  }

  handleEnd() {
    clearInterval(this.interval);
    this.http.dynamicDataStop().subscribe((data: any) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.socket.onNewMessage().subscribe((msg: any) => {
      console.log('got a msg: ' + msg);

      const headIndex: number = Math.floor(Math.random() * 10);

      const head: string = this.headData[headIndex];

      const rowIndex: number = Math.floor(Math.random() * 10);

      this.bodyData[rowIndex][head] = msg;
    });
  }
}
