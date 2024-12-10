import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';

interface TimerState {
  endTime: number;
  ipAddress: string;
  isExpired: boolean;
  startTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private readonly TIMER_KEY = 'timer_state';
  private readonly TIMER_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  private timerSubject = new BehaviorSubject<number>(0);
  private isExpiredSubject = new BehaviorSubject<boolean>(false);
  private interval: any;
  private currentIp: string | null = null;

  constructor(private http: HttpClient) {
    this.checkExistingTimer();
  }

  private checkExistingTimer() {
    const savedState = this.getSavedState();
    if (savedState) {
      this.getIPAddress().subscribe(ip => {
        if (ip === savedState.ipAddress) {
          const now = Date.now();
          const remainingTime = savedState.endTime - now;
          if (remainingTime > 0 && (now - savedState.startTime) < this.TIMER_DURATION) {
            this.currentIp = ip;
            this.startTimer(remainingTime);
          } else {
            this.isExpiredSubject.next(true);
            this.timerSubject.next(0);
            this.saveState(ip, true);
          }
        }
      });
    }
  }

  getIPAddress(): Observable<string> {
    return this.http.get('https://api.ipify.org?format=json').pipe(
      map((response: any) => response.ip),
      catchError(error => {
        console.error('Error fetching IP:', error);
        return of('local-' + Date.now());
      })
    );
  }

  initializeTimer(ipAddress: string) {
    if (this.currentIp && this.currentIp !== ipAddress) {
      return; // Don't initialize if IP doesn't match
    }

    const savedState = this.getSavedState();
    const now = Date.now();
    
    if (savedState && savedState.ipAddress === ipAddress) {
      const remainingTime = savedState.endTime - now;
      if (remainingTime > 0 && (now - savedState.startTime) < this.TIMER_DURATION) {
        this.startTimer(remainingTime);
        return;
      }
    }

    // Start new timer
    this.currentIp = ipAddress;
    this.isExpiredSubject.next(false);
    this.startTimer(this.TIMER_DURATION);
    this.saveState(ipAddress);
  }

  private startTimer(duration: number) {
    if (this.interval) {
      clearInterval(this.interval);
    }

    const endTime = Date.now() + duration;
    this.updateTimer(endTime);

    this.interval = setInterval(() => {
      this.updateTimer(endTime);
    }, 1000);
  }

  private updateTimer(endTime: number) {
    const remaining = Math.max(0, endTime - Date.now());
    this.timerSubject.next(remaining);

    if (remaining === 0) {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.isExpiredSubject.next(true);
      this.saveState(this.currentIp || 'local', true);
    }
  }

  private saveState(ipAddress: string, isExpired: boolean = false) {
    const now = Date.now();
    const state: TimerState = {
      endTime: now + (isExpired ? 0 : this.TIMER_DURATION),
      ipAddress,
      isExpired,
      startTime: now
    };
    try {
      localStorage.setItem(this.TIMER_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving timer state:', error);
    }
  }

  private getSavedState(): TimerState | null {
    try {
      const saved = localStorage.getItem(this.TIMER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error reading timer state:', error);
      return null;
    }
  }

  getTimer(): Observable<number> {
    return this.timerSubject.asObservable();
  }

  getIsExpired(): Observable<boolean> {
    return this.isExpiredSubject.asObservable();
  }

  formatTime(ms: number): string {
    if (ms <= 0) return '00:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  resetTimer(ipAddress: string) {
    if (this.currentIp && this.currentIp !== ipAddress) {
      return; // Don't reset if IP doesn't match
    }
    this.currentIp = ipAddress;
    this.isExpiredSubject.next(false);
    this.startTimer(this.TIMER_DURATION);
    this.saveState(ipAddress);
  }
} 