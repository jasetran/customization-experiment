// src/lib/avatarComponents.ts
const modules = import.meta.glob([
    "../accessories/accessory-*.svelte",
    "../arms/arms-*-*.svelte",
    "../clothes/clothes-*.svelte",
    "../eyebrows/eyebrows-*.svelte",
    "../eyes/eyes-*.svelte",
    "../hairs/hair-*-*.svelte",
    "../heads/head-*.svelte",
    "../noses/nose-*.svelte",
    "../mouths/mouth-*.svelte",
], { eager: true });

const avatarComponents: Record<string, any> = {
    accessories: {},
    arms: {},
    clothes: {},
    eyebrows: {},
    eyes: {},
    hairs: {},
    heads: {},
    noses: {},
    mouths: {},
};

for (const path in modules) {
    const match = path.match(/\/(\w+)\/([\w-]+)\.svelte$/);
    if (!match) continue;

    const category = match[1];        // e.g., "hair", "head"
    const filename = match[2];        // e.g., "hair-1-front"
    const mod = modules[path];        // get the module once

    switch (category) {
        case 'accessories':
            avatarComponents.accessories[filename] = mod.default;
            break;

        case 'arms':
            avatarComponents.arms[filename] = mod.default;
            break;

        case 'clothes':
            avatarComponents.clothes = {
                ...avatarComponents.clothes,
                [filename]: {
                    component: mod.default,
                    sleeveType: mod.sleeveType ?? "long", // fallback
                },
            };
            console.log(avatarComponents.clothes);
            break;

        case 'eyebrows':
            avatarComponents.eyebrows[filename] = mod.default;
            break;

        case 'eyes':
            avatarComponents.eyes[filename] = mod.default;
            break;

        case 'hairs': {
            const hairMatch = filename.match(/hair-(\d+)-(front|back)/);
            if (hairMatch) {
                const hairId = `hair-${hairMatch[1]}`;  // e.g., "hair-1"
                const part = hairMatch[2];              // "front" or "back"
                if (!avatarComponents.hairs[hairId]) {
                    avatarComponents.hairs[hairId] = {};
                }
                avatarComponents.hairs[hairId][part] = mod.default;
            }
            break;
        }

        case 'heads':
            avatarComponents.heads[filename] = mod.default;
            break;

        case 'noses':
            avatarComponents.noses[filename] = mod.default;
            break;

        case 'mouths':
            avatarComponents.mouths[filename] = mod.default;
            break;

    }
}

export default avatarComponents;