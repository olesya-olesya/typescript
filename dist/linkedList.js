"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
class LinkedList {
    constructor() {
        this._length = 0;
        this.head = null;
        this.tail = null;
    }
    get length() {
        return this._length;
    }
    //добавление
    append(value) {
        const newListNode = new ListNode(value);
        if (!this.head || !this.tail) {
            this.head = newListNode;
            this.tail = newListNode;
        }
        else {
            newListNode.prev = this.tail;
            this.tail.next = newListNode;
            this.tail = newListNode;
        }
        this._length++;
        return this;
    }
    prepend(value) {
        const newListNode = new ListNode(value);
        if (!this.head) {
            this.head = newListNode;
            this.tail = newListNode;
        }
        else {
            newListNode.next = this.head;
            this.head.prev = newListNode;
            this.head = newListNode;
        }
        this._length++;
        return this;
    }
    insert(position, value) {
        if (position < 0 || position > this._length) {
            throw new Error("Недопустимое место для вставки элемента");
        }
        const newListNode = new ListNode(value);
        if (position === 0) {
            return this.prepend(value);
        }
        if (position === this._length) {
            return this.append(value);
        }
        let currentListNode = this.head;
        let index = 0;
        while (index < position) {
            currentListNode = currentListNode.next;
            index++;
        }
        newListNode.prev = currentListNode.prev;
        newListNode.next = currentListNode;
        currentListNode.prev.next = newListNode;
        currentListNode.prev = newListNode;
        this._length++;
        return this;
    }
    //поиск
    find(value) {
        let currentListNode = this.head;
        let index = 0;
        while (currentListNode) {
            if (currentListNode.value === value) {
                return true;
            }
            currentListNode = currentListNode.next;
            index++;
        }
        return false;
    }
    update(position, value) {
        if (position < 0 || position >= this._length) {
            throw new Error("Недопустимы индекс");
        }
        let currentListNode = this.head;
        let index = 0;
        while (index < position) {
            currentListNode = currentListNode.next;
            index++;
        }
        currentListNode.value = value;
        return true;
    }
    removeFirst() {
        if (!this.head) {
            throw new Error("Список пуст");
        }
        if (this._length === 1) {
            this.head = null;
            this.tail = null;
            this._length--;
            return this;
        }
        this.head = this.head.next;
        this.head.prev = null;
        this._length--;
        return this;
    }
    removeLast() {
        if (!this.head) {
            throw new Error("Список пуст");
        }
        if (this._length === 1) {
            this.head = null;
            this.tail = null;
            this._length--;
            return this;
        }
        this.tail = this.tail.prev;
        this.tail.next = null;
        this._length--;
        return this;
    }
    removeAt(position) {
        if (position < 0 || position >= this._length) {
            throw new Error("Недопустимое место для удаления элемента");
        }
        if (position === 0) {
            return this.removeFirst();
        }
        if (position === this._length - 1) {
            return this.removeLast();
        }
        let currentListNode = this.head;
        let index = 0;
        while (index < position) {
            currentListNode = currentListNode.next;
            index++;
        }
        currentListNode.prev.next = currentListNode.next;
        currentListNode.next.prev = currentListNode.prev;
        this._length--;
        return this;
    }
    toString() {
        let currentListNode = this.head;
        let result = "";
        while (currentListNode) {
            result += currentListNode.value + (currentListNode.next ? " <-> " : "");
            currentListNode = currentListNode.next;
        }
        return result;
    }
}
// Создаем экземпляр списка
const list = new LinkedList();
// Тестируем добавление в конец (append)
list.append(10);
list.append(20);
list.append(30);
console.log("После append(10, 20, 30):", list.toString()); // Ожидаемый результат: 10 <-> 20 <-> 30
console.log("Длина списка:", list.length); // Ожидаемый результат: 3
// Тестируем добавление в начало (prepend)
list.prepend(5);
console.log("После prepend(5):", list.toString()); // Ожидаемый результат: 5 <-> 10 <-> 20 <-> 30
console.log("Длина списка:", list.length); // Ожидаемый результат: 4
// Тестируем вставку в середину (insert)
list.insert(2, 15);
console.log("После insert(2, 15):", list.toString()); // Ожидаемый результат: 5 <-> 10 <-> 15 <-> 20 <-> 30
console.log("Длина списка:", list.length); // Ожидаемый результат: 5
// Тестируем поиск элемента (find)
console.log("Поиск 15:", list.find(15)); // Ожидаемый результат: true
console.log("Поиск 100:", list.find(100)); // Ожидаемый результат: false
// Тестируем обновление элемента (update)
list.update(3, 25);
console.log("После update(3, 25):", list.toString()); // Ожидаемый результат: 5 <-> 10 <-> 15 <-> 25 <-> 30
console.log("Длина списка:", list.length); // Ожидаемый результат: 5
// Тестируем удаление первого элемента (removeFirst)
list.removeFirst();
console.log("После removeFirst():", list.toString()); // Ожидаемый результат: 10 <-> 15 <-> 25 <-> 30
console.log("Длина списка:", list.length); // Ожидаемый результат: 4
// Тестируем удаление последнего элемента (removeLast)
list.removeLast();
console.log("После removeLast():", list.toString()); // Ожидаемый результат: 10 <-> 15 <-> 25
console.log("Длина списка:", list.length); // Ожидаемый результат: 3
// Тестируем удаление элемента по индексу (removeAt)
list.removeAt(1);
console.log("После removeAt(1):", list.toString()); // Ожидаемый результат: 10 <-> 25
console.log("Длина списка:", list.length); // Ожидаемый результат: 2
// Тестируем удаление всех элементов
list.removeFirst();
list.removeLast();
console.log("После удаления всех элементов:", list.toString()); // Ожидаемый результат: ""
console.log("Длина списка:", list.length); // Ожидаемый результат: 0
