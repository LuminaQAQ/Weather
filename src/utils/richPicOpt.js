import { getAssetsFile } from "./handleImgFile";

const rich_options = {};

for (let i = 100; i < 2427; i++) {
    rich_options['icon_' + i] = {
        backgroundColor: {
            image: getAssetsFile(`icons/${i}.svg`),
        },
        height: 16,
    }
}

export default rich_options;