export interface ILinkedList<T> {
    length: number; 

    append(value: T): ILinkedList<T>; 
    prepend(value: T): ILinkedList<T>; 
    insert(position: number, value: T): ILinkedList<T>; 
    find(value: T): boolean; 
    update(position: number, value: T): boolean; 
    removeFirst(): ILinkedList<T>; 
    removeLast(): ILinkedList<T>; 
    removeAt(position: number): ILinkedList<T>; 
    toString(): string; 
}