import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Subscription} from '../models/subscription.model';

@Injectable({
  providedIn: 'root'
})

export class SubscriptionService {
  private subscriptionUrl = environment.backendUrl + 'subscriptions';

  constructor(private http: HttpClient) {
  }

  getSubscription(): Observable<Subscription> {
    return this.http.get<Subscription>(this.subscriptionUrl);
  }
}
