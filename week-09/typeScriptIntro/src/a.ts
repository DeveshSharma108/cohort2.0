const x:number = 5
console.log(x)

function greet(firstName:string){
    console.log("Hello!",firstName)
}
greet("Devesh")

// type inference --> ts automatically infer type of variable
// Example here we are not declaring the type of return of following function yet ts infered it will be a number

function sum(a:number,b:number){
    return a + b
}

// explicitly declaring the return type for this function, ts infered boolean return type here also but we explicitly mentioned return type for readibility 
function canVote(age:number):boolean{
    return age >= 18
}
canVote(18)


// function that takes another function as input and executes after n seconds
function caller(fn:(firstName:string)=>void,firstName:string){
    setTimeout(()=>fn(firstName),1000)
}
caller(greet,"Devesh")






// Extra 
/**
 * ## Why does this code work despite `executer` expecting `()=>void` while `a` returns `number`?
 *
 * ### 1️⃣ **Function Parameter Bivariance (Default Behavior)**
 * - When `strictFunctionTypes` is **false** (default in non-strict mode), function parameters are **bivariant**.
 * - This means `executer(fn: () => void)` **can accept** `a: () => number` without a TypeScript error.
 * - TypeScript doesn't enforce strict contravariance in this mode.
 * - The return value of `a` is simply ignored in type-checking.
 *
 * ### 2️⃣ **When `strictFunctionTypes: true` (Enabled in `strict` Mode)**
 * - Function parameters become **contravariant**, meaning `executer(fn: () => void)` **should not** accept `a: () => number`.
 * - However, TypeScript still allows `a` because:
 *   - **TypeScript implicitly allows functions with a return value where `void` is expected**, as long as the return value isn't used.
 *   - **Problem:** The return value **is** used (`const a = fn();`), but TypeScript still doesn’t warn due to `void`'s implicit behavior.
 *
 * ### 3️⃣ **Why No TypeScript Warning?**
 * - TypeScript allows functions with non-void return values **if their return value is ignored**.
 * - Even though `const a = fn();` stores the return value, TypeScript still permits it.
 * - **However**, if you assigned `executer(a)` to a variable (`const result = executer(a);`), TypeScript would enforce stricter checking.
 *
 * ### 4️⃣ **How to Enforce Strict Behavior?**
 * - To disallow functions that return non-void values, explicitly define the type as `() => undefined`:
 *
 * ```ts
 * function executer(fn: () => undefined) { 
 *     setTimeout(() => {
 *         const a = fn();  // Now TypeScript will warn if `fn` returns anything.
 *         console.log("Value Returned", a);
 *     }, 1000);
 * }
 * ```
 * - Now, calling `executer(a)` will result in a TypeScript error.
 *
 * ### **💡 Summary**
 * - TypeScript **loosely treats `void` as `any`** in function return types.
 * - Even with `strictFunctionTypes: true`, functions returning a value can still be passed to a function expecting `void`.
 * - If you need **strict enforcement**, use `() => undefined` instead of `() => void`.
 */

function executer(fn: () => void) {
    setTimeout(() => {
        const a = fn();
        console.log("Value Returned", a);
    }, 1000);
}

function a() {
    console.log("hi");
    return 5;
}

executer(a); // No TypeScript error, despite `a` returning a number.



// interfaces .................

const user = {
    firstname:"Joe",
    age:18,
    email:"joe@gmial.com"
}
/*
// function to find if user is legal we be updated in later part of code
function isLegal(user:
    {
        firstname:string,
        age:number,
        email:string
    
    }):boolean{
    return user.age >= 18
}


// function to output email will be updated in later part code 
function emailRet(user:
    {
        firstname:string,
        age:number,
        email:string
    
    }):string{
    return user.email
}

console.log(user.firstname,"has email :",emailRet(user),"\nLegal :",isLegal(user))
*/


// if we have to use user as input for other function also we will have to define the input parameter for them also, this is causing code repetition that we do not want --> Solution - Interfaces 

// Creating and using interface for user

interface User{
    firstname:string,
    age:number,
    email?:string  // if we want to make any property optional use ?
}



//  ............ UPDATE .............
// updating the function isLegal and emailRet to use interface
function emailRet(user:User){
    return user.email
}
function isLegal(user:User):boolean{
    return user.age >= 18
}
// using interface 
console.log(user.firstname,"has email :",emailRet(user),"\nLegal :",isLegal(user))

// it is good to mention user2 as type User interface but I didn't mentioned it ....
const user2 = {         
    firstname:"Sam",
    age:18
}

/*
console.log(user2.firstname,"has email :",`${emailRet(user2)? emailRet(user2):'Unavailable'}`,"\nLegal :",isLegal(user2))
*/
// concise way to represent above console log using nullish coalescing operator instead of string formating and ternary operator

