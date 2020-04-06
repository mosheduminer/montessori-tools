import { normalizePegCoords } from './normalizer';

describe('normalizePegCoords', () => {
    it('Has a floor of 14x14', () => {
        let subject = normalizePegCoords(0, 0);

        expect(subject.x).toEqual(14);
        expect(subject.y).toEqual(14);
    });

    it ('Locks to the closes multiple of 64 plus 14', () => {
        let subject = normalizePegCoords(64, 64);
        expect(subject.x).toEqual(64 + 14);
        expect(subject.y).toEqual(64 + 14);

        subject = normalizePegCoords(90, 190);
        expect(subject.x).toEqual(64 + 14);
        expect(subject.y).toEqual((64 * 3) + 14);
    })
});
