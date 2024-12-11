import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { UnosquareTask } from '../models/task.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class UnosquareTasksService {

  private controllerUrl = 'https://localhost:44354/api/UnosquareTask';

  constructor(private httpClient: HttpClient, private alertService: AlertService) { 

  }

  public getAll(filterCompletedTasks: boolean | null): Observable<UnosquareTask[]> {
    let params = new HttpParams();

    if (filterCompletedTasks != null) {
      params = params.set('isCompleted', filterCompletedTasks);
    }

    return this.httpClient.get<UnosquareTask[]>(this.controllerUrl, { params: params })
      .pipe(catchError(err => {
        this.alertService.showError("Could not get list of tasks. Try again");
        return of([]);
      }));
  }

  public create(task: UnosquareTask): Observable<UnosquareTask> {
    return this.httpClient.post<UnosquareTask>(this.controllerUrl, task);
  }

  public update(task: UnosquareTask): Observable<UnosquareTask> {
    return this.httpClient.put<UnosquareTask>('', task);
  }

  public delete(taskId: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.controllerUrl}/${taskId}`);
  }
}
