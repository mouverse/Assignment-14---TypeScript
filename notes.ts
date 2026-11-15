// Note: انا عملت كل فايل لوحده وبعدين جمعتهم في فايل واحد زي ما حضرتك بتطلب كل مرة

// ---------- Storage.ts ----------
class Storage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  getAllItems(): T[] {
    return this.items;
  }
}

// ---------- User.ts ----------
class User {
  public id: number;
  public name: string;
  public email: string;
  private password: string;
  public phone: string;
  protected age: number;
  public notebooks: NoteBook[] = [];

  constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
    if (age < 18 || age > 60) {
      throw new Error("Age must be between 18 and 60");
    }
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age;
  }

  displayInfo(): void {
    console.log(`Id: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`);
  }

  addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }
}

// ---------- Admin.ts ----------
class Admin extends User {
  manageNotes(notebook: NoteBook, noteId: number): void {
    notebook.removeNote(noteId);
    console.log(`Admin ${this.name} removed note ${noteId}`);
  }
}

// ---------- Note.ts ----------
class Note {
  public id: number;
  public title: string;
  public content: string;
  public user: User;

  constructor(id: number, title: string, content: string, user: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.user = user;
  }

  preview(): string {
    return this.content.length > 20 ? this.content.substring(0, 20) + "..." : this.content;
  }
}

// ---------- NoteBook.ts ----------
class NoteBook {
  public name: string;
  private notes: Note[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addNote(id: number, title: string, content: string, author: User): void {
    this.notes.push(new Note(id, title, content, author));
  }

  removeNote(id: number): void {
    this.notes = this.notes.filter((n) => n.id !== id);
  }

  getNotes(): Note[] {
    return this.notes;
  }
}

// ---------- main.ts ----------
const user = new User(1, "Ali", "ali@mail.com", "1234", "0100000000", 25);
user.displayInfo();

const book = new NoteBook("My Notebook");
user.addNotebook(book);

book.addNote(1, "Shopping", "Buy milk, eggs and bread from the store", user);
book.addNote(2, "Study", "Learn TypeScript", user);
book.getNotes().forEach((n) => console.log(n.title + ": " + n.preview() + " (by " + n.user.name + ")"));

const admin = new Admin(2, "Sara", "sara@mail.com", "admin", "0111111111", 30);
admin.manageNotes(book, 1);
console.log("Notes left:", book.getNotes().length);

const storage = new Storage<string>();
storage.addItem("a");
storage.addItem("b");
storage.removeItem("a");
console.log(storage.getAllItems());
