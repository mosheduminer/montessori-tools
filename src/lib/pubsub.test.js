import { subscribe, publish } from './pubsub';

it('publishes to all listeners', () => {
    var listener = jest.fn();

    subscribe('foobar', listener);
    subscribe('foobar', listener);

    publish('foobar');

    expect(listener.mock.calls.length).toBe(2);
});

it('returns a remove method for cleanup', () => {
    var listener = jest.fn();

    var subject = subscribe('foobar', listener);
    subscribe('foobar', listener);

    subject.remove();

    publish('foobar');

    expect(listener.mock.calls.length).toBe(1);
});