console.log(user2.firstname,"has email :",emailRet(user2)?? "Unavailable","\nLegal :",isLegal(user2))



// implementing interfaces using class [We can't do it using types.]

interface Person{
    name:string,
    age:number,
    sayHello():void
}

class Employee implements Person{
    name: string
    age: number

    constructor(n:string,a:number){
        this.name = n
        this.age = a
    }

    sayHello():void{
        console.log(`I am ${this.name}.I am ${this.age} years old.`)
    }

}

const e1 = new Employee("Sam",25)
e1.sayHello()


// Types in typescript 
// Types are very similar to interfaces but they let you aggregate data from different types or interfaces 
// Main difference between types and interfaces 
// 1. Interface can be implemented by using class but types can't
// 2. Types can aggregate [union,intersection] data from different types/interfaces or both but interfaces can't
// 3. Interface can use extends ??


// Intersection and Union 
// 🦸 Hero Type: Represents superheroes officially recognized by the government
type Hero = {
    name: string;
    alias: string;
    superpower: string;
    isRegistered: true;
};

// 🕵️ Vigilante Type: Represents independent heroes working outside the system
type Vigilante = {
    alias: string;
    stealthMode: boolean;
    knownEnemies: string[];
    isRegistered: false;
};

// ✅ UNION (either a Hero or a Vigilante)
type RegisteredOrRogue = Hero | Vigilante;

// ❌ INTERSECTION (Fix: Making isRegistered flexible)
// If we simply try to intersect Hero and Vigilante type it will give error [never type] because of isRegistered property
// omited isRegistered from both types because one type needs true value while other wnats false and hence both can never occur simultaneously hence we were getting never type error.....
// Added isRegisterd as boolean type in DoubleAgent type
type DoubleAgent = Omit<Hero, "isRegistered"> & Omit<Vigilante, "isRegistered"> & {isRegistered:boolean};

const batman: RegisteredOrRogue = {
    alias: "The Dark Knight",
    stealthMode: true,
    knownEnemies: ["Joker", "Bane", "Riddler"],
    isRegistered: false, // Since he's a vigilante
};

const ironMan: DoubleAgent = {
    name: "Tony Stark",
    alias: "Iron Man",
    superpower: "Genius intellect & high-tech armor",
    stealthMode: true,
    knownEnemies: ["Thanos", "Ultron"],
    isRegistered: true, // Can now be true or false
};


// 🏛️ OfficialHero Interface: Represents heroes registered with the government
interface OfficialHero {
    heroID: number;
    name: string;
    rank: string;
}

// 🌍 WorldThreat Interface: Represents a hero who has fought a world-ending threat
interface WorldThreat {
    threatLevel: "Planetary" | "Universal" | "Multiversal";
    hasSavedEarth: boolean;
}

// ✅ UNION: A hero might be either officially ranked OR a hero who saved the world
type HeroStatus = OfficialHero | WorldThreat;

// ❌ INTERSECTION: A hero who is both officially ranked AND has saved the world
type LegendaryHero = OfficialHero & WorldThreat;

const thor: HeroStatus = {
    threatLevel: "Universal",
    hasSavedEarth: true, // He's not a government-ranked hero, but he's powerful
};

const captainAmerica: LegendaryHero = {
    heroID: 1,
    name: "Steve Rogers",
    rank: "Captain",
    threatLevel: "Planetary",
    hasSavedEarth: true, // He saved Earth many times!
};


// 🦹 Villain Type: Represents supervillains
type Villain = {
    alias: string;
    evilPlan: string;
};

// 👨‍⚖️ Wanted Interface: Represents criminals wanted by the law
interface Wanted {
    bounty: number;
    dangerLevel: "Low" | "High" | "Extreme";
}

// ✅ UNION: A character can either be a villain OR a wanted person
type Criminal = Villain | Wanted;

// ❌ INTERSECTION: A villain who is also on the wanted list
type MostWantedVillain = Villain & Wanted;

const loki: Criminal = {
    alias: "God of Mischief",
    evilPlan: "Take over Asgard",
};

const thanos: MostWantedVillain = {
    alias: "Mad Titan",
    evilPlan: "Eliminate half of all life",
    bounty: 1000000000,
    dangerLevel: "Extreme",
};


// arrays in ts

const arr:number[] = [1,2,3]  // array of number type
const users:User[] = [user,user2] // array of User interface
console.log(arr)
console.log(users)




// enums (enumerations in ts, they also exist in other languages as well)

enum HeroRank{
    S = 4,
    A = 3,
    B = 2,
    C = 1,
    D = 0
}

