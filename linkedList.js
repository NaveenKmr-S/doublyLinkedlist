
class LinkedList {
    size = 0;
    head = null;

    get isEmpty() {
        return this.size === 0;
    }

    createNode(element) {
        return { element, next: null }
    }

    getNodeAt(index) {
        if (index === undefined || index < 0 || index >= this.size) return null;

        if (index === 0) return this.head;

        let current = this.head;

        for (let i = 0; i < index; i++) {
            current = current.next;
        }

        return current;
    }

    push_(element) {
        const node = this.createNode(element);

        if (!this.head) {
            this.head = node;
        } else {
            const current = this.getNodeAt(this.size - 1);
            current.next = node;
        }

        this.size += 1;
        return this.size;
    }

    push(element) {
        const node = this.createNode(element);

        if (this.head === null) {
            this.head = node;
        } else {
            let current = this.head;

            while (current.next !== null) {
                current = current.next;
            }

            current.next = node;
        }

        this.size += 1;
        return this.size;
    }

    insert_(element, index = 0) {
        if (index > this.size) return false;

        const node = this.createNode(element);
        let current = this.head;

        if (index === 0) {
            node.next = current;
            this.head = node;
        } else {
            current = this.getNodeAt(index - 1);
            node.next = current.next;
            current.next = node;
        }

        this.size += 1;
        return true;
    }

    insert(element, index = 0) {
        if (index < 0 || index > this.size) return false;

        const node = this.createNode(element);

        if (index === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            let prev = this.head;

            for (let i = 0; i < index - 1; i++) {
                prev = prev.next;
            }

            node.next = prev.next;
            prev.next = node;
        }

        this.size += 1;
        return true;
    }

    remove(index = 0) {
        if (index < 0 || index > this.size) return null;

        let removedNode = this.head;

        if (index === 0) {
            this.head = this.head.next;
        } else {
            let prev = this.getNodeAt(index - 1);
            removedNode = prev.next;
            prev.next = removedNode.next;
        }

        this.size -= 1;
        return removedNode.element;
    }

    get(index) {
        const node = this.getNodeAt(index);
        return node ? node.element : null;
    }

    indexOf(element) {
        let current = this.head;

        if (current.element === element) return 0;

        for (let i = 0; i < this.size; i++) {
            if (current.element === element) return i;
            current = current.next;
        }

        return -1;
    }

    contains(element) {
        return this.indexOf(element) !== -1;
    }

   
    print() {
        let arr = [];

        if (this.size) {
            let current = this.head;

            for (let i = 0; i < this.size; i++) {
                arr.push(current);
                current = current.next;
            }
        }

        console.log(arr);
    }
}

class DoubleLinkedList extends LinkedList {
    tail = null;

    createNode(element) {
        return { element, next: null, prev: null };
    }

    push(element) {
        const node = this.createNode(element);

        if (!this.head) {
            this.head = node;
        } else {
            const current = this.getNodeAt(this.size - 1);
            current.next = node;
            node.prev = current;
        }

        this.tail = node;

        this.size += 1;
        return this.size;
    }

    insert(element, index = 0) {
        if (index > this.size) return false;

        const node = this.createNode(element);

        if (index === 0) {
            if (this.head) {
                node.next = this.head;
                this.head.prev = node;
            } else {
                this.tail = node;
            }
            this.head = node;
        } else if (index === this.size) {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        } else {
            const current = this.getNodeAt(index);
            const prev = current.prev;

            prev.next = node;
            current.prev = node;
            node.prev = prev;
            node.next = current;
        }

        this.size = this.size + 1;

        return true;
    };

    remove(index = 0) {
        if (index > this.size) return null;

        let removedNode = this.head;

        if (index === 0) {
            this.head = removedNode.next;
            if (this.size === 1) {
                this.tail = null;
            } else {
                this.head.prev = null;
            }
        } else if (index === this.size - 1) {
            removedNode = this.tail;
            this.tail = removedNode.prev;
            this.tail.next = null;
        } else {
            removedNode = this.getNodeAt(index);
            const prev = removedNode.prev;
            const next = removedNode.next;

            prev.next = next;
            next.prev = prev;
        }

        this.size = this.size - 1;
        return removedNode;
    };

    reverse() {
        let current = this.head;
        this.head = this.tail;
        this.tail = current;

        for (let i = 0; i < this.size; i++) {
            const prev = current.prev;
            const next = current.next;

            current.prev = next;
            current.next = prev;
            current = next;
        }
    }
}

class CircularDoubleLinkedList extends DoubleLinkedList {
    push(element) {
        const node = this.createNode(element);

        if (!this.head) {
            this.head = node;
        } else {
            const current = this.getNodeAt(this.size - 1);
            current.next = node;
            node.prev = current;
        }

        this.tail = node;
        this.tail.next = this.head;

        this.size += 1;
        return this.size;
    }

    insert(element, index = 0) {
        if (index > this.size) return false;

        const node = this.createNode(element);

        if (index === 0) {
            if (this.head) {
                node.next = this.head;
                this.head.prev = node;
            } else {
                this.tail = node;
            }
            this.head = node;
            this.tail.next = this.head;
        } else if (index === this.size) {
            this.tail.next = node;
            node.prev = this.tail;
            node.next = this.head;
            this.tail = node;
        } else {
            const current = this.getNodeAt(index);
            const prev = current.prev;

            prev.next = node;
            current.prev = node;
            node.prev = prev;
            node.next = current;
        }

        this.size = this.size + 1;

        return true;
    }

    remove(index = 0) {
        if (index > this.size) return null;

        let removedNode = this.head;

        if (index === 0) {
            this.head = removedNode.next;
            if (this.size === 1) {
                this.tail = null;
            } else {
                this.head.prev = null;
                this.tail.next = this.head;
            }
        } else if (index === this.size - 1) {
            removedNode = this.tail;
            this.tail = removedNode.prev;
            this.tail.next = this.head;
        } else {
            removedNode = this.getNodeAt(index);
            const prev = removedNode.prev;
            const next = removedNode.next;

            prev.next = next;
            next.prev = prev;
        }

        this.size = this.size - 1;
        return removedNode;
    }
    print() {
        let arr = [];

        if (this.size) {
            let current = this.head;

            for (let i = 0; i < this.size; i++) {
                arr.push(current);
                current = current.next;
            }
        }

        console.log(arr);
    }

    printunique() {
        let arr = [];

        if (this.size) {
            let current = this.head;

            for (let i = 0; i < this.size; i++) {
                arr.push(current.element);
                current = current.next;
            }
        }

        const filtered = arr.filter((ele, i) => {
            return arr.indexOf(ele) === i
        })
        console.log(filtered);
    }


}

const newclass = new CircularDoubleLinkedList();

const result = newclass.insert(4)
const resultd = newclass.insert(4)
const resultf = newclass.insert(7)
const resultf = newclass.insert(7)
const resultf = newclass.insert(6)
const resultf = newclass.insert(78)
const resultf = newclass.insert(77)
const resultf = newclass.insert(71)
const resultf = newclass.insert(70)
const resultf = newclass.insert(71)
const resultf = newclass.insert(78)
const resultf = newclass.insert(79)
const resultf = newclass.insert(70)
const resultf = newclass.insert(71)
const resultf = newclass.insert(700)
newclass.print()
newclass.printunique()


