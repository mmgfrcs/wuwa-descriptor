import { describe, it, expect } from 'vitest';
import pb from './pocketbase'

describe("Pocketbase lib test", () => {
    it("Exists", () => {
        expect(pb.collection).to.exist
        expect(pb.files.getUrl).to.exist
    })
})