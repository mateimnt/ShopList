export class Item {
    id: number = 0;
    item_name: string = '';
  }
  
  export class List {
    id: number = 0;
    list_name: string = '';
    items: Item[] = [];  
  }
  