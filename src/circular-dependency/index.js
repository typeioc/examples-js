const typeioc = require('typeioc');

const builder = typeioc.createBuilder();

class A {
    constructor(b){}
}

class B {
    constructor(a){}
}

builder.register(A)
.as((c) => {
    const b = c.resolve(B);
    return new A(b);
});

builder.register(B)
.as((c) => {
    const a = c.resolve(A);
    return new B(a);
});

const container = builder.build();

const result = () => {
	try {
		container.resolve(A);
	} catch (error) {
		return error.message
	}
}

module.exports = result()