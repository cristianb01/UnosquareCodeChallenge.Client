import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnosquareTask } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UnosquareTasksService {

  constructor(private httpClient: HttpClient) { 

  }

  public getAll(): Observable<UnosquareTask[]> {
    return this.httpClient.get<UnosquareTask[]>('https://localhost:7227/api/unosquareTask');
  }
}
