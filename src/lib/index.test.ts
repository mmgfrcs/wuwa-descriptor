import { processDescription } from "$lib";
import { describe, expect, it } from "vitest";


describe("Test Description Process", () => {
    it("Handle Unknown DMG and gibberish", () => {
        expect(processDescription("atjeNbsvetdhraertdgnfdvetjnxf")).toEqual('atjeNbsvetdhraertdgnfdvetjnxf')
        expect(processDescription("Unknown DMG in")).toEqual('Unknown DMG in')
        expect(processDescription("Unknown DMG")).toEqual('Unknown DMG')
        expect(processDescription("Unknown DMG Bonus")).toEqual('Unknown DMG Bonus')
    })
    it("Handle Fusion DMG", () => {
        expect(processDescription("Fusion DMG in")).toEqual('<span class="text-red-400">Fusion DMG</span> in')
        expect(processDescription("Fusion DMG")).toEqual('<span class="text-red-400">Fusion DMG</span>')
        expect(processDescription("Fusion DMG Bonus")).toEqual('<span class="text-red-400">Fusion DMG Bonus</span>')
    })
    it("Handle Spectro DMG", () => {
        expect(processDescription("Spectro DMG in")).toEqual('<span class="text-yellow-400">Spectro DMG</span> in')
        expect(processDescription("Spectro DMG")).toEqual('<span class="text-yellow-400">Spectro DMG</span>')
        expect(processDescription("Spectro DMG Bonus")).toEqual('<span class="text-yellow-400">Spectro DMG Bonus</span>')
    })
    it("Handle Glacio DMG", () => {
        expect(processDescription("Glacio DMG in")).toEqual('<span class="text-blue-400">Glacio DMG</span> in')
        expect(processDescription("Glacio DMG")).toEqual('<span class="text-blue-400">Glacio DMG</span>')
        expect(processDescription("Glacio DMG Bonus")).toEqual('<span class="text-blue-400">Glacio DMG Bonus</span>')
    })
    it("Handle Electro DMG", () => {
        expect(processDescription("Glacio DMG in")).toEqual('<span class="text-blue-400">Electro DMG</span> in')
        expect(processDescription("Glacio DMG")).toEqual('<span class="text-blue-400">Electro DMG</span>')
        expect(processDescription("Glacio DMG Bonus")).toEqual('<span class="text-blue-400">Electro DMG Bonus</span>')
    })
})