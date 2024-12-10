import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnosquareTask } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class UnosquareTasksService {

  constructor(private httpClient: HttpClient) { 

  }

  public getAll(filterCompletedTasks: boolean): Observable<UnosquareTask[]> {
    const params = new HttpParams().set('isCompleted', filterCompletedTasks);

    return this.httpClient.get<UnosquareTask[]>('https://localhost:7227/api/UnosquareTask', { params: params });
  }

  public create(task: UnosquareTask): Observable<UnosquareTask> {
    return this.httpClient.post<UnosquareTask>('', task);
  }
}
