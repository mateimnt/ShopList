import { Injectable } from '@angular/core';
import { List, Item } from '../model/list';
import { Observable, of } from 'rxjs';

const LOCAL_STORAGE_KEY = 'lists';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private listArr: List[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      this.listArr = JSON.parse(data);
    } else {
      this.listArr = [];
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.listArr));
  }

  getAllList(): Observable<List[]> {
    return of(this.listArr);
  }

  addList(list: List): Observable<List> {
    list.id = this.listArr.length > 0 ? Math.max(...this.listArr.map(item => item.id)) + 1 : 1;
    this.listArr.push(list);
    this.saveToLocalStorage();
    return of(list);
  }

  deleteList(list: List): Observable<void> {
    const index = this.listArr.findIndex(item => item.id === list.id);
    if (index !== -1) {
      this.listArr.splice(index, 1);
      this.saveToLocalStorage();
    }
    return of();
  }

  editList(list: List): Observable<List> {
    const index = this.listArr.findIndex(item => item.id === list.id);
    if (index !== -1) {
      this.listArr[index] = list;
      this.saveToLocalStorage();
    }
    return of(list);
  }

  // Item-related methods
  addItem(listId: number, item: Item): Observable<Item> {
    const list = this.listArr.find(l => l.id === listId);
    if (list) {
      item.id = list.items.length > 0 ? Math.max(...list.items.map(i => i.id)) + 1 : 1;
      list.items.push(item);
      this.saveToLocalStorage();
      return of(item);
    }
    throw new Error('List not found');
  }

  deleteItem(listId: number, itemId: number): Observable<void> {
    const list = this.listArr.find(l => l.id === listId);
    if (list) {
      list.items = list.items.filter(item => item.id !== itemId);
      this.saveToLocalStorage();
      return of();
    }
    throw new Error('List not found');
  }

  editItem(listId: number, item: Item): Observable<Item> {
    const list = this.listArr.find(l => l.id === listId);
    if (list) {
      const index = list.items.findIndex(i => i.id === item.id);
      if (index !== -1) {
        list.items[index] = item;
        this.saveToLocalStorage();
        return of(item);
      }
    }
    throw new Error('List or item not found');
  }
}
