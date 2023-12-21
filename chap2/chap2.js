const Person = {
    firstname: "",
    lastname: "",
    age: 0
};

/**
 * @type {typeof Person}
 */
const p1 = {
    firstname: "Long",
    lastname: "Le",
    age: 20
};

/**
 * 
 * @param {string} data 
 * @returns {string}
 */
function firstTransform(data) {
    return data.split("").reverse().join("");
}

/**
 * 
 * @param {string} data 
 * @param {(data: string) => string} secondTransform 
 * @returns 
 */
function encodeStr(data, secondTransform) {
    const firstPhaseData = firstTransform(data);
    return secondTransform(firstPhaseData);
}

/**
 * 
 * @param {string} data 
 * @returns {string}
 */
function myTransform(data) {
    let transformed = data;
    // you transform code

    // ------------------
    return transformed;
}

console.log(encodeStr("abc", myTransform));

/**
 * Represent Student class
 * @param {string} firstname 
 * @param {string} lastname 
 * @param {number} age 
 */
function Student(firstname, lastname, age) {
    // We declare fields inside the function and provide getter/setter

    let _firstname = firstname;
    let _lastname = lastname;
    // const for preventing change to this field
    const _age = age;

    // private function
    const pvtFunc = () => {
        console.log("This is private");
    }

    return {
        getFirstName: () => _firstname,
        getLastName: () => _lastname,
        getAge: () => _age,
        /**
         * @param {string} firstname 
         */
        setFirstName: (firstname) => {
            _firstname = firstname
        },
        /**
         * @param {string} lastname 
         */
        setLastName: (lastname) => {
            _lastname = lastname;
        },
        // public function
        pubFunc: () => {
            // call private func
            pvtFunc();
            console.log("Hello from public function");
        }
    };
}

/**
 * @param {string} abcId
 * @param {Parameters<Student>} args 
 */
function AbcStudent(abcId, ...args) {
    const _abcId = abcId;
    // Imagine that this is super() call
    const _super = Student(...args);

    return {
        // spread all student's public properties and methods
        ..._super,
        getAbcId: () => abcId,
        // override existed method:
        pubFunc: () => {
            // equal to super.pubFunc()
            _super.pubFunc();
            console.log("Call from child!");
        }
    }
}

const abcS = AbcStudent("abc", "Long", "Le", 23);
abcS.pubFunc();

/**
 * 
 * @param {ReturnType<Student>} s1 
 * @param {ReturnType<Student>} s2 
 */
function compareStudentAge(s1, s2) {
    return s1.getAge() - s2.getAge();
}

const long1 = Student("Long", "Le", 20);
const long2 = AbcStudent("code", "Long", "Phan", 21);
