const typeioc = require('typeioc');

let state = '';

const create = () => ({
    init() {
        state+= 'initialized';
    },

    cleanup() {
        state+= ' disposed';
    }
});

const builder = typeioc.builder();
builder.register('ServiceA')
    .as(() => create())
    .initializeBy((_c, item) => {
		item.init();
		return item;
     })
    .dispose((item) => item.cleanup())
    .named('A')
    .transient();

const container = builder.build();
container.resolveNamed('ServiceA', 'A');
container.dispose();

module.exports = state;
