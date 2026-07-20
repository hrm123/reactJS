import { generateCharacter } from "@/lib/seededRandom";

interface AvatarProps {
    name: string;
}

export function Avatar({ name }: AvatarProps) {
    const character = generateCharacter(name);

    const mouth =
        character.mouthCurve > 0
            ? "M80 115 Q100 130 120 115"
            : character.mouthCurve < 0
                ? "M80 125 Q100 110 120 125"
                : "M82 120 L118 120";

    const accessorySvg =
        character.accessory === "hat"
            ? `<rect x="65" y="35" width="70" height="18" rx="4" fill="${character.clothingColor}" />
             <rect x="50" y="52" width="100" height="8" rx="4" fill="${character.clothingColor}" />`
            : character.accessory === "glasses"
                ? `<circle cx="78" cy="92" r="12" fill="none" stroke="#111" stroke-width="3" />
               <circle cx="122" cy="92" r="12" fill="none" stroke="#111" stroke-width="3" />
               <line x1="90" y1="92" x2="110" y2="92" stroke="#111" stroke-width="3" />`
                : character.accessory === "scar"
                    ? `<line x1="120" y1="75" x2="136" y2="102" stroke="#8b0000" stroke-width="3" />`
                    : "";

    const svgString = `
        <svg width="240" height="240" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="200" rx="24" fill="#eee" />
            <circle cx="100" cy="82" r="44" fill="${character.hairColor}" />
            <circle cx="100" cy="100" r="48" fill="${character.faceColor}" />
            <rect x="55" y="145" width="90" height="55" rx="20" fill="${character.clothingColor}" />

            <circle cx="78" cy="95" r="${character.eyeSize}" fill="#111" />
            <circle cx="122" cy="95" r="${character.eyeSize}" fill="#111" />

            <path d="${mouth}" stroke="#111" stroke-width="4" fill="none" stroke-linecap="round" />

            ${accessorySvg}
        </svg>
    `;

    return (
        <div dangerouslySetInnerHTML={{ __html: svgString }} />
    );
}