enum HeroCurrentStatus{
    Active = "The hero is actively saving the world! 🦸",
    Retired = "This hero has retired and is enjoying life 🍹",
    Deceased = "The hero has fallen... Rest in Power 💀",
    Unknown = "❓"
}



function getHeroRank(rank:HeroRank): string {
    return `Rank: ${HeroRank[rank]}`;
}

/*
Error 
function getHeroStatus(status: HeroCurrentStatus): string {
    return `Rank: ${HeroCurrentStatus[status]}`;
}
string enums in TypeScript do not support reverse mapping like numeric enums do.
What is reverse mapping 
*/

// correct way

// 🔥 Using Record to map HeroCurrentStatus values for quick lookup
const HeroStatusMessages: Record<HeroCurrentStatus, string> = {
    [HeroCurrentStatus.Active]: "The hero is actively saving the world! 🦸",
    [HeroCurrentStatus.Retired]: "This hero has retired and is enjoying life 🍹",
    [HeroCurrentStatus.Deceased]: "The hero has fallen... Rest in Power 💀",
    [HeroCurrentStatus.Unknown]: "❓"
};

// 🛠️ Function to retrieve hero status message
function getHeroStatus(status: HeroCurrentStatus): string {
    return HeroStatusMessages[status]
}
//...........................................................
// simple function to retrieve hero status value (not key)
function getHeroStatus2(status: HeroCurrentStatus): string {
    return status
}
//............................................................

// 🚀 Testing the function
console.log(getHeroRank(HeroRank.S)); 
console.log(getHeroRank(HeroRank.B));

console.log(getHeroStatus(HeroCurrentStatus.Active))
console.log(getHeroStatus(HeroCurrentStatus.Retired))
console.log(getHeroStatus(HeroCurrentStatus.Deceased))
console.log(getHeroStatus(HeroCurrentStatus.Unknown))
console.log(getHeroStatus2(HeroCurrentStatus.Active))




// generics in typescript

function identity<T>(arg:T):T{
    return arg
}

// typescript infered the type correctly automatically but it is good practice to mention type while calling this type of functions 
console.log(identity(5))
console.log(identity("Dev"))
console.log(identity([1,2,4]))
// explicit type annotation while calling
console.log(identity<boolean>(true))
console.log(identity<object>({"a":1,"b":2}))


function identityArray<T>(arg: T[]): T[] {
    return arg;
}

console.log(identityArray<number>([10, 20, 30]))
console.log(identityArray<string>(["A", "B", "C"]))
console.log(identityArray<object>([{ x: 1 }, { y: 2 }]))


/*

Problem: Generic Data Store

You are building a generic data store that can store and retrieve different types of entities (e.g., users, products, orders). The store should work type-safely for different types of data.

Requirements:

Create a generic class DataStore<T> that:

Stores an array of items of type T.
Has methods to add an item, get all items, and find an item by a key.
Implement findItem method, which:

Accepts a key (property name) and a value.
Returns the first item in the store that matches.
Use the DataStore with different types:

Create a UserStore using DataStore<User>.
Create a ProductStore using DataStore<Product>.

*/
class DataStore<T>{
    items:T[] // in typescript we have to declare the type of class property
    constructor(input:T[]){
        this.items = input
    }
    add(item:T):string{
        this.items.push(item)
        return `Added ${item} to the store`
    }
    getAll():T[]{
        return this.items
    }
    /*
    // key of T ensures key is a valid property of T
    findItem(search:{key:keyof T,value:any}):T|undefined{
        return this.items.find((item:T)=>item[search.key] === search.value)
    }
    */

    // in above findItem function value can be of any type which means type safety is lost because if T is Order, user passed the arguement as {key:"location",value:20} it will cause runtime issue when this comparision will happen item[search.key] === search.value as item[search.key] is string while search.value is number type 
    // we can avoid this by enforcing value to have the correct type as the key of actual item has based on the key

    // updated findItem 
    findItem<K extends keyof T>(search:{key:K,value:T[K]}){
        return this.items.find((item: T) => item[search.key] === search.value)
    }
}

interface Order {
    id: number;
    location: string
  }
  
  interface Product {
    id: number;
    name: string;
    price: number;
  }

const products:Product[] = [{id:1,name:"Laptop",price:80000},{id:2,name:"Phone",price:20000}]

const orders:Order[] = [{id:1,location:"Pune"},{id:2,location:"Hyderabad"}]

const productStore = new DataStore<Product>(products)
const orderStore = new DataStore<Order>(orders)

console.log(productStore.add({id:3,name:"Smart Watch",price:15000}))
console.log(orderStore.add({id:3,location:"Indore"}))

console.log(productStore.getAll())
console.log(orderStore.getAll())

console.log(productStore.findItem({ key: "id", value: 2 }))
console.log(productStore.findItem({key:"id",value:4}))